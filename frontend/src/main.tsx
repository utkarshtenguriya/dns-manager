import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ErrorPage from "./pages/ErrorPage.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorPage statusCode="404" message="Opps! something went wrong..." />
    ),
    children: [
      {
        path: "/",
        element: <Welcome />,
        errorElement: (
          <ErrorPage statusCode="400" message="Opps! something went wrong..." />
        ),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: (
          <ErrorPage statusCode="400" message="Opps! something went wrong..." />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
