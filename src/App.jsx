import { useState } from "react";
import { Outlet, Link, NavLink, useParams } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <div className="container">
                <Header />
                <ul className="d-flex border list-unstyled p-2 bg-secondaryX text-lightX">
                    <li>
                        <Link className="h5 text-decoration-none mx-2" to="/">
                            Home
                        </Link>
                    </li>{" "}
                    |
                    <li>
                        <Link
                            className="h5 text-decoration-none mx-2"
                            to="/products"
                        >
                            Products
                        </Link>
                    </li>{" "}
                    |
                    <li>
                        <Link
                            className="h5 text-decoration-none mx-2"
                            to="/cart"
                        >
                            Cart
                        </Link>
                    </li>
                </ul>
                <hr />
                <Outlet />
                <hr />
                <Footer />
            </div>
        </>
    );
}

export default App;
