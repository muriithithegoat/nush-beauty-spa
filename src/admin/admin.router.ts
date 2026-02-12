import { Router } from "express";
import {
  getAllUsersController,
  updateUserRoleController,
  getUserStatisticsController,
} from "./admin.controller";
import { authenticate } from "../middleware/auth";
import { requireAdmin } from "../middleware/Requirerole";

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

// GET /api/admin/users - Get all users
router.get("/users", getAllUsersController);

// PUT /api/admin/users/:id/role - Update user role
router.put("/users/:id/role", updateUserRoleController);

// GET /api/admin/statistics - Get user statistics
router.get("/statistics", getUserStatisticsController);

export default router;
