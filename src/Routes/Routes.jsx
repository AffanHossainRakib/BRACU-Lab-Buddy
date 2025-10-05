import About from "@/Pages/About/About";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import Home from "@/Pages/Home/Home";
import Root from "@/Pages/Root/Root";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            },
            {
                path: "/about",
                Component: About
            }
        ]

    }

]);

export default router