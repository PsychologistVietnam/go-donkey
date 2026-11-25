
import { login as loginService } from "../services/authService.js";

export function ping(req,res) {
    console.log("[auth] Get/ping");
    return res.status(200).json({
        success:true,
        message:"Ping thành công"
    })
    
}



export async function login(req, res, next) {
    const {username, password} = req.body ?? {} ;
    if (typeof username != "string" || username.trim()==="" || typeof password!="string" || password==="") {
        return res.status(400).json({
            success:false,
            message: "Username and password must be non-empty strings"
        })
    } else {
        try {
            const result = await loginService(username, password) ;
            return res.status(200).json({
                success:true,
                accessToken: result.accessToken,
                user: result.user
            })
        } catch (error) {
            if (error.code === "INVALID_CREDENTIALS") {
                return res.status(401).json({
                    success:false,
                    message:"Invalid username or password"
                })
            }
            return res.status(500).json({
                success:false,
                message:"Login unavailable"
            })
        }
        
    }
}

// doc thong tin bang middleware
export function me(req , res) {
    return res.status(200).json({
        success : true ,
        user : req.auth
    })
}



