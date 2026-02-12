import { Request, Response } from "express";
import { updateusersService, getusersService } from "../users/users.service";
import type { UserRole } from "../middleware/Requirerole";

// Get all users (admin only)
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getusersService();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRoleController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;

    // Validate role
    const validRoles: UserRole[] = ["customer", "admin", "staff"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
      });
    }

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updated = await updateusersService(userId, { role });
    if (!updated) {
      return res.status(400).json({ message: "User not found or could not be updated" });
    }

    return res.status(200).json({
      message: `User role updated to ${role}`,
      role,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get user statistics (admin only)
export const getUserStatisticsController = async (req: Request, res: Response) => {
  try {
    const users = await getusersService();
    
    const stats = {
      totalUsers: users.length,
      adminCount: users.filter(u => u.role === "admin").length,
      staffCount: users.filter(u => u.role === "staff").length,
      customerCount: users.filter(u => u.role === "customer").length,
    };

    return res.status(200).json(stats);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
