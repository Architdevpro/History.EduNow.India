// =========================
// Main.js
// General site logic
// =========================

// --- Search functionality ---
const searchBar = document.getElementById("searchBar");
const timelineCards = document.querySelectorAll(".timeline-card");

if (searchBar) {
  searchBar.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    timelineCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// --- Clickable Timeline Cards ---
timelineCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetPage = card.getAttribute("data-page");
    if (targetPage) {
      window.location.href = `pages/${targetPage}.html`;
    }
  });
});

// --- Smooth Scroll for Navbar ---
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
