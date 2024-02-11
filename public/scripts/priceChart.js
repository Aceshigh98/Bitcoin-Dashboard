const priceChart = (data) => {
  if (typeof document !== "undefined") {
    const ctx = document.getElementById("line-chart");

    const dataRoute = data.Data.btcData;

    const max = Math.max(...dataRoute.price_array);
    const min = Math.min(...dataRoute.price_array);

    // Function to generate month names for labels
    const getMonthNames = () => {
      const months = [];
      const currentDate = new Date();
      for (let i = 0; i < 7; i++) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        months.unshift(
          currentDate.toLocaleString("default", { month: "long" })
        );
      }
      return months;
    };

    // Chart data
    const labels = getMonthNames();
    const info = {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price",
          data: dataRoute.price_array,
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
              size: 20,
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
          min: min - 5,
          max: max + 5,
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
