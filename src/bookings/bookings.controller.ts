
import { Request, Response } from "express";
import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  deleteBookingService,
} from "./bookings.service";


export const createBookingController = async (req: Request, res: Response) => {
  try {
    const booking = req.body;

    
    if (!booking.userID || !booking.bookingDate || !booking.serviceDate) {
      res.status(400).json({ message: "Missing required fields (userID, bookingDate, serviceDate)" });
      return;
    }

    
    booking.bookingDate = new Date(booking.bookingDate);
    booking.serviceDate = new Date(booking.serviceDate);

    const newBooking = await createBookingService(booking);
    if (!newBooking) {
      res.status(400).json({ message: "Booking not created" });
      return;
    }

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllBookingsController = async (_req: Request, res: Response) => {
  try {
    const bookings = await getAllBookingsService();
    if (!bookings || bookings.length === 0) {
      res.status(404).json({ message: "No bookings found" });
      return;
    }

    res.status(200).json({ data: bookings });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getBookingByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid booking ID" });
      return;
    }

    const booking = await getBookingByIdService(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json({ data: booking });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const updateBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid booking ID" });
      return;
    }

    const updates = req.body;

    
    if (updates.bookingDate) updates.bookingDate = new Date(updates.bookingDate);
    if (updates.serviceDate) updates.serviceDate = new Date(updates.serviceDate);

    const existingBooking = await getBookingByIdService(id);
    if (!existingBooking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const updated = await updateBookingService(id, updates);
    if (!updated) {
      res.status(400).json({ message: "Booking not updated" });
      return;
    }

    res.status(200).json({ message: "Booking updated successfully", booking: updated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid booking ID" });
      return;
    }

    const existingBooking = await getBookingByIdService(id);
    if (!existingBooking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const deleted = await deleteBookingService(id);
    if (!deleted) {
      res.status(400).json({ message: "Booking not deleted" });
      return;
    }

    res.status(200).json({ message: "Booking deleted successfully", booking: deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
