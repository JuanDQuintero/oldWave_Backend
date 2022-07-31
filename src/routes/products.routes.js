import { Router } from "express";
import { methods as productsController } from "../controllers/products.controller";

const router = Router();

router.get("/", productsController.getProducts);

export default router;
