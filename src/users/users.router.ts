import { Router } from "express";
import { 
  createusersController, 
  getusersController, 
  getusersByIdController,
  updateusersController,
  deleteusersController 
} from "./users.controller";
import { authenticate } from "../middleware/auth";
import { requireAdmin } from "../middleware/Requirerole";

const router = Router();

// POST /api/users/register (public)
router.post("/register", createusersController);

// GET /api/users - List all users (admin only)
router.get("/", authenticate, requireAdmin, getusersController);

// GET /api/users/:id - Get user by ID (authenticated users)
router.get("/:id", authenticate, getusersByIdController);

// PUT /api/users/:id - Update user (authenticated users)
router.put("/:id", authenticate, updateusersController);

// DELETE /api/users/:id - Delete user (admin only)
router.delete("/:id", authenticate, requireAdmin, deleteusersController);

export default router;