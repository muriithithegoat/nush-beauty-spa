import express from "express";
import {
  createpaymentsController,
  getpaymentsController,
  getpaymentsByIdController,
  updatepaymentsController,
  deletepaymentsController
} from "./payments.controller";

const router = express.Router();


router.post("/", createpaymentsController);


router.get("/", getpaymentsController);


router.get("/:id", getpaymentsByIdController);


router.put("/:id", updatepaymentsController);


router.delete("/:id", deletepaymentsController);

export default router;
