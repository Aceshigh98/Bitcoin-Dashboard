//client-side JavaScript file
// Make a GET request to your server endpoint
const getBTCData = () => {
  return fetch("http://143.198.69.173:3000/BTC") // Replace with your server URL and endpoint
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

export { getBTCData };
