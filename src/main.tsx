import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./main.css";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

if (
  Capacitor.isPluginAvailable("StatusBar") &&
  Capacitor.getPlatform() === "android"
) {
  StatusBar.setBackgroundColor({
    color: "#48487f",
  });
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
