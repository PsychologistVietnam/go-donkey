import { Router } from "express";
import {ping, login , me, adminCheck} from "../controllers/authController.js"
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";
import {rateLimit} from "express-rate-limit" ;

console.log("[auth] module loaded");
const authRouter = Router() ;

const loginLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    limit : 10,
    standardHeaders: "draft-7",
    legacyHeaders: false ,
    message : {
        success : false ,
        message : "Too many login attempts. Try again later."
    }
})

authRouter.get("/ping",ping) ;

authRouter.post("/login",loginLimiter ,login) ;

authRouter.get("/me", requireAuth,me) ;

authRouter.get("/admin-check", requireAuth , requireAdmin, adminCheck) ; 


export default authRouter;