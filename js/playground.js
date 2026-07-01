document.addEventListener("DOMContentLoaded", () => {
  const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
    mode: "htmlmixed",
    theme: "dracula",
    lineNumbers: true
  });

  const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
    mode: "css",
    theme: "dracula",
    lineNumbers: true
  });

  const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true
  });

  const runButton = document.getElementById("runCode");
  const saveButton = document.getElementById("saveProject");
  const loadButton = document.getElementById("loadProject");
  const menuToggle = document.getElementById("menuToggle");
  const playgroundMenu = document.getElementById("playgroundMenu");
  const resetButton = document.getElementById("resetCode");
  const downloadButton = document.getElementById("downloadHTML");
  const deleteButton = document.getElementById("deleteProject");
  const fullscreenButton = document.getElementById("fullscreenPreview");
  const preview = document.getElementById("preview");
  const consoleOutput = document.getElementById("consoleOutput");

  const defaultHTML = `<h1>Hello CodeBelajar</h1>
<p>Playground Pro 🚀</p>`;

  const defaultCSS = `h1 {
  color: blue;
}`;

  const defaultJS = `console.log("Halo CodeBelajar");`;

  function getFullHTML() {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${cssEditor.getValue()}</style>
</head>
<body>
${htmlEditor.getValue()}

<script>
const oldLog = console.log;
console.log = function(...args){
  parent.postMessage({type:"log", message:args.join(" ")}, "*");
  oldLog.apply(console, args);
};

window.onerror = function(message, source, lineno){
  parent.postMessage({type:"error", message:message + " di baris " + lineno}, "*");
};

${jsEditor.getValue()}
<\/script>
</body>
</html>`;
  }

  function runPreview() {
    consoleOutput.innerHTML = "<p>Menjalankan kode...</p>";
    const frame = preview.contentWindow.document;
    frame.open();
    frame.write(getFullHTML());
    frame.close();
  }

  window.addEventListener("message", (event) => {
    if (!event.data || !event.data.type) return;

    if (event.data.type === "log") {
      consoleOutput.innerHTML += `<p>✅ ${event.data.message}</p>`;
    }

    if (event.data.type === "error") {
      consoleOutput.innerHTML += `<p style="color:#ef4444;">❌ ${event.data.message}</p>`;
    }
  });

  runButton.addEventListener("click", runPreview);

  menuToggle.addEventListener("click", () => {
    playgroundMenu.classList.toggle("show");
  });

  resetButton.addEventListener("click", () => {
    htmlEditor.setValue(defaultHTML);
    cssEditor.setValue(defaultCSS);
    jsEditor.setValue(defaultJS);
    runPreview();
    alert("✅ Editor berhasil direset!");
  });

  saveButton.addEventListener("click", () => {
    const project = {
      html: htmlEditor.getValue(),
      css: cssEditor.getValue(),
      js: jsEditor.getValue()
    };

    localStorage.setItem("playgroundProject", JSON.stringify(project));
    alert("✅ Project berhasil disimpan!");
  });

  loadButton.addEventListener("click", () => {
    const project = JSON.parse(localStorage.getItem("playgroundProject"));

    if (!project) {
      alert("❌ Belum ada project yang disimpan.");
      return;
    }

    htmlEditor.setValue(project.html);
    cssEditor.setValue(project.css);
    jsEditor.setValue(project.js);
    runPreview();
    alert("✅ Project berhasil dimuat!");
  });

  downloadButton.addEventListener("click", () => {
    const blob = new Blob([getFullHTML()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "CodeBelajar_Project.html";
    a.click();

    URL.revokeObjectURL(url);
  });

  deleteButton.addEventListener("click", () => {
    if (!confirm("Yakin ingin menghapus project yang tersimpan?")) return;

    localStorage.removeItem("playgroundProject");

    htmlEditor.setValue(defaultHTML);
    cssEditor.setValue(defaultCSS);
    jsEditor.setValue(defaultJS);

    runPreview();
    alert("🗑️ Project berhasil dihapus.");
  });

  fullscreenButton.addEventListener("click", () => {
    if (preview.requestFullscreen) {
      preview.requestFullscreen();
    }
  });

  const autoProject = JSON.parse(localStorage.getItem("playgroundProject"));

  if (autoProject) {
    htmlEditor.setValue(autoProject.html);
    cssEditor.setValue(autoProject.css);
    jsEditor.setValue(autoProject.js);
  } else {
    htmlEditor.setValue(defaultHTML);
    cssEditor.setValue(defaultCSS);
    jsEditor.setValue(defaultJS);
  }

  runPreview();
});
