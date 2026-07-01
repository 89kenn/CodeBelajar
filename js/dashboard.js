document.addEventListener("DOMContentLoaded", () => {

  const dashProgress = document.getElementById("dashProgress");
  const dashXP = document.getElementById("dashXP");
  const dashLevel = document.getElementById("dashLevel");
  const dashBadge = document.getElementById("dashBadge");

  const learningTarget = document.getElementById("learningTarget");
  const lastActivity = document.getElementById("lastActivity");
  const dailyStreak = document.getElementById("dailyStreak");

  const xp = parseInt(localStorage.getItem("xp") || "0");
  const level = parseInt(localStorage.getItem("level") || "1");
  const badge = parseInt(localStorage.getItem("badgeCount") || "0");

  dashXP.textContent = xp;
  dashLevel.textContent = level;
  dashBadge.textContent = badge;

  const progress = Math.min(Math.floor((xp / 1000) * 100), 100);

  dashProgress.textContent = progress + "%";

  learningTarget.textContent =
    localStorage.getItem("learningTarget") ||
    "Selesaikan materi HTML, CSS, dan JavaScript.";

  lastActivity.textContent =
    localStorage.getItem("lastActivity") ||
    "Belum ada aktivitas.";

  dailyStreak.textContent =
    (localStorage.getItem("dailyStreak") || "0") + " Hari";

});
