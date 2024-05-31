const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

// product to push to our database
const products = require("../data/product.json");

// setting the dotenv file
dotenv.config({ path: "backend/config/config.env" });

// connect database
connectDatabase();

// the seed function to push product.json data into our database
const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("Product are deleted");

    await Product.insertMany(products);
    console.log("all product are added ");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProduct();
