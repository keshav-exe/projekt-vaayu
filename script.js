//Password Prompt
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    // Get the password input value
    var passwordInput = document.querySelector('input[name="password"]');
    var password = passwordInput.value;

    // Implementing Password Policy (Example: At least 8 characters)
    if (password.length < 8) {
      // Display an error message
      alert("Password must contain at least 8 characters.");
      // Prevent the form submission
      event.preventDefault();
    }
  });
});

//loading screen
window.addEventListener("load", function () {
  document.getElementById("loading-screen").style.display = "none";
});
