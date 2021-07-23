import express from "express";
import UserRouter from "./user.router";

const router = express.Router();

router.use("/api/users", UserRouter);

export default router;
