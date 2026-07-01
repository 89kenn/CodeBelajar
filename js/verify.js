document.addEventListener("DOMContentLoaded", () => {

  const name = localStorage.getItem("username") || "Kenn";
  const course = localStorage.getItem("title") || "Beginner Coder";
  const certId = localStorage.getItem("certificateId") || "CB-CERT-000001";
  const certDate = localStorage.getItem("certificateDate") || "01 Juli 2026";

  document.getElementById("verifyName").textContent = name;
  document.getElementById("verifyCourse").textContent = course;
  document.getElementById("verifyId").textContent = certId;
  document.getElementById("verifyDate").textContent = certDate;

});
