import jwt from 'jsonwebtoken';

const authTokenMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Daha Giriş Yapmadınız!!"})
    }

    try {
        // verify Token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;  // with this user id we can get, add, and remove data from the cart
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Hata oluştu..."})
    }
}

export default authTokenMiddleware;