// Import dotenv and configure environment variables
import dotenv from "dotenv";
dotenv.config();
// Import express, node-fetch, and cors using ES module syntax
import express from "express";
import cors from "cors";

// Initialize express app
const app = express();

// Retrieve API key and origin from environment variables
const PORT = process.env.CLIENT_PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
