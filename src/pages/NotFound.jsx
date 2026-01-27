import { useState } from "react";
import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate(-1);
    }, 2000);
    return (
        <>
            <h1>404</h1>
        </>
    );
}

export default NotFound;
