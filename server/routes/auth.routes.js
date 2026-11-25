import { Router } from "express";
import {ping,login , me} from "../controllers/authController.js"
import { requireAuth } from "../middleware/authMiddleware.js";

console.log("[auth] module loaded");
const authRouter = Router() ;

authRouter.get("/ping",ping) ;

authRouter.post("/login",login) ;

authRouter.get("/me", requireAuth,me)


export default authRouter;