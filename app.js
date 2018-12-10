document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  authButton.onclick = () => {
    // Authenticate GitHub users using OAuth
    console.log("Authenticating user...");
    window.location = "display.html";
  };
});
