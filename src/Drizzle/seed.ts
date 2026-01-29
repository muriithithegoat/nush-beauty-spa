import db from "./db";
import {
  UsersTable,
  DesignsTable,
  BookingsTable,
  PaymentsTable,
  SupportTicketsTable
} from "./schema";

async function seed() {
  console.log("Seeding to database started...");

  // Insert Users
  await db.insert(UsersTable).values(
    {
      firstName: "Nushka",
      lastName: "Maina",
      email: "nushka@example.com",
      password: "password123",
      phoneNumber: "0712345678",
      address: "Westlands, Nairobi",
      role: "admin",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "password123",
      phoneNumber: "0798765432",
      address: "Karen, Nairobi",
      role: "customer",
    },
    {
      firstName: "Alice",
      lastName: "Wanjiru",
      email: "alice@example.com",
      password: "password123",
      phoneNumber: "0788888888",
      address: "Thika, Kiambu",
      role: "customer",
    },
    {
      firstName: "Bob",
      lastName: "Mwangi",
      email: "bob@example.com",
      password: "password123",
      phoneNumber: "0777777777",
      address: "Ruiru, Kiambu",
      role: "staff",
    },
  );

  // Insert Designs (Makeup & Nails)
  await db.insert(DesignsTable).values([
    {
      title: "Bridal Makeup",
      category: "Makeup",
      imageUrl: "https://example.com/images/bridal-makeup.jpg",
      description: "Elegant bridal look with long-lasting finish.",
    },
    {
      title: "Smokey Eyes",
      category: "Makeup",
      imageUrl: "https://example.com/images/smokey-eyes.jpg",
      description: "Perfect for evening events and parties.",
    },
    {
      title: "French Nails",
      category: "Nails",
      imageUrl: "https://example.com/images/french-nails.jpg",
      description: "Classic French manicure with a modern twist.",
    },
    {
      title: "Gel Polish",
      category: "Nails",
      imageUrl: "https://example.com/images/gel-polish.jpg",
      description: "Durable and glossy gel nail polish designs.",
    },
  ]);

  // Insert Bookings
  await db.insert(BookingsTable).values([
    {
      userID: 2,
      designID: 1,
      bookingDate: "2025-09-18",
      serviceDate: "2025-09-20",
      status: "Pending",
    },
    {
      userID: 3,
      designID: 3,
      bookingDate: "2025-09-18",
      serviceDate: "2025-09-21",
      status: "Confirmed",
    },
  ]);

  // Insert Payments
  await db.insert(PaymentsTable).values([
    {
      bookingID: 1,
      paymentDate: "2025-09-19",
      amount: "5000.00",
      paymentMethod: "Mpesa",
    },
    {
      bookingID: 2,
      paymentDate: "2025-09-19",
      amount: "2500.00",
      paymentMethod: "Card",
    },
  ]);

  // Insert Support Tickets
  await db.insert(SupportTicketsTable).values([
    {
      userID: 2,
      subject: "Booking Reschedule",
      description: "I would like to change my service date.",
      status: "Open",
      createdDate: "2025-09-18",
    },
    {
      userID: 3,
      subject: "Payment Issue",
      description: "Mpesa payment not reflecting.",
      status: "In Progress",
      createdDate: "2025-09-18",
    },
  ]);

  console.log("Seeding to database completed successfully ✅");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed ❌:", error);
  process.exit(1);
});
