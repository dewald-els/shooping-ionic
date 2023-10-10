import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.dewaldels.everythingEdible",
  appName: "Everything Edible",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
