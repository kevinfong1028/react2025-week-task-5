import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import * as Utils from "../utils";

const api_baseUrl = import.meta.env.VITE_BASEURL;
const api_path = import.meta.env.VITE_PATH;

function Cart() {
    const [cartData, setCartData] = useState({});
    const [isFreezed, setIsFreezed] = useState(true);

    const loadCart = async () => {
        const url = `${api_baseUrl}/api/${api_path}/cart`;
        try {
            const res = await axios.get(url);
            console.log("get resp:", res.data);
            if (res.data.success) {
                let modify = {
                    ...res.data.data,
                    carts: res.data.data.carts.map((item) => ({
                        ...item,
                        isDisabled: false,
                    })),
                };
                console.log(modify);
                setCartData(modify);
                // setProducts(
                //     res.data.data.carts.map((item) => ({
                //         ...item,
                //         isDisabled: true,
                //     })),
                // );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleInputChange = (e, index) => {
        setIsFreezed(false);
        // setProducts((prev) =>
        //     prev.map((item, i) =>
        //         i === index
        //             ? {
        //                   ...item,
        //                   qty: e.target.value,
        //                   isDisabled: false,
        //               }
        //             : item,
        //     ),
        // );
        setCartData((prev) => ({
            ...prev,
            carts: prev.carts.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          qty: e.target.value,
                          isDisabled: false,
                      }
                    : item,
            ),
        }));
    };

    const updateCart = async (cId, pId, q = 1) => {
        const req = {
            data: {
                product_id: pId,
                qty: Number(q),
            },
        };
        const url = `${api_baseUrl}/api/${api_path}/cart/${cId}`;
        try {
            const res = await axios.put(url, req);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCart = async (cId, title) => {
        const yes = confirm(`確定要刪除 ${title} 嗎?`);
        if (!yes) return;

        const url = `${api_baseUrl}/api/${api_path}/cart/${cId}`;
        try {
            const res = await axios.delete(url);
            console.log("delete resp:", res.data);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [isEmptyBtnDisabled, setIsEmptyBtnDisabled] = useState(false);
    useEffect(
        (e) => {
            setIsEmptyBtnDisabled(cartData.carts?.length === 0 ? true : false);
        },
        [cartData.carts?.length],
    );

    const emptyCart = async () => {
        const yes = confirm(`確定清空購物車嗎?`);
        if (!yes) return;

        const url = `${api_baseUrl}/api/${api_path}/carts`;
        try {
            console.log(url);
            // return;
            const res = await axios.delete(url);
            console.log("delete resp:", res.data);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Cart</h1>
            <p className="text-end">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={emptyCart}
                    disabled={isEmptyBtnDisabled}
                >
                    清空購物車
                </button>
            </p>
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>O.Price</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>action</th>
                        <th>count</th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.carts?.length < 1 ? (
                        <tr>
                            <td colSpan="8">趕快去敗家</td>
                        </tr>
                    ) : (
                        cartData.carts?.map((p, index) => (
                            <tr key={p.product_id}>
                                <td>{index + 1}</td>
                                <td>{p.product.title}</td>
                                <td>{p.product.category}</td>
                                <td>{p.product.origin_price}</td>
                                <td>{p.product.price}</td>
                                <td>
                                    <input
                                        type="number"
                                        id={`qty-${p.id}`}
                                        value={p.qty}
                                        step="1"
                                        min="1"
                                        onChange={(e) =>
                                            handleInputChange(e, index)
                                        }
                                    />
                                    <label htmlFor={`qty-${p.id}`}></label>
                                </td>
                                <td>
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic example"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                updateCart(
                                                    p.id,
                                                    p.product_id,
                                                    p.qty,
                                                )
                                            }
                                            disabled={p.isDisabled}
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteCart(
                                                    p.id,
                                                    p.product.title,
                                                )
                                            }
                                        >
                                            Del
                                        </button>
                                    </div>
                                </td>
                                <td>{Utils.thousandNum(p.total)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="7">total</td>
                        <td>{Utils.thousandNum(cartData.total)}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default Cart;
