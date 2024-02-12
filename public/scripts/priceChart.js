const priceChart = (data) => {
  if (typeof document !== "undefined") {
    const ctx = document.getElementById("line-chart");

    const dataRoute = data.btcData;
    const timeArr = dataRoute.time;
    const priceArr = dataRoute.price_array;

    const max = Math.max(...priceArr);
    const min = Math.min(...priceArr);

    console.log(max,min,priceArr);

    // Chart data
    const time = (timeArr);
    const info = {
      labels: time,
      datasets: [
        {
          label: "Bitcoin Price",
          data: priceArr,
          borderColor: "white",
          borderWidth: 5,
        },
      ],
    };

    // Chart configuration
    const options = {
      responsive: true, // Adjusts the chart size to fit the container
      maintainAspectRatio: false, // Allows the chart to not maintain aspect ratio
      // Add other options as needed
      plugins: {
        legend: {
          labels: {
            font: {
              family: "Arial", // Set font family
              weight: "bold", // Set font weight
              size: 15,
            },
          },
        },
      },
      // Add other options as needed

      animations: {
        tension: {
          duration: 5000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },

      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: min - 20,
          max: max + 20,
          ticks: {
            color: "white", // Change Y-axis label font color
          },
        },
        x: {
          ticks: {
            color: "white", // Change X-axis label font color
          },
        },
      },
    };

    // Create Chart instance
    new Chart(ctx, {
      type: "line",
      data: info,
      options: options,
    });
  }
};

const renderPriceChart = (data) => {
  priceChart(data);
};

export { renderPriceChart };
