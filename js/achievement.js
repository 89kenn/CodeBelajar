document.addEventListener("DOMContentLoaded", () => {
  const achLevel = document.getElementById("achLevel");
  const achXP = document.getElementById("achXP");
  const achBadge = document.getElementById("achBadge");

  const badgeFirst = document.getElementById("badgeFirst");
  const badgeHTML = document.getElementById("badgeHTML");
  const badgeCSS = document.getElementById("badgeCSS");
  const badgeJS = document.getElementById("badgeJS");

  const xp = parseInt(localStorage.getItem("xp") || "0");
  const level = parseInt(localStorage.getItem("level") || "1");
  const completed = JSON.parse(localStorage.getItem("completedLessons") || "[]");

  let badgeCount = 0;

  function unlockBadge(badge, condition) {
    if (condition) {
      badge.classList.remove("badge-locked");
      badgeCount++;
    } else {
      badge.classList.add("badge-locked");
    }
  }

  unlockBadge(badgeFirst, localStorage.getItem("playgroundProject") !== null);
  unlockBadge(badgeHTML, completed.includes("html-bab1"));
  unlockBadge(badgeCSS, completed.includes("css-bab1"));
  unlockBadge(badgeJS, localStorage.getItem("playgroundProject") !== null);

  achLevel.textContent = level;
  achXP.textContent = xp;
  achBadge.textContent = badgeCount;

  localStorage.setItem("badgeCount", badgeCount);
});
