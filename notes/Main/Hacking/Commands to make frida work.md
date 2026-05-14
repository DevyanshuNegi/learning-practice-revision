## Phase 4: Frida Setup — What Actually Worked

### Step 1: Check Your Laptop's Frida Version First

This is the most critical step. Everything else depends on this number matching exactly.

```bash
frida --version
# Output example: 17.9.7
```

---

### Step 2: Download the Correct frida-server Binary

The version in the filename **must exactly match** your laptop's frida version from Step 1. In this case it was `17.9.7`.

```bash
wget https://github.com/frida/frida/releases/download/17.9.7/frida-server-17.9.7-android-arm64.xz
```

**Why android-arm64:** Physical Samsung M32 uses ARM64 architecture. Any x86_64 binary (leftover from Waydroid) will throw `not executable: 64-bit ELF file` and silently fail.

Extract it:

```bash
unxz frida-server-17.9.7-android-arm64.xz
```

---

### Step 3: Push to Device and Start as Root

```bash
# Push the binary
adb push frida-server-17.9.7-android-arm64 /data/local/tmp/frida-server

# Drop into root shell
adb shell
su

# Go to directory, set permissions, start server
cd /data/local/tmp
chmod 755 frida-server
./frida-server &

# Exit back to Kubuntu
exit
exit
```

**Important:** Every time the phone reboots, frida-server dies. You must re-run the `adb shell → su → ./frida-server &` sequence after every reboot.

Verify the connection from Kubuntu:

```bash
frida-ps -U
```

You should see a full list of running processes on the M32. If you see `Failed to enumerate processes: unable to communicate`, it means a version mismatch or frida-server isn't running as root.

---

### Step 4: The SSL Unpinning Script

**What didn't work:**

- `universal-ssl-unpinning.js` (local file) — the repo maintainer replaced it with a dummy error message
- `frida -U --codeshare pcaps/android-ssl-pinning-bypass` — repo returned 404, no longer exists

**What worked:**

```bash
frida -U --codeshare akabe1/frida-multiple-unpinning -f io.voiapp.voi
```

When prompted `Are you sure you want to trust this codeshare project?` → type `y` and press Enter.

Success looks like a wall of `[+] Bypassing TrustManagerImpl (Android > 7) checkTrustedRecursive` logs in the terminal.

---

### Step 5: Force Traffic into Burp (SuperProxy VPN)

The Voi app is **proxy-unaware** — it ignores Android's Wi-Fi proxy settings and sends traffic directly to the internet. Standard proxy config does nothing.

Fix: install SuperProxy to create a local VPN tunnel that captures all traffic at the OS level.

```bash
adb install Super_Proxy_2.5.3.apk
```

Open it via scrcpy, configure:

- **Protocol:** HTTP
- **Server:** Your Kubuntu local IP (e.g., `192.168.1.X`)
- **Port:** 8080

Hit **Start**. Accept the VPN permission prompt on phone.

Also ensure Burp is listening on all interfaces, not just localhost:

- Burp → Proxy → Proxy Settings → Edit listener → Bind to address: **All interfaces**

---

### Step 6: Zygisk DenyList — The Onfido Problem

Even with everything above working, traffic still wasn't hitting Burp. Root was being detected by a separate SDK process.

**The issue:** Magisk's Zygisk DenyList by default only shows user-installed apps. The Voi app has a sub-process `io.voiapp.voi:onfido_process` that runs independently and detects Magisk. It wasn't in the DenyList, so it killed the network flow silently.

**Fix sequence:**

1. Open Magisk app → Settings gear → Enable **Zygisk** → Enable **Enforce DenyList**
2. Tap **Configure DenyList**
3. Tap the **3-dot menu** (top right) → check **Show system apps**
4. Search for `Voi` → check `io.voiapp.voi` AND `io.voiapp.voi:onfido_process` (both must be ticked — main checkbox should show a solid checkmark, not a minus sign)
5. Search for `Google Play Services` → check all sub-processes
6. Search for `Google Play Store` → check all sub-processes
7. **Reboot phone**

After reboot, restart frida-server again (it dies on reboot):

```bash
adb shell
su
cd /data/local/tmp
./frida-server &
exit
exit
```

---

### Final Working Command Sequence (After Every Reboot)

```bash
# 1. Start frida-server on device
adb shell
su
cd /data/local/tmp
./frida-server &
exit
exit

# 2. Verify connection
frida-ps -U

# 3. On phone: Open SuperProxy → Start

# 4. Launch unpinning attack
frida -U --codeshare akabe1/frida-multiple-unpinning -f io.voiapp.voi
```

---

### Quick Reference: What Failed vs What Worked

|Attempt|Outcome|
|---|---|
|`frida-server-correct` (x86_64 from Waydroid)|`not executable: 64-bit ELF file` — wrong arch|
|`frida-core-devkit-17.9.7-android-arm64`|Wrong file type — developer library, not server binary|
|`frida-server-16.6.6-android-arm64` with frida 17.9.7 on laptop|Version mismatch — `unable to communicate`|
|`frida-server-17.9.7-android-arm64`|✅ Worked|
|`universal-ssl-unpinning.js` (local file)|Repo replaced with dummy error text|
|`--codeshare pcaps/android-ssl-pinning-bypass`|404 Not Found — repo deleted|
|`--codeshare akabe1/frida-multiple-unpinning`|✅ Worked|
|Wi-Fi manual proxy setting|Ignored by Voi (proxy-unaware app)|
|SuperProxy VPN APK|✅ Worked|
|Zygisk DenyList without `onfido_process`|Root detected, traffic silently killed|
|Zygisk DenyList with `onfido_process` + system apps shown|✅ Traffic hit Burp|