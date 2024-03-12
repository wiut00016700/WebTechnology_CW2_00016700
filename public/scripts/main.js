document.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.querySelector(".profile-link");
  const baseURL = "http://localhost:4000/";
  const navigationLinks = document.querySelectorAll(".nav-link");
  navigationLinks.forEach((link) => {
    const user = JSON.parse(localStorage.getItem("user"));
    profileLink.addEventListener("click", () => {
      profileLink.setAttribute("href", `${baseURL}personal/${user.id}`);
    });
    if (link.getAttribute("href") === window.location.pathname) {
      link.classList.add("text-dark");
    }
  });
});
