import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
    const router = useNavigate();
    const apiBase = import.meta.env.VITE_BASEURL;
    const apiPath = "kevin-react";
    const [loginForm, setloginForm] = useState({
        username: "sbdrumer1028@gmail.com",
        password: "kv12345",
    });
    const [isAuth, setIsAuth] = useState(false);

    const apiUser = {
        login: async () => {
            const url = `${apiBase}/admin/signin`;
            console.log(url);
            try {
                const res = await axios.post(url, loginForm);
                console.log("login res", res);
                if (res.data.success) {
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token};expires=${new Date(
                        expired,
                    )};`;
                    axios.defaults.headers.common["Authorization"] = token;
                }
                setIsAuth(true);
                router("/products");
            } catch (error) {
                console.dir(error);
                setIsAuth(false);
            }
        },
    };

    const loginInputChange = (e) => {
        const { name, value } = e.target;
        setloginForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const userLogin = async (e) => {
        e.preventDefault();
        await apiUser.login();
    };

    return (
        <div className="row">
            <div className="col">
                <h2>Login</h2>
                <form
                    className="border p-4 bg-light rounded col-6 offset-3"
                    onSubmit={userLogin}
                    autoComplete="off"
                >
                    <div className="mb-3 text-start">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="username"
                            name="username"
                            aria-describedby="emailHelp"
                            value={loginForm.username}
                            onChange={(e) => loginInputChange(e)}
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={loginForm.password}
                            onChange={(e) => loginInputChange(e)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
