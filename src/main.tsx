import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "react-query";
import store from "./store";
import ErrorBoundary from "./components/error-boundary";
import AppToaster from "./components/toaster";
import { queryClient } from "./config/query-client-config";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Router>
            <App />
          </Router>
          <AppToaster />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
