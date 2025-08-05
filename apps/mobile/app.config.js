export default {
  expo: {
    name: "HaVRID",
    slug: "havrid-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2563EB",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.havrid.mobile",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#2563EB",
      },
      package: "com.havrid.mobile",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-local-authentication"],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8000",
    },
  },
};
