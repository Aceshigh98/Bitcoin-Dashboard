//client-side JavaScript file
// Make a GET request to your server endpoint

import { renderMappedStats } from "../scripts/stats.js";
import { renderPriceChart } from "../scripts/priceChart.js";
import { renderCirculationChart } from "../scripts/circulationChart.js";
import { renderProgressBar } from "../scripts/halving.js";

const getBTCData = () => {
  return fetch("https://aceshighbitcoin.com/data") // Replace with your server URL and endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      // Handle the data received from the server
      //console.log("Data from server:", data);
      return data;
      // Process and use the data as needed in client-side code
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors occurred during the fetch operation
    });
};

const fetchBTCData = async () => {
  try {
    let res = await getBTCData();

    let data = res.data;
    renderMappedStats(data);
    renderPriceChart(data);
    renderCirculationChart(data);
    renderProgressBar(data);

    // If there was no error, clear the previous interval and set a new one
  } catch (error) {
    console.error("Error fetching BTC data:", error);
  }
};

fetchBTCData();
