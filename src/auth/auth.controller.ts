import { Request, Response } from "express";
import {
  registerUserService,
  verifyUserService,
  loginUserService,
} from "../auth/auth.service";

// Register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, role } =
      req.body;

    const result = await registerUserService({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      role: role || "customer",
    });

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Verify
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const result = await verifyUserService(email, code);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
