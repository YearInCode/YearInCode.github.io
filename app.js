document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  const clientID = "05d4f56f89ba1a91c3bd";
  const clientSecret = "a9e53f438683513f1fd92d561cce3252af0504e9";
  const authorizationBaseUrl = "https://github.com/login/oauth/authorize";
  const tokenUrl = "https://github.com/login/oauth/access_token";

  $("#auth-button").on("click", function() {
    // Initialize with your OAuth.io app public key
    OAuth.initialize("h1d3NDcSh7Eflhg7EOnyKHm2eXU");
    // Use popup for oauth
    // Alternative is redirect
    OAuth.popup("github").then(github => {
      console.log("github:", github);
      // Retrieves user data from oauth provider
      // Prompts 'welcome' message with User's email on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      github.me().then(data => {
        console.log("me data:", data);
        var w = window.open("./display.html");
        w.accessToken = data;
        window.location("./display.html");
      });
      // Retrieves user data from OAuth provider by using #get() and
      // OAuth provider url
      github.get("/user").then(data => {
        console.log("self data:", data);
      });
    });
  });
});
