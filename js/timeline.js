// =========================
// timeline.js
// Handles timeline rendering and navigation
// =========================

async function loadTimeline() {
  try {
    const response = await fetch("../data/timelines.json");
    const timelines = await response.json();

    const timelineContainer = document.getElementById("timelineContainer");
    if (!timelineContainer) return;

    timelineContainer.innerHTML = timelines
      .map(
        (event) => `
        <div class="timeline-card" onclick="openTimeline('${event.page}')">
          <h3>${event.title}</h3>
          <p><strong>Period:</strong> ${event.period}</p>
          <p>${event.description}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading timeline data:", error);
  }
}

// --- Open timeline page in new tab ---
function openTimeline(page) {
  window.open(`../pages/${page}`, "_blank");
}

// --- Initialize timeline on page load ---
document.addEventListener("DOMContentLoaded", loadTimeline);
