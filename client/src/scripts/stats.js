const statsBar = (data) => {
  const divideHash = 1000000000000000000;

  if (typeof document !== "undefined") {
    if (data && typeof data === "object") {
      let JSONdata = data.btcData;
      

      //Stats Container Elements
      let priceElement = document.getElementById("price-stats");
      let hourHighElement = document.getElementById("24h-h-stats");
      let hourLowElement = document.getElementById("24h-l-stats");
      let marketCapElement = document.getElementById("market-cap-stats");
      let blockHeightStatsElement = document.getElementById("block-height-stats");
      let blockRewardStatsElement = document.getElementById("block-reward-stats");
      let circulationStatsElement = document.getElementById("circulating-supply-stats");
      let hashrateStatsElement = document.getElementById("network-hashrate-stats");


      
      
      //Mining Container Elements
      let blockRewardElement = document.getElementById("block-reward");
      let blockHeightElement = document.getElementById("block-height");
      let valueElement = document.getElementById("value");

      //Hashrate Container Elements
      let hashrateElement1 = document.getElementById("hashrate1");
      let hashrateElement2 = document.getElementById("hashrate2");
      let blockHeight = JSONdata.block_height;
      let blockValue = JSONdata.block_reward * JSONdata.price;
      let hashrateTHS = (JSONdata.hashrate / divideHash).toFixed(2);

      if (
        priceElement &&
        hourHighElement &&
        hourLowElement &&
        marketCapElement &&
        blockRewardElement &&
        blockHeightElement &&
        valueElement &&
        circulationStatsElement &&
        blockRewardStatsElement &&
        blockHeightStatsElement
      ) {
        priceElement.textContent = `$` + JSONdata.price.toLocaleString("en-US");
        hourHighElement.textContent =
          `$` + JSONdata.daily_high.toLocaleString("en-US");

        hourLowElement.textContent =
          `$` + JSONdata.daily_low.toLocaleString("en-US");

        marketCapElement.textContent =
          `$` + JSONdata.market_cap.toLocaleString("en-US");

        blockRewardElement.textContent = JSONdata.block_reward;

        blockHeightElement.textContent = blockHeight.toLocaleString("en-US");

        valueElement.textContent = `$` + blockValue.toLocaleString("en-US");

        hashrateElement1.textContent = hashrateTHS;
        hashrateElement2.textContent = hashrateTHS;

        circulationStatsElement.textContent = JSONdata.circulating_supply.toLocaleString("en-US");

        blockRewardStatsElement.textContent = JSONdata.block_reward.toLocaleString("en-US");

        blockHeightStatsElement.textContent = JSONdata.block_height.toLocaleString("en-US");

        hashrateStatsElement.textContent =  `EH/S `+hashrateTHS;

      } else {
        console.error("One or more HTML elements not found");
      }
    } else {
      console.error("Invalid data");
    }
  }
};

const renderMappedStats = (data) => {
  statsBar(data);
};

export { renderMappedStats };
