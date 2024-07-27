const mongoose = require('mongoose');
const Category = require('./models/category-model');
require('dotenv').config();

const connectDb = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("Connection successful to DB");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

const seedCategories = async () => {
  try {
    const categories = require('./categories.json');
    await Category.insertMany(categories);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories", error);
  }
};

const start = async () => {
  await connectDb();
  await seedCategories();
  mongoose.connection.close();
};

start();
