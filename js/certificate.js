document.addEventListener("DOMContentLoaded", () => {
  const certName = document.getElementById("certName");
  const certCourse = document.getElementById("certCourse");
  const certId = document.getElementById("certId");
  const certDate = document.getElementById("certDate");
  const certQR = document.getElementById("certQR");
  const downloadButton = document.getElementById("downloadCertificate");

  const username = localStorage.getItem("username") || "Kenn";
  const level = parseInt(localStorage.getItem("level") || "1");

  let title = "Beginner Coder";

  if (level >= 10) title = "CodeBelajar Legend";
  else if (level >= 8) title = "Software Engineer";
  else if (level >= 5) title = "Code Master";
  else if (level >= 4) title = "Front-End Developer";
  else if (level >= 3) title = "Junior Programmer";
  else if (level >= 2) title = "Web Learner";

  let savedCertId = localStorage.getItem("certificateId");

  if (!savedCertId) {
    savedCertId = "CB-CERT-" + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("certificateId", savedCertId);
  }

  let savedDate = localStorage.getItem("certificateDate");

  if (!savedDate) {
    savedDate = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    localStorage.setItem("certificateDate", savedDate);
  }

  certName.textContent = username;
  certCourse.textContent = title + " Path";
  certId.textContent = savedCertId;
  certDate.textContent = savedDate;

  certQR.innerHTML = "";

  new QRCode(certQR, {
    text: "../verify/index.html",
    width: 80,
    height: 80
  });

  downloadButton.addEventListener("click", () => {
    window.print();
  });
});
