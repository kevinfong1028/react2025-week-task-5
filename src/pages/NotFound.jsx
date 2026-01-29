import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            // navigate(-1);
            navigate("/", {
                replace: true,
            });
        }, 2000);
    }, []);
    return (
        <>
            <h1>404</h1>
        </>
    );
}

export default NotFound;
