import express from "express";
import type { Request, Response, NextFunction } from "express";
import { Item } from "../schemas/itemSchema.js";
const router = express.Router();

// Post a item
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = req.body;
    const result = await Item.create(newItem);
    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
});

// Get all items
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Item.find();

    if (!result) {
      return res.status(404).json({ message: "Items not found " });
    }

    res.status(200).json({
      success: true,
      items: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Get a specified Item
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await Item.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Item not found " });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// Update Item
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const result = await Item.findByIdAndUpdate(id, update, {
      new: true, // Returns updated value
      runValidators: true, // Apply schema definition
    });

    if (!result) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
