const app = require("./app");
const connectDatabase = require("./config/database");

// const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Handlingg Uncaught exception error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

//setting up config file

//setting up config file
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGODB_URI:", process.env.DB_URI);

// connecting to database
connectDatabase();

// setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shuting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
