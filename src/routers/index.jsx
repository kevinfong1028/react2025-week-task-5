import App from "../App";
// import { Home, Products, Product, Cart } from "/pages";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default routes;
