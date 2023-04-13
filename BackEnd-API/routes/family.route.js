import express from "express";
import {
  createFamily,
  getFamily,
  getFamilies,
  getSections,
  addToCart,
  removeFromCart,
} from "../controllers/family.controller.js";

import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);

// add to cart
router.post("/:familyId/:productId", isAuth, addToCart);

// remove from cart
router.delete("/:familyId/:productId", isAuth, removeFromCart);

router.get("/", isAuth, getFamily);
router.get("/:familyId/sections", getSections);

export default router;
