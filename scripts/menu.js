const menuToggle = document.querySelector(".menu-icon");
const menuItem = document.querySelector(".hero-menu");

// Add click event listener to the menu toggle button
menuToggle.addEventListener("click", function (event) {
  menuItem.classList.toggle("active");
});

// Close menu if clicked outside
document.addEventListener("click", function (event) {
  if (!menuItem.contains(event.target) && !menuToggle.contains(event.target)) {
    menuItem.classList.remove("active");
  }
});

// Prevent menu from closing when clicking inside
menuItem.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent event from propagating to document
});

// Close menu when clicking a menu item
menuItem.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function () {
    menuItem.classList.remove("active");
  });
});

//Acive scroll for each menu item.

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const scrollOffset = -150;

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop + scrollOffset,
          behavior: "smooth",
        });
      }
    });
  });
});
