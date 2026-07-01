document.addEventListener("DOMContentLoaded", () => {

  const toggleTheme = document.getElementById("toggleTheme");
  const backupData = document.getElementById("backupData");
  const restoreData = document.getElementById("restoreData");
  const restoreFile = document.getElementById("restoreFile");
  const resetAll = document.getElementById("resetAll");

  // ===== Dark / Light Mode =====
  const theme = localStorage.getItem("theme") || "dark";

  if (theme === "light") {
    document.body.classList.add("light");
  }

  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const currentTheme = document.body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem("theme", currentTheme);
  });

  // ===== Backup =====
  backupData.addEventListener("click", () => {

    const data = {};

    for (let i = 0; i < localStorage.length; i++) {

      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);

    }

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "CodeBelajar_Backup.json";
    a.click();

    URL.revokeObjectURL(url);

  });

  // ===== Restore =====
  restoreData.addEventListener("click", () => {

    const file = restoreFile.files[0];

    if (!file) {
      alert("Pilih file backup terlebih dahulu.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {

      const data = JSON.parse(e.target.result);

      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
      });

      alert("✅ Backup berhasil dipulihkan.");
      location.reload();

    };

    reader.readAsText(file);

  });

  // ===== Reset =====
  resetAll.addEventListener("click", () => {

    const yakin = confirm(
      "Semua data CodeBelajar akan dihapus. Lanjutkan?"
    );

    if (!yakin) return;

    localStorage.clear();

    alert("🗑️ Semua data berhasil dihapus.");

    location.reload();

  });

});
