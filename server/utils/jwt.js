import { SignJWT, jwtVerify } from "jose";

const secretText = process.env.JWT_SECRET ;


if(!secretText || Buffer.byteLength(secretText,"utf-8")<32) {
    throw new Error("Missing JWT or JWT too short") ;
}

const secret = new TextEncoder().encode(secretText) ;


export async function createAccessToken(userID) {
    const tokenBuilder = new  SignJWT({}) ;

   tokenBuilder.setProtectedHeader({ alg: "HS256", typ: "JWT" });
   tokenBuilder.setSubject(String(userID));
   tokenBuilder.setIssuer("go-donkey-api") ;
   tokenBuilder.setAudience("go-donkey-clients");
   tokenBuilder.setIssuedAt() ;
   tokenBuilder.setExpirationTime("12h") ;

   const token = await tokenBuilder.sign(secret) ;

   return token ;
}


export async function verifyAccessToken(token) {
    const result = await jwtVerify(token, secret , {
        algorithms:["HS256"] ,
        issuer:"go-donkey-api" ,
        audience:"go-donkey-clients",
        requiredClaims:["sub" , "iat" , "exp"] ,
        maxTokenAge: "12h"
    })

    return result.payload;
}