import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser {
  id: number;
  email: string;
}

const authMiddleware: RequestHandler = (req, res, next): void => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not configured");
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Please login first",
    });
    return;
  }

  try {
    const decoded = jwt.verify(authHeader.slice("Bearer ".length), secret);
    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "number" ||
      !Number.isSafeInteger(decoded.id) ||
      decoded.id < 1 ||
      typeof decoded.email !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
      return;
    }

    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
