import express from "express";
import UserController from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signin", async (req, res) => {
  const controller = new UserController();
  const response: any = await controller.signInUser(req.body);
  if (response?.errors) {
    res.status(400).json(response);
  }
  return res.json(response);
});

router.post("/signup", async (req, res) => {
  const controller = new UserController();
  const response = await controller.registerUser(req.body);
  return res.json(response);
});

router.get("/", auth, async (req, res) => {
  res.send((req as any).user);
});

export default router;
