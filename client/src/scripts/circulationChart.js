const circulationChart = (data) => {
  if (typeof document !== "undefined") {
    const dataRoute = data.btcData;

    const ctx = document.getElementById("c-chart");
    let labelC = document.getElementById("btc-c");
    let labelM = document.getElementById("btc-m");

    let toBeMined = 21000000 - dataRoute.circulating_supply;
    let circulatingSupply = dataRoute.circulating_supply;

    let labelCircDisplay = circulatingSupply.toLocaleString("en-US");
    let labelMinedDisplay = toBeMined.toLocaleString("en-US");

    //Labels

    labelC.textContent = labelCircDisplay;
    labelM.textContent = labelMinedDisplay;

    //Pie Chart data.
    const info = {
      labels: ["In Circulation", "To Be Mined"],
      datasets: [
        {
          data: [circulatingSupply, toBeMined],
          backgroundColor: ["rgb(230,115,0)", "rgb(0,0,0)"],
          hoverOffset: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial", // Set font family
              weight: "bold", // Set font weight
              color: "rgb(230,115,0)",
              size: 12,
            },
          },
        },
      },
    };

    //Pie Chart
    new Chart(ctx, {
      type: "doughnut",
      data: info,
      options: options,
    });
  }
};

const renderCirculationChart = (data) => {
  circulationChart(data);
};

export { renderCirculationChart };
