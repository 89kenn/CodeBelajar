document.addEventListener("DOMContentLoaded", () => {
const homeUsername = document.getElementById("homeUsername");

if (homeUsername) {
  homeUsername.innerText = localStorage.getItem("username") || "Kenn";
}

  // ===== DARK MODE =====
  const darkBtn = document.getElementById("darkMode");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
      );
    });
  }

  // ===== PROGRESS =====
  const progress = document.querySelector("progress");
  const progressText = document.getElementById("progressText");

  let progressValue = parseInt(localStorage.getItem("progress") || "0");

  if (progress) progress.value = progressValue;
  if (progressText) progressText.innerText = progressValue + "% Selesai";

  // ===== LESSON =====
  const finishLesson = document.getElementById("finishLesson");

  if (finishLesson) {

    finishLesson.addEventListener("click", () => {

      const lessonId = finishLesson.dataset.lesson;

      if (
        lessonId === "css-bab1" &&
        localStorage.getItem("quiz-css-bab1") !== "passed"
      ) {
        alert("❌ Selesaikan kuis terlebih dahulu.");
        return;
      }

      let completed =
      JSON.parse(localStorage.getItem("completedLessons") || "[]");

      if (completed.includes(lessonId)) {
        alert("✅ Materi ini sudah pernah diselesaikan.");
        return;
      }

      completed.push(lessonId);

      localStorage.setItem(
        "completedLessons",
        JSON.stringify(completed)
      );

      progressValue += 10;

      if (progressValue > 100)
      progressValue = 100;

      localStorage.setItem(
        "progress",
        progressValue
      );

      // XP
      let xp = parseInt(localStorage.getItem("xp") || "0");
      xp += 10;
      localStorage.setItem("xp", xp);

      // Level
      let level = Math.floor(xp / 100) + 1;
      localStorage.setItem("level", level);

      alert("🎉 +10 XP\nProgress berhasil bertambah!");

      window.location.href="../../index.html";

    });

  }

  // ===== XP =====
  const xpText = document.getElementById("xp");
  const levelText = document.getElementById("level");

  if(xpText){
    xpText.innerText =
    localStorage.getItem("xp") || 0;
  }

  if(levelText){
    levelText.innerText =
    localStorage.getItem("level") || 1;
  }

});

// ===== QUIZ =====

function checkAnswer(answer){

  const result =
  document.getElementById("quizResult");

  if(!result) return;

  if(answer==="correct"){

    localStorage.setItem(
      "quiz-css-bab1",
      "passed"
    );

    result.innerHTML=
    "✅ Benar! Sekarang tekan tombol Selesaikan Materi.";

    result.style.color="#22c55e";

  }else{

    localStorage.removeItem(
      "quiz-css-bab1"
    );

    result.innerHTML=
    "❌ Salah, coba lagi.";

    result.style.color="#ef4444";

  }

}
