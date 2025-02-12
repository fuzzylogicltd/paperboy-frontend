import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

// TODO: set staleTime back to 5 min

// const FIVE_MINUTES = 1000 * 60 * 5;

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { staleTime: FIVE_MINUTES } },
// });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
