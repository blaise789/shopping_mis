
import express from "express";
import requireUser from "../middlewares/requireUser";
import { createProductHandler, deleteProductHandler, findProductHandler, updateProductHandler } from "../controllers/product.controller";
import validateResource from "../middlewares/validate.middleware";
import { createProductSchema, deleteProductSchema, findProductSchema, updateProductSchema } from "../schemas/product.schema";

const router=express.Router()

router.get("/:productId",validateResource(findProductSchema),findProductHandler)
router.post("/",[requireUser,validateResource(createProductSchema)],createProductHandler)
router.put("/:productId",[requireUser,validateResource(updateProductSchema)],updateProductHandler)
router.delete("/:productId",[requireUser,validateResource(deleteProductSchema)],deleteProductHandler)
export default router