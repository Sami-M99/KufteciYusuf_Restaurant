/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const UserOrders = () => {
    const { token, url } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const getOrders = async () => {
        const response = await  axios.post(`${url}/order/user-order`, {}, {headers: {token}});
        setData(response.data.data);
        console.log(response.data.data)
    }

    useEffect(() => {
        // if token availabile get userorders
        if(token) {
            getOrders();
        }
    }, [token])

    return (
        <div className="my-12">
            <h2 className="text-3xl font-semibold my-12">Siparişleriniz</h2>
            <div className="flex flex-col gap-5 mt-8">
                {data.map((order, index) => {
                    return(
                        <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-7 text-base py-3 px-5 text-gray-500 border max-[900px]:grid-cols-[1fr_2fr_1fr] max-[900px]:gap-1">
                            <img src="" alt="" className="w-12"/>
                            {/* display order items  */}
                            <p>{order.items.map((item, index) => {
                                if(index === order.item.length -1){
                                    return item.name + ' x ' + item.quantity;
                                }
                                else {
                                    return item.name + ' x ' + item.quantity + ', ';
                                }
                            })}</p>
                            {/* display order amount  */}
                            <p>${order.amount}</p>
                            <p>Items : {order.items.length}</p>
                            <p><span className="text-orange-400">&#x25cf;</span> <b>{order.status}</b></p>
                            <button className="border-none py-3 rounded bg-orange-300 cursor-pointer">Track Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default UserOrders