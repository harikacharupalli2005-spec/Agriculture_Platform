const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("welcomeText").innerText =
    `Welcome, ${user.name || "Farmer"} 👋`;
}