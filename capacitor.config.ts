import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  
    "appId": "tomito.xyz",
    "appName": "Tomito",
    "webDir": "dist",
    "server": {
      "androidScheme": "https"
    },
    "android": {
      "allowMixedContent": true
    }
  
};

export default config;
