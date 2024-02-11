// server.js
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const apikey = process.env.API_KEY;
const origin = process.env.ORIGIN;

app.use(
  cors({
    origin: origin, // or ['http://example.com', 'http://another.com']
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("public"));

app.get("/btcdata", async (req, res) => {
  // Fetch Bitcoin data using the API key
  // Return the data to the client

  try {
    // Call the store function and wait for the result

    const Data = await fetch(apikey) // Replace with your server URL and endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the data received from the server
        return data;
        // Process and use the data as needed in client-side code
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // Handle errors occurred during the fetch operation
      });

    res.json({ Data });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors in the response
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
