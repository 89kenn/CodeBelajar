document.addEventListener("DOMContentLoaded", () => {

  const username = document.getElementById("username");
  const loginBtn = document.getElementById("loginBtn");

  // Jika sudah login, tampilkan nama sebelumnya
  if (username) {
    username.value = localStorage.getItem("username") || "";
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {

      const name = username.value.trim();

      if (name === "") {
        alert("Masukkan nama terlebih dahulu.");
        return;
      }

      localStorage.setItem("username", name);

      alert("🎉 Selamat datang, " + name + "!");

      window.location.href = "../index.html";

    });
  }

});
