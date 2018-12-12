document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");
  var accessToken = window.opener.accessToken;
  console.log(accessToken);
});
