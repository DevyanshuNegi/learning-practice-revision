

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