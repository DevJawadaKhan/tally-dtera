# Tally — mobile app (Android & iOS)

This folder wraps the Tally web app (the `index.html` at the repo root) in a native shell with
[Capacitor](https://capacitorjs.com), so it can be installed from Google Play and the App Store.

- App ID: `com.dtera.tally` · App name: **Tally**
- `android/` — Android Studio project
- `ios/` — Xcode project
- `resources/` — icon and splash source images (regenerate with `npm run icons`)
- `scripts/copy-web.mjs` — copies the web app into `www/` and adds native glue
  (Android back button, status bar, splash screen; removes the web-only service worker)

## Get an APK without installing anything
Every push to the `mobile-app` branch runs **Actions → Build Android app** on GitHub.
Open the finished run and download **tally-dtera-debug-apk** under *Artifacts*.
Unzip it, copy `app-debug.apk` to an Android phone and open it
(allow "install unknown apps" when asked).

## Build on your computer
Requirements: Node 22+, **Android Studio** (for Android) and/or **Xcode 16+ on a Mac** (for iOS).

```bash
cd mobile
npm install
npm run android   # copies the web app, syncs, opens Android Studio → press Run ▶
npm run ios       # same for Xcode (Mac only) → pick a device → Run ▶
```

After changing the web app (`index.html` at the root), run `npm run sync` again.

## Publishing
**Google Play:** Android Studio → *Build → Generate Signed App Bundle* → upload the `.aab`
in Play Console (one-time USD 25 developer account).

**App Store:** Xcode → set your Team under *Signing & Capabilities* → *Product → Archive* →
*Distribute App* → App Store Connect (Apple Developer Program, USD 99/year).

Bump `versionCode`/`versionName` in `android/app/build.gradle` and the version in Xcode before each release.

## Notes
- Data is still stored on the device (prototype). A shared backend and Microsoft sign-in
  are needed before company-wide rollout.
- Location for check-in is chosen manually (office/site/remote). GPS-verified check-in can be
  added later with `@capacitor/geolocation`.
