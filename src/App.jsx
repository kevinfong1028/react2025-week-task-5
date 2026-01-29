import { useState } from "react";
import { Outlet, Link, NavLink, useParams } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    const handleActiveLink = ({isActive}) => {
        console.log('isActive', isActive)
        return `h5 text-decoration-none mx-2 ${isActive ? "active" : ""}`;        
    };
    return (
        <>
            <div className="container">
                <Header />
                <ul className="d-flex border list-unstyled p-2 bg-secondaryX text-lightX">
                    <li>
                        <NavLink 
                            className={handleActiveLink}
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>{" "}
                    |
                    <li>
                        <NavLink
                            className={handleActiveLink}
                            to="/products"
                        >
                            Products
                        </NavLink>
                    </li>{" "}
                    |
                    <li>
                        <NavLink
                            className={handleActiveLink}
                            to="/cart"
                        >
                            Cart
                        </NavLink>
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
