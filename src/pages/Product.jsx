import { useState } from "react";
import { useParams } from "react-router";

const api_baseUrl = import.meta.env.VITE_BASEURL;
const api_path = "kevin-react";

function Product() {
    // const [count, setCount] = useState(0);
    const { id } = useParams();
    console.log(id);

    return (
        <>
            <h1>Product inside</h1>
            {/* <div className="col-md-4" key={p.id}>
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
                            <del>{p.origin_price}</del>
                        </p>
                        <p className="card-text fs-4">{p.price}</p>
                        <p className="card-text fs-4">{p.unit}</p>
                        <a
                            href="#"
                            className="btn btn-primary d-block"
                            onClick={goProductDetail}
                        >
                            detail
                        </a>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Product;
