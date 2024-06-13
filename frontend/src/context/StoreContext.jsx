/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    /* ------ add and remove food from the 'card' -----*/
    const [cartItems, setCartItems] = useState({});

    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const [food_list, setFoodList] = useState([]);  // must to be list

    const [announcement_list, setAnnouncementList] = useState([]);  // must to be list

    // function to add to cart 
    const addToCart = async (foodId) => {
        // check if add the food first time to the card or added before that
        if(!cartItems[foodId])
            setCartItems((prev) => ({ ...prev, [foodId]:1 }));
        else
            setCartItems((prev) => ({ ...prev, [foodId]:prev[foodId]+1 }));

        // if user make login, add food to cart in database in users => cartData
        if(token){
            await axios.post(`${url}/cart/add-to-cart`, {foodId}, {headers: {token}});
        }
    }

    const removeFromCart = async (foodId) => {
        setCartItems((prev) => ({ ...prev, [foodId]:prev[foodId]-1 }));

        // if user make login, remove food to cart in database in users => cartData
        if(token){
            await axios.post(`${url}/cart/remove-from-cart`, {foodId}, {headers: {token}});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((food) => food._id == item);
                if (itemInfo) { // Add this check
                    totalAmount += itemInfo.price * cartItems[item]; // to get countety of product  
                }
            }
        }
        return totalAmount;
    }

    // fetch food list data from database
    const getFoodList = async () => {
        try {
            const response = await axios.get(`${url}/food/all-food`);
            if (Array.isArray(response.data.data)) {
                setFoodList(response.data.data); // Ensure this is an array
            } else {
                console.error("Unexpected data format: ", response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list: ", error);
        }
    } 

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/cart/get-cart`, {}, {headers: {token}});
        setCartItems(response.data.cartData);   // load cartData to cartItem state

    }

    // fetch announcement list data from database
    const getAnnouncementList = async () => {
        try {
            const response = await axios.get(`${url}/announcement/all-announcement`);
            if (Array.isArray(response.data.data)) {
                setAnnouncementList(response.data.data); // Ensure this is an array
            } else {
                console.error("Unexpected data format: ", response.data.data);
            }
        } catch (error) {
            console.error("Error fetching Announcement list: ", error);
        }
    } 

    useEffect(() => {
        // this to load food data when page loaded
        async function loadFoodData() {
            await getFoodList();
            await getAnnouncementList();

            // this to when we reload a home page after login, don't make logout 
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));

                await loadCartData(localStorage.getItem("token"));
            }
        }

        loadFoodData();
    }, [])

    // to access a it from anywhere 
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        announcement_list,
        getAnnouncementList
    }

    return(
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;


