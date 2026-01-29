import { Router } from "express";
import * as controller from "./support.controller";

const router = Router();


router.post("/", controller.createSupportTicketController);


router.get("/", controller.getAllSupportTicketsController);


router.get("/:id", controller.getSupportTicketByIdController);


router.put("/:id", controller.updateSupportTicketController);


router.delete("/:id", controller.deleteSupportTicketController);

export default router;
