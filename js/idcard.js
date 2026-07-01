document.addEventListener("DOMContentLoaded", () => {
  const cardPhoto = document.getElementById("cardPhoto");
  const cardName = document.getElementById("cardName");
  const cardTitle = document.getElementById("cardTitle");
  const cardId = document.getElementById("cardId");
  const memberSince = document.getElementById("memberSince");
  const cardQR = document.getElementById("cardQR");

  const username = localStorage.getItem("username") || "Kenn";
  const photo = localStorage.getItem("profilePhoto");
  const level = parseInt(localStorage.getItem("level") || "1");

  let title = "Beginner Coder";

  if (level >= 10) title = "CodeBelajar Legend";
  else if (level >= 8) title = "Software Engineer";
  else if (level >= 5) title = "Code Master";
  else if (level >= 4) title = "Front-End Developer";
  else if (level >= 3) title = "Junior Programmer";
  else if (level >= 2) title = "Web Learner";

  let developerId = localStorage.getItem("developerId");

  if (!developerId) {
    developerId = "CB-" + Math.floor(10000000 + Math.random() * 90000000);
    localStorage.setItem("developerId", developerId);
  }

  let since = localStorage.getItem("memberSince");

  if (!since) {
    since = new Date().getFullYear();
    localStorage.setItem("memberSince", since);
  }

  cardName.textContent = username;
  cardTitle.textContent = title;
  cardId.textContent = developerId;
  memberSince.textContent = since;

  if (photo) {
    cardPhoto.innerHTML = `<img src="${photo}" alt="Profile Photo">`;
  }

  cardQR.innerHTML = "";

  new QRCode(cardQR, {
    text: developerId,
    width: 70,
    height: 70
  });

  const downloadCard = document.getElementById("downloadCard");

  downloadCard.addEventListener("click", () => {
    window.print();
  });
});
