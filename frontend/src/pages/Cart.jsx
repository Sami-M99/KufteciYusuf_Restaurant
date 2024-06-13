/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();

  const gridStyle = "grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-base"
  return (
    <div className="mt-20">
      <div>
        <div className={gridStyle}>
          <p className="m-auto">Items</p>
          <p className="m-auto">Title</p>
          <p className="m-auto">Price</p>
          <p className="m-auto">Quantity</p>
          <p className="m-auto">Total</p>
          <p className="m-auto">Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((el, index) => {
            if(cartItems[el._id] > 0) {
              {   
                return(
                  <div key={index} >
                    <div className={`my-3 text-black ${gridStyle}`}>
                      <img src={`${url}/images/${el.image}`} alt="food_image" className="w-16 m-auto"/>
                      <p className="m-auto">{el.name}</p>
                      <p className="m-auto">{el.price} TL</p>
                      <p className="m-auto">{cartItems[el._id]}</p>
                      <p className="m-auto">{el.price * cartItems[el._id]} TL</p>
                      <img src={assets.removeOne} alt="removeOne" className="cursor-pointer m-auto w-8" onClick={() => removeFromCart(el._id)}/>
                    </div>
                    <hr className="h-0.5 bg-gray-300 border-none"/>
                  </div>
                );
              }
            }
          })
        }
      </div>

      <div className="mt-20 flex justify-between gap-20 max-[750px]:flex-col-reverse">
        <div className="flex-1 max-w-[600px] flex flex-col gap-5">
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
          <button onClick={() => (getTotalCartAmount() > 0) ? navigate('/order') : null} className={`border-none max-w-48 py-3 rounded-md cursor-pointer ${ getTotalCartAmount() > 0? "bg-[#fa9628]" : "bg-gray-300 text-gray-600" }`}>Proceed to checkout</button>
        </div>
        <div className="max-w-[300px] max-[750px]:justify-start">
          <div>
            <p className="text-gray-400">If you have a promo code, Enter it here</p>
            <div className="my-2 flex justify-between items-center rounded-md bg-gray-100">
              <input type="text" placeholder="promo code"  className="bg-transparent border-none outline-none pl-6"/>
              <button className="max-w-36 py-3 px-9 bg-black border-none text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart