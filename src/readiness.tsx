import { createRoot } from "react-dom/client";
import ReadinessHelper from "./components/ReadinessHelper";

const root = document.getElementById("readiness-root");
if (root) createRoot(root).render(<ReadinessHelper />);
