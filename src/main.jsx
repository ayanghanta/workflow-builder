import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NodeContextProvider } from "./context/nodesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NodeContextProvider>
      <App />
    </NodeContextProvider>
  </StrictMode>
);
