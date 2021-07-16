import { Capacitor } from '@capacitor/core';
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aua.ecocyc',
  appName: 'EcoCyc',
  webDir: 'www',
  bundledWebRuntime: false,
  // android: {
  //   path: '/snap/android-studio/current/android-studio/bin/studio.sh'
  // }
};

export default config;
