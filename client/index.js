// Import dotenv and configure environment variables
import dotenv from "dotenv";
dotenv.config();

// Import express, node-fetch, and cors using ES module syntax
import express from "express";
import fetch from "node-fetch"; // Ensure you're using a version of node-fetch that supports ESM
import cors from "cors";

// Initialize express app
const app = express();

// Retrieve API key and origin from environment variables
const apikey = process.env.API_SERVER;
const PORT = process.env.CLIENT_PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define route handler for "/btcdata"
app.get("/data", async (req, res) => {
  try {
    // Fetch Bitcoin data using the API key and await the response
    const response = await fetch(apikey); // Replace with your actual API request URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response

    // Send the fetched data back to the client
    res.json(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    res.status(500).json({ error: error.message }); // Handle errors in the response
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
