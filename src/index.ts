import Express from "express"
import usersRouter from "./users/users.router"
import PaymentRouter from "./payments/payments.router"
import authRouter from "./auth/auth.router"
import supportRouter from "./supportticket/support.router"
import cors from 'cors'

// COMMENT OUT THE PROBLEMATIC IMPORT
// import bookingsRouter from "./bookings/bookings.router"

export const app = Express();
const PORT = 8085;

app.use(Express.json())
app.use(cors())

// Your existing routes (keep these)
app.use("/api/users", usersRouter)
app.use("/api/support", supportRouter)
app.use("/api/payments", paymentsRouter)

// TEMPORARILY REMOVE THIS LINE - it's causing the 404
// app.use("/api/bookings", bookingsRouter)

// ADD DIRECT BOOKINGS ROUTES INSTEAD:
import { 
  createBookingController, 
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController
} from "./bookings/bookings.controller";
import paymentsRouter from "./payments/payments.router"

// Direct bookings routes - add these:
app.post("/api/bookings", createBookingController);
app.get("/api/bookings", getAllBookingsController);
app.get("/api/bookings/:id", getBookingByIdController);
app.put("/api/bookings/:id", updateBookingController);
app.delete("/api/bookings/:id", deleteBookingController);

app.use("/api/auth", authRouter)

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Test route to verify bookings controller is working
app.get("/api/bookings/test", (req, res) => {
  res.json({ message: "Bookings controller is accessible!" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});