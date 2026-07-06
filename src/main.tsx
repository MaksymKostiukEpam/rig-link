import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import router from "./app/router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-right" richColors />
    <RouterProvider router={router} />
  </StrictMode>,
);
