import express, { Router } from "express"
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validate.middleware";
import { createUserSchema } from "../schemas/user.schema";
const router=express.Router();
router.post("/signup",validateResource(createUserSchema),createUserHandler)

export default router;