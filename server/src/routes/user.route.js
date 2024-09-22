import { Router } from "express";
import { logout, signUp } from "../controllers/user.controller.js";
import { signIn } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)

// Secured Routes
router.post('/logout',verifyToken,logout)


export default router