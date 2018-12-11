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

  xhr.open("GET", "https://github.com/login/oauth/authorize");
  // xhr.setRequestHeader(
  //   "cookie",
  //   "has_recent_activity=1; ignored_unsupported_browser_notice=false; _gh_sess=b0JBTEF1RXcyaGhPVGp5dzJCYkMvbXlqREx6QnFQbjBkRDU3UTNHNjZ3ZGdBd01xVFYySm5IOHZ4SWxMU2QzcFFHUEhqVmFlVXJpKzJ5MDZkMU45cUIyRDhLUW9JT2ZFeExQcnljcDdieE95V3FsdmlqbEd5TXpMb25uQVlJc1lGSTJMMkpvYWhuWE5XNk1oc3VhUmFtcUlvaDRqd1RlTlJCY002ZWwxbGRBTkNLeXRmQ2tSZjN4RWtnaWpsdHFQVUZibGp5T0ZOTlFJUkVwTVRDdmsvZXRKTmVBc1dUUWpkK1pTdVhUWjNWWGpKWHJWQXdaR0NTZGppMFhwWUN2SXMzNit2V2Jta3ZUZ1M2UExJR3FiWndoTU1uUnZvUXJ2Q0x2eW0yNlFKc0dhaHFMS1VCN3NIZjRRN2lVZ1MvajNRV1YyK0ViMGlvZ0ptYVF2TVdNTzRZNWtseVo1T3NFYS90R1FlTlQ0bVhnPS0tb1lpQXBBZDU5SmNzcnVnWThBVEEvZz09--d4257ab65d6a7b85a1f0df104c087335c56ad885; logged_in=no"
  // );

  xhr.send(data);
});
