import express from "express";
import {
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", getAccount);

router.post("/", createAccount);

router.put("/:id", updateAccount);

router.delete("/:id", deleteAccount);

export default router;
