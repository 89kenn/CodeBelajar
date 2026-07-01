document.addEventListener("DOMContentLoaded", () => {
  const profilePhoto = document.getElementById("profilePhoto");
  const profileName = document.getElementById("profileName");
  const profileTitle = document.getElementById("profileTitle");
  const profileBio = document.getElementById("profileBio");
  const logoutBtn = document.getElementById("logoutBtn");

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

  profileName.textContent = username;
  profileTitle.textContent = title;
  profileBio.textContent = localStorage.getItem("bio") || "Belum ada bio.";
  if (photo) {
    profilePhoto.innerHTML = `<img src="${photo}" alt="Profile Photo">`;
  }

  logoutBtn.addEventListener("click", () => {
    const yakin = confirm("Yakin ingin logout?");

    if (!yakin) return;

    localStorage.removeItem("username");
    localStorage.removeItem("bio");
    localStorage.removeItem("profilePhoto");

    alert("✅ Berhasil logout.");
    window.location.href = "../index.html";
  });
});
