import { eq, sql } from "drizzle-orm";
import db from "../Drizzle/db"; 
import { UsersTable } from "../Drizzle/schema";
//import type { TSUser } from "../Drizzle/schema";

export const createusersService = async (user: TUserInsert) => {
  await db.insert(UsersTable).values(user);
  return "user created";
};

export const getusersService = async () => {
  return await db.query.UsersTable.findMany({
    columns: {
      userID: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      address: true,
      role: true
    }
  });
};

export const getusersByIdService = async (id: number) => {
  return await db.query.UsersTable.findFirst({
    where: sql`${UsersTable.userID} = ${id}`
  });
};

export const updateusersService = async (id: number, updatedUser: Partial<TSUser>) => {
  await db.update(UsersTable).set(updatedUser).where(eq(UsersTable.userID, id)).returning();
  return "users updated successfully";
};

export const deleteusersService = async (id: number) => {
  const [deleted] = await db.delete(UsersTable).where(eq(UsersTable.userID, id)).returning();
  return deleted;
};