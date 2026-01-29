import { Router } from "express";
import { registerUser, verifyUser, loginUser } from "./auth.controller";

const router = Router();


router.post("/register", registerUser);
router.post("/verify", verifyUser);


router.post("/login", loginUser);

export default router;
