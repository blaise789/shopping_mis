import express, { Router } from "express"
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validate.middleware";
import { createUserSchema } from "../schemas/user.schema"
import { createUserSessionHandler } from "../controllers/session.controller";
import { createSessionSchema } from "../schemas/session.schema";
const router=express.Router();

router.post("/signup",validateResource(createUserSchema),createUserHandler)
router.post("/login",validateResource(createSessionSchema),createUserSessionHandler)
// router.post("/login")
export default router;
