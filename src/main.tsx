import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./main.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
