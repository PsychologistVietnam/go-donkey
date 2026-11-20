import { findByUsername } from "../models/userModel.js";
import argon2 from "argon2";
import { createAccessToken } from "../utils/jwt.js";

export async function login(username, password) {
    const user = await findByUsername(username) ;

    if(!user) {
       const error = new Error("Invalid username or password");
       error.code = "INVALID_CREDENTIALS";
       throw error;
    }
    if (Number(user.is_active) !== 1) {
        const error = new Error("Invalid username or password");
       error.code = "INVALID_CREDENTIALS";
       throw error;
    }

    const passwordMatches = await argon2.verify(user.password_hash, password) ;
    if (!passwordMatches) {
       
        const error = new Error("Invalid username or password");
       error.code = "INVALID_CREDENTIALS";
       throw error;
    }
     const accessToken = await createAccessToken(user.id) ;
    return {
       accessToken,
       user: {
        id:String(user.id) ,
        username:user.username
       }
    } ;
}