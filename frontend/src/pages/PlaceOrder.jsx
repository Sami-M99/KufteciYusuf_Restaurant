/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(orderData => ({...orderData, [name]: value}));
  }

  const placeOrderHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // here loop to add all itemData with "quantity" in orderItems[] array
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(`${url}/order/place`, orderData, {headers: {token}});
    // check if response true
    if(response.data.success){
      const {sessionUrl} = response.data;   // get a session Url
      window.location.replace(sessionUrl);  // send the User to sesstionUrl
    }
    else {
      alert("Error");
    }
  }
  
  const navigate = useNavigate();
  useEffect(() => {
    // if we make logout page will be colse and go to car page
    if(!token) {
      navigate('/cart')
    }
    // if cart page is empty don't go to any page
    else if(getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  const inputStyle = "mb-4 w-full p-3 border border-gray-500 outline-[#fa9628] rounded";
  return (
    <form onSubmit={placeOrderHandler} className="flex items-start justify-between gap-12 mt-16 max-[750px]:flex-col max-[750px]:m-auto">
      <div className="w-full max-w-[500px]">
        <p className="text-3xl font-semibold my-12">
          Delivary Infromation
        </p>
        <div className="flex gap-2">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="Ad" className= {inputStyle}></input>
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Soyad" className= {inputStyle}></input>
        </div>
        <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email" className= {inputStyle}></input>
        <input required name="address" value={data.address} onChange={onChangeHandler} type="text" placeholder="Adres" className= {inputStyle}></input>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Telefon Numara" className= {inputStyle}></input>
      </div>
      <div className="w-full max-w-[450px]">
      <div className="flex-1 flex flex-col gap-5">
          <h2>Cart Toplami</h2>
          <div>
              <div className="flex justify-between text-gray-400">
                <p>SubTotal</p>
                <p>{getTotalCartAmount()} TL</p>
              </div>
              <hr className="my-2"/>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>{(getTotalCartAmount() === 0)? 0 : 2} TL</p>
              </div>
              <hr className="my-2"/>
              <div className="flex justify-between ">
                <p>Total</p>
                <p>{(getTotalCartAmount() === 0)? 0 : getTotalCartAmount()+2} TL</p>
              </div>
          </div>
          <button type="submit" className="border-none bg-[#fa9628] max-w-48 py-3 rounded-md cursor-pointer mt-7">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder