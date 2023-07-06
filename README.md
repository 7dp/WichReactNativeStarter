# Wich React Native Starter

🥤Just another boring bare React Native template

## Tech Stack

| Library                        | Version |
| ------------------------------ | ------- |
| React Native                   | v0.71.8 |
| React                          | v18.2   |
| React Navigation               | v6      |
| TypeScript                     | v4.8.4  |
| Notifee                        | v7      |
| Firebase                       | v17     |
| RTK & RTKQuery                 | v1.9    |
| React Redux                    | v8      |
| Redux                          | v4      |
| Redux Persist                  | v6      |
| Expo                           | v48     |
| Expo Image                     | v1.2.3  |
| Expo Localization              | v14     |
| i18n-js                        | v4      |
| MMKV (mrousavy)                | v2.8    |
| FlashList                      | v1.4.3  |
| Reanimated                     | v3      |
| Gesture Handler                | v2.9    |
| Safe Area Context              | v4.5    |
| Screens                        | v3.20   |
| BottomSheet                    | v4      |
| Pressable Scale                | v2.1    |
| Modal Dropdown                 | v1      |
| Vector Icons                   | v9.2    |
| Toast Message                  | v2      |
| Image Crop Picker              | v0.40   |
| Keyboard Controller            | v1.5.7  |
| React Error Boundary           | v4      |
| DayJS                          | v1.11   |
| Async Mutex                    | v0.4    |
| ESLint                         | v8      |
| Prettier                       | v2      |
| Husky                          | v8      |
| Babel Transform Remove Console | v6      |
| Flipper                        | v0.190  |
| Redux Flipper                  | v2      |
| Patch Package                  | v7      |
| Hermes                         |         |

This starter include some built-in components too. See `/components`.

**Note:** This starter uses min deployment SDK 21 for Android and iOS 13 for iOS.

## Setting up project

1. Clone the repo first:

```bash
git clone https://github.com/7dp/WichReactNativeStarter.git
```

2. Remove unwanted folders and init a brand new repo:

```
git clean -xfd;
rm -rf .git;
git init;
```

3. Rename your newly created project:

```
npx react-native-rename YourProjectName
```

4. Rename the Android package-name if you want:

```
npx react-native-rename YourProjectName -b <com.package.name>
```

For iOS you can use XCode to rename the bundle-id.

5. And don't forget to recheck your android project structure inside `android/app/src/main/java` and make sure it is correct.

## Running

Start Metro server by running:

```
yarn start
```

Running on iOS requires you to install the pod first:

```
yarn pod
```

You can run Android and iOS by pressing `a` and `i` on your Metro server respectively.
