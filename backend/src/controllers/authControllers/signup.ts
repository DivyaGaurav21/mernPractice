import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../config/db";
import { AuthBody } from "../controllerTypes";


const createToken = (id: number, email: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id, email },
    secret,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"],
    },
  );
};

export const signup: RequestHandler<
  Record<string, never>,
  unknown,
  AuthBody
> = async (req, res): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
      return;
    }

    const [existingUsers] = await pool.execute<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      res.status(409).json({
        success: false,
        message: "Email already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (name, email, password)
       VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
    );
    const token = createToken(result.insertId, email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};