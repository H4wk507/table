import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Views from "./pages/Views";
import PageNotFound from "./pages/PageNotFound";
import Main from "./pages/Main";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/main",
    element: (
      <Layout>
        <Main />
      </Layout>
    ),
  },
  {
    path: "/views",
    element: (
      <Layout>
        <Views />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
