import { eq } from "drizzle-orm";
import db from "../Drizzle/db"; 
import { PaymentsTable } from "../Drizzle/schema";
type TSPayment = any; 

export const createpaymentsService = async (payment: TSPayment) => {
  const [created] = await db.insert(PaymentsTable).values(payment).returning();
  return created;
};

export const getpaymentsService = async () => {
  const allpayments = await db.select().from(PaymentsTable);
  return allpayments;
};

export const getpaymentsByIdService = async (id: number) => {
  const payment: TSPayment | undefined = await db.query.PaymentsTable.findFirst({
    where: eq(PaymentsTable.paymentID, id),
  });
  return payment;
};




export const updatepaymentsService = async (id: number, payment: TSPayment) => {
  await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.paymentID, id)).returning();
  return "payment updated successfully";
};

export const deletepaymentsService = async (id: number) => {
  const [deleted] = await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentID, id)).returning();
  return deleted;
};