import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";
import ErrorBoundary from "./components/error-boundary";
import AppToaster from "./components/toaster";
import { queryClientConfig } from "./config/query-client-config";

const client = new QueryClient(queryClientConfig);
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={client}>
				<ErrorBoundary>
					<Router>
						<App />
					</Router>
					<AppToaster />
				</ErrorBoundary>
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
