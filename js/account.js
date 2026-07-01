document.addEventListener("DOMContentLoaded", () => {
  const profilePhoto = document.getElementById("profilePhoto");
  const profileName = document.getElementById("profileName");
  const profileTitle = document.getElementById("profileTitle");
  const profileLevel = document.getElementById("profileLevel");
  const profileXP = document.getElementById("profileXP");
  const profileBadge = document.getElementById("profileBadge");

  const username = document.getElementById("username");
  const bio = document.getElementById("bio");
  const uploadPhoto = document.getElementById("uploadPhoto");
  const saveProfile = document.getElementById("saveProfile");

  const xpBar = document.getElementById("xpBar");
  const xpText = document.getElementById("xpText");

  const name = localStorage.getItem("username") || "Kenn";
  const savedBio = localStorage.getItem("bio") || "";
  const photo = localStorage.getItem("profilePhoto");

  const xp = parseInt(localStorage.getItem("xp") || "0");
  const level = parseInt(localStorage.getItem("level") || "1");

  let title = "Beginner Coder";
  if (level >= 5) title = "Code Master";
  else if (level >= 3) title = "Junior Programmer";
  else if (level >= 2) title = "Web Learner";

  let badge = "Pemula";
  if (level >= 5) badge = "Master";
  else if (level >= 3) badge = "Junior";
  else if (level >= 2) badge = "Learner";

  profileName.textContent = name;
  profileTitle.textContent = title;
  profileLevel.textContent = level;
  profileXP.textContent = xp;
  profileBadge.textContent = badge;

  username.value = name;
  bio.value = savedBio;

  xpBar.value = xp % 100;
  xpText.textContent = (xp % 100) + " / 100 XP";

  if (photo) {
    profilePhoto.innerHTML = `<img src="${photo}" alt="Profile Photo">`;
  }

  uploadPhoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      localStorage.setItem("profilePhoto", event.target.result);
      profilePhoto.innerHTML = `<img src="${event.target.result}" alt="Profile Photo">`;
    };

    reader.readAsDataURL(file);
  });

  saveProfile.addEventListener("click", () => {
    const newName = username.value.trim();
    const newBio = bio.value.trim();

    if (newName === "") {
      alert("Username tidak boleh kosong.");
      return;
    }

    localStorage.setItem("username", newName);
    localStorage.setItem("bio", newBio);

    profileName.textContent = newName;

    alert("✅ Profil berhasil disimpan!");
  });
});
