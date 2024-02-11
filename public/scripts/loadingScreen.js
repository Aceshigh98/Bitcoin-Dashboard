// loadingScreen.js

window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");

  // Add a class to indicate content is loaded
  document.body.classList.add("loaded");

  // Hide the loading screen after 3 seconds
  setTimeout(function () {
    loadingScreen.style.opacity = "0";
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 1000);
  }, 3000);
});
