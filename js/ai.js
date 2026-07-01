document.addEventListener("DOMContentLoaded", () => {

  const chatBox = document.getElementById("chatBox");
  const userPrompt = document.getElementById("userPrompt");
  const sendPrompt = document.getElementById("sendPrompt");

  const promptButtons = document.querySelectorAll(".prompt-btn");

  function addMessage(text, type) {

    const div = document.createElement("div");
    div.className = type === "user"
      ? "user-message"
      : "ai-message";

    div.innerHTML = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

  }

  function fakeAI(prompt) {

    const text = prompt.toLowerCase();

    if (text.includes("html")) {
      return "💻 HTML adalah bahasa markup yang digunakan untuk membuat struktur sebuah website.";
    }

    if (text.includes("css")) {
      return "🎨 CSS digunakan untuk mempercantik tampilan website dengan warna, layout, animasi, dan lainnya.";
    }

    if (text.includes("javascript")) {
      return "⚡ JavaScript membuat website menjadi interaktif, misalnya tombol, form, animasi, dan game.";
    }

    if (text.includes("python")) {
      return "🐍 Python adalah bahasa pemrograman yang mudah dipelajari dan banyak digunakan untuk AI, Web, dan Automation.";
    }

    if (text.includes("error")) {
      return "🐞 Coba kirimkan pesan error atau kode yang bermasalah. Nanti Gemini AI akan membantu menganalisisnya.";
    }

    return "🤖 Fitur Gemini AI belum dihubungkan. Pada versi berikutnya, pertanyaanmu akan dijawab langsung oleh Gemini API.";
  }

  sendPrompt.addEventListener("click", () => {

    const prompt = userPrompt.value.trim();

    if (!prompt) return;

    addMessage(prompt, "user");

    userPrompt.value = "";

    setTimeout(() => {

      addMessage(fakeAI(prompt), "ai");

    }, 500);

  });

  promptButtons.forEach(button => {

    button.addEventListener("click", () => {

      userPrompt.value = button.textContent;

      sendPrompt.click();

    });

  });

});
