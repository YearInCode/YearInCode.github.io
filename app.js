document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  const clientID = "05d4f56f89ba1a91c3bd";
  const clientSecret = "a9e53f438683513f1fd92d561cce3252af0504e9";

  authButton.onclick = () => {
    // Authenticate GitHub users using OAuth
    console.log("Authenticating user...");
    window.location = "display.html";
  };

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    "GET",
    `https://github.com/login/oauth/authorize?client_id=${clientID}&client_secret=${clientSecret}`
  );

  xhr.send(data);
});
