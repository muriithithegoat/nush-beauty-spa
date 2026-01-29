import express from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController
} from "./bookings.controller";

const router = express.Router();

// POST /api/bookings
router.post("/", createBookingController);

// GET /api/bookings
router.get("/", getAllBookingsController);

// GET /api/bookings/:id
router.get("/:id", getBookingByIdController);

// PUT /api/bookings/:id  
router.put("/:id", updateBookingController);

// DELETE /api/bookings/:id
router.delete("/:id", deleteBookingController);

export default router;