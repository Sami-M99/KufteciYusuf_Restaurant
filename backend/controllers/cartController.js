import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // it will get user id from our middleware authToken.js 
        let cartData = await userData.cartData;

        // if cartData is empty create a new one by foodId
        if(!cartData[req.body.foodId]) {
            cartData[req.body.foodId] = 1;
        } else {
            cartData[req.body.foodId] += 1;
        }

        // to update cartData on database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Yemek sepete Yüklendi"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in Add to cart"});
    }
}

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // it will get user id from our middleware authToken.js 
        let cartData = await userData.cartData;

        if(cartData[req.body.foodId] > 0) {
            cartData[req.body.foodId] -= 1;
        }

        // to update cartData on database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message: "Yemek sepetinden çıkarıldı"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in Remove from cart"});
    }
}

// get(Fetch) user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // it will get user id from our middleware authToken.js 
        let cartData = await userData.cartData;

        res.json({success: true, cartData});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in get cart data"});
    }
}

export {addToCart, removeFromCart, getCart}

