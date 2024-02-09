import { getBTCData } from "./API/API.js";
import { renderMappedStats } from "./server/stats.js";
import { renderPriceChart } from "./server/priceChart.js";
import { renderCirculationChart } from "./server/circulationChart.js";
import { renderProgressBar } from "./server/halving.js";

const fetchBTCData = async () => {
  try {
    let data = await getBTCData();

    console.log(data);

    await renderMappedStats(data);
    await renderPriceChart(data);
    await renderCirculationChart(data);
    await renderProgressBar(data);

    // If there was no error, clear the previous interval and set a new one
  } catch (error) {
    console.error("Error fetching BTC data:", error);
  }
};

fetchBTCData();
