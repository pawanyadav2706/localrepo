// controllers/foodControllers.js
import fs from "fs";
import foodModel from "../models/foodModel.js";

export const addFood = async (req, res) => {
  try {
    console.log("AddFood body:", req.body, "file:", req.file && req.file.filename);
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is missing!" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price), // ensure number
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.error("AddFood error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};

export const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;

    if (!foodId) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // image delete (if exists)
    const imagePath = `uploads/${food.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) console.log("Image not found or delete error (skipping):", err.message);
      else console.log("Image deleted:", imagePath);
    });

    await foodModel.findByIdAndDelete(foodId);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
