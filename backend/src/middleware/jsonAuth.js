import jwt from "jsonwebtoken";
const authToken=()=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "Unauthorized user."});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded )=>{
        if (err){
            if(err.name === "TokenExpiredError") return res.status(401).json({message:"Expired access token"});
            return res.status(403).json({message:"Access Denied"})
        }
        req.user = decoded.id;
        next();
    });
}

const generateAccessToken=(id)=>{
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"});
}

export {authToken, generateAccessToken}