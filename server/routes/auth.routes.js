import { Router } from "express";
import {ping,login} from "../controllers/authController.js"
console.log("[auth] module loaded");
const authRouter = Router() ;

authRouter.get("/ping",ping) ;

authRouter.post("/login",login) ;

export default authRouter;