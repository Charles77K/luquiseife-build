import React, { Fragment } from "react";
import AppRoutes from "./AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<Provider store={store}>
			<Fragment>
				<ToastContainer />
				<AppRoutes />
			</Fragment>
		</Provider>
	);
}

export default App;
