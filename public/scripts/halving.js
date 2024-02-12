const progressBar = (data) => {
  if (typeof document !== "undefined") {
    const dataRoute = data.btcData;

    const halvingPercentage = claculateHalving(dataRoute.block_height);

    let halvingDaysElement = document.getElementById("h-days");
    let blocksLeftElement = document.getElementById("h-blocksleft");
    

    let blocksLeft = calculateBlocks(dataRoute.block_height);
    let daysLeft = calculateDays(blocksLeft);

    //console.log("blocks left: " + blocksLeft);
    //console.log("Days left: " + daysLeft);

    if (halvingDaysElement && blocksLeftElement) {
      blocksLeftElement.textContent = blocksLeft;
      halvingDaysElement.textContent = daysLeft;
     } else {
      console.error("One or more HTML elements not found");
    }

    var options = {
      chart: {
        height: 400,
        type: "radialBar",
      },

      series: [halvingPercentage],
      colors: ["#f6931a"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "f6931a",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#f6931a",
              fontSize: "13px",
            },
            value: {
              color: "#f6931a",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#f6931a"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Halving"],
    };

    var chart = new ApexCharts(document.getElementById("prog-chart"), options);

    chart.render();
  }
};

const renderProgressBar = (data) => {
  progressBar(data);
};

const claculateHalving = (data) => {
  const halvingBlockLength = 210000;

  let prog = data / halvingBlockLength;
  let progFloor = Math.floor(prog);

  let halfingPercentage = (prog - progFloor) * 100;

  return halfingPercentage.toFixed(0);
};

const calculateBlocks = (data) => {
  const halvingBlockLength = 210000;

  let blocks = data % halvingBlockLength;

  let remainingBlocks = halvingBlockLength - blocks;

  return remainingBlocks;
};

const calculateDays = (data) => {
  let minutes = data * 10;
  let hours = minutes / 60;
  let days = hours / 24;

  return Math.round(days);
};

export { renderProgressBar };
