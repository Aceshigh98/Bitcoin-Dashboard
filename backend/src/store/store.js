import { API_CoinGecko_Call } from "../utils/CoinGecko_API.js";
import { API_MinerStat_Call } from "../utils/MinerStat_API.js";
import { API_BlockChainData_Call } from "../utils/BlockChainData_API.js";

const dataArrMaxLength = 8;
// Create an object to store the Bitcoin data

let data = {
  name: "",
  price: 0,
  price_array: [],
  market_cap: 0,
  ath: 0,
  daily_high: 0,
  daily_low: 0,
  circulating_supply: 0,
  algorithm: "",
  hashrate: 0,
  block_reward: 0,
  block_height: 0,
  total_block_reward: 0,
  time: [],
  API_Call_Count: 0,
};

async function fetchDataFromAPIs() {
  try {
    const dataCoinGecko = await API_CoinGecko_Call();
    const dataMinerStat = await API_MinerStat_Call();
    const dataBlockChain = await API_BlockChainData_Call();

    return { dataCoinGecko, dataMinerStat, dataBlockChain };
  } catch (error) {
    throw new Error("Error fetching data from APIs");
  }
}

function mapBTCObject(dataCoinGecko, dataMinerStat, dataBlockChain) {
  data.name = dataCoinGecko.name;
  data.price = dataCoinGecko.current_price;
  data.market_cap = dataCoinGecko.market_cap;
  data.ath = dataCoinGecko.ath;
  data.daily_high = dataCoinGecko.high_24h;
  data.daily_low = dataCoinGecko.low_24h;
  data.circulating_supply = dataCoinGecko.circulating_supply;
  data.algorithm = dataMinerStat.algorithm;
  data.hashrate = dataMinerStat.network_hashrate;
  data.block_reward = dataMinerStat.reward_block;
  data.block_height = dataBlockChain.height;
  data.total_block_reward = dataMinerStat.reward;
  data.API_Call_Count = data.callCounter;
}

//Updating price array

function updatePriceArray(price) {
  if (data.price_array.length === dataArrMaxLength) {
    data.price_array.shift(); // Remove the oldest element
  }
  data.price_array.push(price);
}

//Updating time array

function updateTimeArray() {
  let time = getTime();

  if (data.time.length === dataArrMaxLength) {
    data.time.shift(); // Remove the oldest element
  }
  data.time.push(time);
}

async function store() {
  try {
    const { dataCoinGecko, dataMinerStat, dataBlockChain } =
      await fetchDataFromAPIs();

    updatePriceArray(dataCoinGecko.current_price);
    updateTimeArray();

    const BTCObject = mapBTCObject(
      dataCoinGecko,
      dataMinerStat,
      dataBlockChain
    );
    return BTCObject;
  } catch (error) {
    console.error(error.message);
    return null; // or handle the error as needed
  }
}

// Get the current time in the format HH:MM AM/PM
const getTime = () => {
  // Create a date object.
  let time = new Date();

  let options = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  };

  let timeFormatter = new Intl.DateTimeFormat("en-US", options);
  let formattedTime = timeFormatter.format(time);

  return formattedTime;
};

const execute = () => {
  const time = getTime();
  // Get the minutes from the time string
  let num = time.split(":")[1].split(" ")[0];
  // Check if the minutes are divisible by 5
  if (num % 5 === 0) {
    // Code to execute if the remainder is 0
    store();
  }
};

// Call initially then Update the store every 20 seconds
store();

// Call the store function every 60 seconds
setInterval(execute, 60000);

export { data };
