import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { SupportTicketsTable } from "../Drizzle/schema";
import type { InferModel } from "drizzle-orm";


export type TSSupportTicket = InferModel<typeof SupportTicketsTable>;


export const createSupportTicketService = async (ticket: TSSupportTicket) => {
  const [created] = await db.insert(SupportTicketsTable).values(ticket).returning();
  return created;
};


export const getAllSupportTicketsService = async () => {
  const allTickets = await db.select().from(SupportTicketsTable);
  return allTickets;
};

export const getSupportTicketByIdService = async (id: number) => {
  const ticket = await db.query.SupportTicketsTable.findFirst({
    where: eq(SupportTicketsTable.ticketID, id),
  });
  return ticket;
};


export const updateSupportTicketService = async (id: number, ticket: Partial<TSSupportTicket>) => {
  const [updated] = await db
    .update(SupportTicketsTable)
    .set(ticket)
    .where(eq(SupportTicketsTable.ticketID, id))
    .returning();
  return updated ?? "Ticket not found or not updated";
};


export const deleteSupportTicketService = async (id: number) => {
  const [deleted] = await db
    .delete(SupportTicketsTable)
    .where(eq(SupportTicketsTable.ticketID, id))
    .returning();
  return deleted ?? "Ticket not found or already deleted";
};
