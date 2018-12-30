var configFinal = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: "",
  messagingSenderId: config.messagingSenderId
};
firebase.initializeApp(configFinal);

const serverURL = "https://yearincode.herokuapp.com";

var highestStars, highestStarredRepo, numRepos, recommendedRepos, recommendedContribRepos, tastebreakerRepos, favLanguages, bestStarred;

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded!");

  var authButton = document.getElementById("auth-button");

  const clientID = clientIDConfig;
  const clientSecret = clientSecretConfig;

  const firstRepo = document.getElementById("first-repo-title");

  var token = "";

  const hero = document.getElementById("hero");
  const prepare = document.getElementById("prepare");
  const screen2 = document.getElementById("screen2");
  const screen3 = document.getElementById("screen3");
  const screen4 = document.getElementById("screen4");
  const screen5 = document.getElementById("screen5");
  const screen6 = document.getElementById("screen6");
  const screen7 = document.getElementById("screen7");
  const wrapScreen = document.getElementById("wrap-screen");

  var provider = new firebase.auth.GithubAuthProvider();
  // provider.addScope("repo");
  // provider.addScope("user");
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
    document.getElementById("spinner").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var username = user.displayName;
        console.log(token);
        // $.ajax({
        //   async: false,
        //   url: serverURL+"/authenticate",
        //   type: "POST",
        //   data: {"token": token},
        //   success: function(result){
        //     console.log("done");
        //   }
        // });
        // ...
        var promise = $.getJSON(
          `https://api.github.com/user?access_token=${token}`
        );
        promise.done(data => {
          console.log(data.name);


          // getting the individual data from the server
          $.ajax({
            async: false,
            url: serverURL+"/get_highest_starred_repo_created/"+token,
            type: "GET",
            success: function(result){
              result = result.slice(1, -1).split(",");
              console.log("Most stars: " + result[0]);
              document.getElementById("num-stars3").innerHTML = result[0];
              console.log("Highest starred repo: " + result[1].slice(3, -1));
              document.getElementById("most-starred-span3").innerHTML = result[1].slice(2, -1);
              highestStars = result[0];
              highestStarredRepo = result[1].slice(2, -1);
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_first_repo_created/"+token,
            type: "GET",
            success: function(result){
              firstRepo.innerHTML = "<q>"+result+"</q>";
              console.log("First Repo: " + result);
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_num_repos_created/"+token,
            type: "GET",
            success: function(result){
              console.log("Num repos: " + result);
              numRepos = parseInt(result);
              document.getElementById("num-repos-main").innerHTML = numRepos;
              updateButtons();
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_favorite_languages/"+token,
            type: "GET",
            success: function(result){
              console.log("Fav langs: " + result);
              favLanguages = result.slice(0, -1).split(",");
              for(var i in favLanguages){
                favLanguages[i] = favLanguages[i].slice(2, -1);
              }
              updateLanguages();
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_recommended_repos/"+token,
            type: "GET",
            success: function(result){
              console.log("Recommended Repos: " + result);
              recommendedRepos = JSON.parse(result);
              // for(var i in recommendedRepos){
              //   recommendedRepos[i] = recommendedRepos[i].slice(3, -1);
              // }
              console.log(recommendedRepos);
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_tastebreaker_repos/"+token,
            type: "GET",
            success: function(result){
              console.log("Tastebreaker Repos: " + result);
              tastebreakerRepos = JSON.parse(result);
              // for(var i in tastebreakerRepos){
              //   tastebreakerRepos[i] = tastebreakerRepos[i].slice(3, -1)
              // }
              console.log(tastebreakerRepos);
              updateTastebreakers();
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_recommended_contribution_repos/"+token,
            type: "GET",
            success: function(result){
              console.log("Recommended Contrib Repos: " + result);
              recommendedContribRepos = JSON.parse(result);
              // for (var i in recommendedContribRepos){
              //   recommendedContribRepos[i] = recommendedContribRepos[i].slice(3, -1);
              // }
              updateRecommendedRepos();
            }
          });
          $.ajax({
            async: false,
            url: serverURL+"/get_best_starred_repos/"+token,
            type: "GET",
            success: function(result){
              console.log("Best Starred Repos: " + result);
              bestStarred = {};
              bestStarred = JSON.parse(result);
              // for (var i in bestStarred){
              //   bestStarred[i] = bestStarred[i].slice(3, -1);
              // }
              updateBestStarred();
            }
          });

          updateTwitterShare();

          document.getElementById("spinner").style.display = "none";
          document.getElementById("overlay").style.display = "none";
          document.getElementById("auth-button").style.display = "none";

          // Animation begins
          hero.style.height = "100%";
          prepare.style.display = "flex";
          screen2.style.display = "flex";
          screen3.style.display = "flex";
          screen4.style.display = "flex";
          screen5.style.display = "flex";
          screen6.style.display = "flex";
          screen7.style.display = "flex";
          wrapScreen.style.display = "flex";

          new fullpage("#fullpage", {
            licenseKey: "LICENSE",
            navigation: true,
            // anchors: ["heroScreen", "prepareScreen", "screen2"],
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


function updateButtons(){
  // Logic to display the randomised numbers in each button choice
  var buttonsDiv = document.getElementById("question-buttons3");
  var correctButtonPos = Math.floor(Math.random() * 3) + 1;
  for (var i=1; i<=3; i++){
    var btn = document.createElement("button");
    btn.setAttribute("class", "selection-btn3 btn3");
    btn.setAttribute("onclick", "verifyNumRepos(event)");
    btn.setAttribute("id", i+"-element3");
    if (i == correctButtonPos){
      btn.innerHTML = numRepos;
    } else{
      var min = numRepos - (Math.floor(numRepos/2));
      var max = numRepos + (Math.floor(numRepos/2));
      while (true){
        var value = Math.floor(Math.random() * (max - min + 1)) + min;
        if (value != numRepos){
          btn.innerHTML = value;
          break;
        }
      }
    }
    buttonsDiv.appendChild(btn);
  }
}

function verifyNumRepos(event){
  var btnId = event.target.id;
  var btn = document.getElementById(btnId);
  if (parseInt(btn.innerHTML) == numRepos) {
    // proceed with next slide
    // ...
    $("#question-content3").animate({ height: "90%", opacity: 0},"5000", function(){
      $("#question-content3").remove();
      displayMainContent();
    });
  } else {
    btn.style.backgroundColor = "#D3F9B5";
    btn.style.cursor = "default";
    btn.style.boxShadow = "none";
  }
}

function displayMainContent(){
  $("#main-content3").fadeIn(1000, function(){
    // $("#num-repos").delay("500").animate({fontSize: "10vw"}, function(){
    //   $("#first-line").delay("100").fadeIn("slow", function(){
    //     $("#main-data").delay("500").fadeIn();
    //   });
    // });
    console.log("lit")
  });
}


function updateLanguages(){
  var favouriteLang = favLanguages[0];
  var restLangs = favLanguages.slice(1);
  var img = document.getElementById("language-img4");
  img.setAttribute("src", "images/languages/"+favouriteLang.toLowerCase()+".png");
  document.getElementById("fav-lang4").innerHTML = favouriteLang;
  document.getElementById("language-span4").innerHTML = favouriteLang;
  var langsOl = document.getElementById("list-languages4");
  for (var i in restLangs){
    console.log(i);
    if (i >= 3){
      break;
    }
    var li = document.createElement("li");
    li.innerHTML = restLangs[i];
    langsOl.appendChild(li);
  }
}


function updateRecommendedRepos(){
  var recommendedReposList = document.getElementById("recommended-repo5");
  var recommendedContribReposList = document.getElementById("recommended-contrib-repo5");
  var idx = 0;

  for (var i in recommendedRepos){
    if(idx>=6){
      break;
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", recommendedRepos[i]);
    a.setAttribute("target", "_blank");
    a.innerHTML = i;
    li.appendChild(a);
    recommendedReposList.appendChild(li);
    idx++;
  }

  var idx = 0;
  for (var i in recommendedContribRepos){
    if(idx>=6){
      break;
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", recommendedContribRepos[i]);
    a.setAttribute("target", "_blank");
    a.innerHTML = i;
    li.appendChild(a);
    recommendedContribReposList.appendChild(li);
    idx++;
  }
}


function updateTastebreakers(){
  var tastebreakersList = document.getElementById("tastebreakers-list6");
  var idx = 0;
  for (var i in tastebreakerRepos){
    if(idx>=6){
      break;
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", tastebreakerRepos[i]);
    a.setAttribute("target", "_blank");
    a.innerHTML = i;
    li.appendChild(a);
    tastebreakersList.appendChild(li);
    idx++
  }
}

function updateBestStarred(){
  if (!isEmpty(bestStarred)){
    var bestStarredList = document.getElementById("best-starred-list7");
    var idx = 0
    for (var i in bestStarred){
      if(idx>=6){
        break;
      }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.setAttribute("href", bestStarred[i]);
      a.setAttribute("target", "_blank");
      a.innerHTML = i;
      li.appendChild(a);
      bestStarredList.appendChild(li);
      idx++
    }
  } else{
    document.getElementById("subtitle7").innerHTML = "Looks like you haven't starred any repositories this year. Why not explore a few more for 2019?"
  }
}



function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function updateTwitterShare(){
  var message = "My favourite programming language this year was '"+favLanguages[0]+"', and I made "+numRepos+" repositories, my most starred being '"+highestStarredRepo+"! Find out your year in code too!";
  var url = "https://twitter.com/share?url=https://yearincode.github.io/&amp;text="+message+"&amp;hashtags=yearincode2018"
  document.getElementById("twitter-share-link").setAttribute("href", url);
}
