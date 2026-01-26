import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const api_baseUrl = import.meta.env.VITE_BASEURL;
const api_path = "kevin-react";

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const apiProduct = {
        getAll: async (page = 1) => {
            const url = `${apiBase}/api/${apiPath}/products/all`;
            try {
                const res = await axios.get(url);
                if (res.data.success) {
                    // console.log("get resp:", res.data);
                    setProducts(res.data.products); // array
                    setPagination((prevData) => ({
                        ...prevData,
                        ...res.data.pagination,
                    })); // object
                }
            } catch (error) {
                console.dir(error);
            }
        },
        getOne: async (request) => {
            const url = `${apiBase}/api/${apiPath}/product`;
            try {
                return await axios.post(url, request);
            } catch (error) {
                console.dir(error);
            }
        },
        delete: async (pId) => {
            const url = `${apiBase}/api/${apiPath}/product/${pId}`;
            try {
                return await axios.delete(url);
            } catch (error) {
                console.dir(error);
            }
        },
        put: async (request, pId) => {
            const url = `${apiBase}/api/${apiPath}/product/${pId}`;
            try {
                return await axios.put(url, request);
            } catch (error) {
                console.dir(error);
            }
        },
    };

    useEffect(() => {
        (async () => {
            const url = `${api_baseUrl}/api/${api_path}/products`;
            const resp = await axios.get(url);
            console.log("Products", resp.data);
            setProducts(resp.data.products);
        })();
    }, []);

    const clickDetail = async (id) => {
        navigate(`/product/${id}`);
        // try {
        //     const res = await axios.get(
        //         `${api_baseUrl}/api/${api_path}/product/${id}`,
        //     );
        //     console.log("取得指定產品: ", res.data);
        //     navigate(`/product/${id}`, {state: {productData: res.data}});
        // } catch (error) {
        //     console.error("取得指定產品失敗", error);
        // }
    };

    return (
        <>
            <h1>Products</h1>
            <div className="row">
                {products.map((p) => (
                    <div className="col-md-4" key={p.id}>
                        <div className="card" style={{ width: "18rem" }}>
                            <img
                                src={p.imageUrl}
                                className="card-img-top"
                                alt={p.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.title}</h5>
                                <p className="card-text">{p.category}</p>
                                <p className="card-text">{p.description}</p>
                                <p className="card-text">
                                    原價:<del>{p.origin_price}</del>
                                </p>
                                <p className="card-text fs-4">特價: {p.price}</p>
                                <p className="card-text fs-4">{p.unit}</p>
                                <a
                                    href="#"
                                    className="btn btn-primary d-block"
                                    onClick={() => clickDetail(p.id)}
                                >
                                    detail
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Products;
