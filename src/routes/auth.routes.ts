import express, { Router } from "express"
import { createUserHandler } from "../controllers/user.controller";
import validateResource from "../middlewares/validate.middleware";
import { createUserSchema } from "../schemas/user.schema"
import { createUserSessionHandler, getSessionsHandler,deleteSessionHandler } from "../controllers/session.controller";
import { createSessionSchema } from "../schemas/session.schema";
import requireUser from "../middlewares/requireUser";
const router=express.Router();

router.post("/signup",validateResource(createUserSchema),createUserHandler)
router.post("/sessions",validateResource(createSessionSchema),createUserSessionHandler)
router.get("/sessions",requireUser,getSessionsHandler)
router.delete("/sessions",requireUser,deleteSessionHandler)
// router.post("/login")
export default router;
