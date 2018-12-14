var config = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId
};
firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  const clientID = "05d4f56f89ba1a91c3bd";
  const clientSecret = "a9e53f438683513f1fd92d561cce3252af0504e9";

  const hero = document.getElementById("hero");
  const prepare = document.getElementById("prepare");

  var provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");
  provider.addScope("user");
  provider.setCustomParameters({
    allow_signup: true
  });

  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  authButton.onclick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        var promise = $.getJSON(
          `https://api.github.com/user?access_token=${token}`
        );
        promise.done(data => {
          console.log(data.name);

          // Animation begins
          hero.style.height = "100%";
          prepare.style.display = "flex";

          new fullpage("#fullpage", {
            licenseKey: "LICENSE",
            navigation: true,
            anchors: ["heroScreen", "prepareScreen"],
            parallax: true,
            onLeave: function(origin, destination, direction) {
              console.log("Leaving section" + origin.index);
            }
          });
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(email, errorMessage);
      });
  };
});
