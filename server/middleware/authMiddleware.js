import { verifyAccessToken } from "../utils/jwt.js";
import { findByID , findRolesByUserID} from "../models/userModel.js";

export async function requireAuth(req, res, next) {
    const authorization = req.get("Authorization")

    if (!authorization) {
        return res.status(401).json({
           success : false ,
           message : "Authentication required"
        })
    }
    // lay beare truoc
    const parts  = authorization.trim().split(/\s+/);
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return res.status(401).json({
            success : false ,
            message : "Invalid authorization header"
        })
    }

    const token = parts[1] ;

    let payload ; 

    try {
        payload = await verifyAccessToken(token) ;
    } catch (error) {
        return res.status(401).json({
            success: false ,
            message  : "Invalid or expired token"
        })
    }
    // lay sau beare vaf kiem tra user ID
    const userID = payload.sub ;

    if (typeof userID !== "string" || !/^[1-9]\d*$/.test(userID)) {
       return res.status(401).json({
        success : false ,
        message : "Invalid or expired token"
       })
    }

    //doc tai khoan va xu ly databse voi loi token
    let user ; 
    let roles ;
    try {
        user = await findByID(userID) ;
        roles = await findRolesByUserID(userID)
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Authentication unavailable"
        })
    }
    //tu choi tai khoan khong ton tai hoac vo hieu hoa
    if (!user || Number(user.is_active) !==1) {
        return res.status(401).json({
            success : false ,
            message : "Authentication required"
        })
    }
    //luu thong tin tai khoan vao request de controller su dung 
    req.auth = {
        id : userID,
        username :user.username,
        roles : roles
    };
    //chuyen xong handler tiep theo sau khi kiem tra thanh cong
    return next() ;
}