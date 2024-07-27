const Category = require('../models/category-model');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, services } = req.body;
    const category = new Category({ name, services });
    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
