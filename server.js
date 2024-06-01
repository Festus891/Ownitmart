const app = require("./backend/app");
const connectDatabase = require("./backend/config/database");

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

// connecting to database
connectDatabase();

// setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Example route for root URL
app.get("/", (req, res) => {
  res.send("Hello, world!");
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
