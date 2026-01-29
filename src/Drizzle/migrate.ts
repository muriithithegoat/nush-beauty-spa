import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, {client} from "./db"; // adjust if your db.ts is elsewhere

async function main() {
  console.log("......Migrations Started......");
  await migrate(db, { migrationsFolder: "./drizzle" }); // ✅ match your drizzle.config.json out folder
  console.log("......Migrations Completed......");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
