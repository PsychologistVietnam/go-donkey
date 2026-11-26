
import { login as loginService } from "../services/authService.js";

export function ping(req,res) {
    console.log("[auth] Get/ping");
    return res.status(200).json({
        success:true,
        message:"Ping thành công"
    })
    
}



export async function login(req, res, next) {
    // yeu cau trinh duyet khong luu response vao cache
    res.set("Cache-Control", "no-store")
    const {username, password} = req.body ?? {} ;
    if (typeof username != "string" || username.trim()==="" || username.length>50 || typeof password!="string" || password==="" ||password.length>128 ) {
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
    res.set("Cache-Control", "no-store");
    return res.status(200).json({
        success : true ,
        user : req.auth
    })
}


//Kiem tra quyen 
export function adminCheck(req, res) {
    return res.status(200).json({
        success : true ,
        message : "Admin access granted"
    })
}



