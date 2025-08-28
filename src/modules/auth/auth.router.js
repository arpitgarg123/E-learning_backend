import { Router } from "express";
import { login, logout, signup } from "./auth.controller.js";
import { authenticated } from "../../middlewares/authentication.js";

const router = Router();

router.post("/signup", signup)
router.post("/login",login)
router.get("/logout", authenticated,logout)

export default router