import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StartupBoundary from "./components/StartupBoundary";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <StartupBoundary>
        <App />
      </StartupBoundary>
    </StrictMode>
  );
}
