import { Request, Response } from "express";
import { verifyToken } from "../utils/jwtSignAndVerify";

export const auth = (req: Request, res: Response, next: () => void) => {
  const auth = req.headers?.authorization;
  try {
    if (!auth) {
      res.status(401).json({
        error: "Authorization header is missing!",
      });
    }
    if (auth?.includes("Bearer")) {
      const token = auth.replace("Bearer", "").trim();
      const user = verifyToken(token);
      (req as any).user = user;
      next();
    } else {
      res.status(401).json({
        error: "Authorization header is missing Bearer key!",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while validating auth token" });
  }
};
