import { Request, Response } from "express";
import {
  createSupportTicketService,
  deleteSupportTicketService,
  getSupportTicketByIdService,
  getAllSupportTicketsService,
  updateSupportTicketService,
} from "./support.service";

// ✅ Create Support Ticket
export const createSupportTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = req.body;
    const created = await createSupportTicketService(ticket);
    if (!created) return res.json({ message: "Support ticket not created" });
    return res.status(201).json({ message: created });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Support Tickets
export const getAllSupportTicketsController = async (_req: Request, res: Response) => {
  try {
    const tickets = await getAllSupportTicketsService();
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No support tickets found" });
    }
    return res.status(200).json(tickets);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get Support Ticket by ID
export const getSupportTicketByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const ticket = await getSupportTicketByIdService(id);
    if (!ticket) return res.status(404).json({ message: "Support ticket not found" });
    return res.status(200).json({ data: ticket });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update Support Ticket
export const updateSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const ticket = req.body;
    const existingTicket = await getSupportTicketByIdService(id);
    if (!existingTicket) return res.status(404).json({ message: "Support ticket not found" });

    const updated = await updateSupportTicketService(id, ticket);
    if (!updated) return res.status(400).json({ message: "Support ticket not updated" });
    return res.status(200).json({ message: "Support ticket updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Support Ticket
export const deleteSupportTicketController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingTicket = await getSupportTicketByIdService(id);
    if (!existingTicket) return res.status(404).json({ message: "Support ticket not found" });

    const deleted = await deleteSupportTicketService(id);
    if (!deleted) return res.status(400).json({ message: "Support ticket not deleted" });

    return res.status(204).json({ message: "Support ticket deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
