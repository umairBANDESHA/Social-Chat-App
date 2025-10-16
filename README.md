# React Native Project Setup and Run Instructions
   HiChat is a real-time chat app built with React Native that allows users to sign up, connect with friends,
   and chat instantly. It features a clean, modern UI with smooth navigation and Firebase integration for 
   authentication and live messaging. Designed for fast and secure communication across devices.

# Screenshot

<img width="1536" height="1024" alt="hichat" src="https://github.com/user-attachments/assets/f21a7ed6-0704-4622-893f-ea2345d138a1" />


## Prerequisites
- Node.js (Recommended: LTS version)
- npm (comes with Node.js)
- React Native CLI (optional, for advanced usage)
- Android Studio (for Android emulator)

## Initial Setup
1. **Install dependencies**
   ```sh
   npm install
   ```
   Run this command in the project root directory to install all required packages.

2. **Start Metro Bundler**
   ```sh
   npx expo start
   ```
   This starts the Metro Bundler, which serves your JavaScript code to the app.

## Running on Android
1. **Start Android Emulator**
   - Open Android Studio and launch an emulator, or connect a physical device with USB debugging enabled.

2. **Run the app**
   ```sh
   npx react-native run-android
   ```
   This will build the app and install it on the connected emulator/device.

## Common Issues
- If you encounter errors, try running:
  ```sh
  npx react-native doctor
  ```
  Follow the instructions to resolve any issues.

Feel free to update this README with project-specific details as needed.
