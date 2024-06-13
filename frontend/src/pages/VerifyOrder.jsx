/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const VerifyOrder = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    // console.log(success, orderId);

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/order/verify-order`, {success, orderId});
        if(response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className="min-h-[60vh] grid">
            <div className="w-full h-full place-self-center border-red-700 border-4  animate-spin"></div>
        </div>
        // <div className="flex justify-center items-center">
        //     <div className={`animate-spin rounded-full w-15 border-t-2 border-b-2 border-orange-500`}>
        //     </div>
        // </div>    
    )
}

export default VerifyOrder