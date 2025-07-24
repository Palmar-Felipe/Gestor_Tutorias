//This file handles the 404 error page functionality.

export function after404() {
  const messageTitle = document.querySelector("h2");
  const referrer = document.referrer;

  if (messageTitle) {
    if (referrer && !referrer.includes("404.html")) {
      messageTitle.textContent = "Oops! It seems you've lost your way.";
    } else {
      messageTitle.textContent = "This page does not exist.";
    }
  }

  //  Optional: auto redirect after 10 seconds
  setTimeout(() => {
    window.location.href = "../../index.html"; // 👈 Adjust if needed
  }, 10000); // 10 seconds
}
