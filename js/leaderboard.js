document.addEventListener("DOMContentLoaded", () => {

  const topName = document.getElementById("topName");
  const topInfo = document.getElementById("topInfo");
  const rankList = document.getElementById("rankList");

  const username = localStorage.getItem("username") || "Kenn";
  const xp = parseInt(localStorage.getItem("xp") || "0");
  const level = parseInt(localStorage.getItem("level") || "1");

  topName.textContent = username;
  topInfo.textContent = `Level ${level} • ${xp} XP`;

  const players = [
    {
      name: username,
      level: level,
      xp: xp
    },
    {
      name: "Fakhri",
      level: 3,
      xp: 1200
    },
    {
      name: "Rizal",
      level: 2,
      xp: 800
    },
    {
      name: "Andi",
      level: 1,
      xp: 450
    },
    {
      name: "Budi",
      level: 1,
      xp: 300
    }
  ];

  players.sort((a, b) => b.xp - a.xp);

  rankList.innerHTML = "";

  players.forEach((player, index) => {

    const item = document.createElement("div");
    item.className = "rank-item";

    item.innerHTML = `
      <strong>#${index + 1} ${player.name}</strong>
      <span>Level ${player.level} • ${player.xp} XP</span>
    `;

    rankList.appendChild(item);

  });

});
