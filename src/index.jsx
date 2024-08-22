import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

const queryClient = new QueryClient();

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
