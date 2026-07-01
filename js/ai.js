document.addEventListener("DOMContentLoaded", () => {

  const chatBox = document.getElementById("chatBox");
  const userPrompt = document.getElementById("userPrompt");
  const sendPrompt = document.getElementById("sendPrompt");
  const promptButtons = document.querySelectorAll(".prompt-btn");

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type === "user" ? "user-message" : "ai-message";
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function askGemini(prompt) {

    addMessage(prompt, "user");
    userPrompt.value = "";

    addMessage("⏳ CodeAI sedang berpikir...", "ai");

    try {

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      const data = await response.json();

      chatBox.lastElementChild.remove();

      addMessage(data.answer || data.error, "ai");

    } catch (err) {

      chatBox.lastElementChild.remove();

      addMessage("❌ Gagal menghubungi CodeAI.", "ai");

    }

  }

  sendPrompt.addEventListener("click", () => {

    const prompt = userPrompt.value.trim();

    if (!prompt) return;

    askGemini(prompt);

  });

  promptButtons.forEach(button => {

    button.addEventListener("click", () => {

      userPrompt.value = button.textContent;

      sendPrompt.click();

    });

  });

});
