import { Request, Response, NextFunction } from "express";

export type UserRole = "customer" | "admin" | "staff";

declare global {
  namespace Express {
    interface User {
      userID: number;
      email: string;
      role: UserRole;
    }
    interface Request {
      user?: User;
    }
  }
}

// Only allow a specific role
export function requireRole(role: UserRole) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: `Access denied. ${role} role required.` });
      return;
    }
    next();
  };
}

// Allow any of multiple roles
export function requireAnyRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: `Access denied. Allowed roles: ${roles.join(", ")}` });
      return;
    }
    next();
  };
}

// Check if user is admin
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admin role required." });
    return;
  }
  next();
}

// Check if user is customer
export function requireCustomer(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== "customer") {
    res.status(403).json({ message: "Access denied. Customer role required." });
    return;
  }
  next();
}