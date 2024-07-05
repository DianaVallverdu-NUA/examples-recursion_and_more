const navbarContainer = document.getElementById("nav-container");
const navbar = document.getElementById("nav-bar");

navbarContainer.onmouseenter = () => {
  navbar.classList.remove("disappear-from-top");
  navbar.classList.add("appear-from-top");
};

navbarContainer.onmouseleave = () => {
  navbar.classList.remove("appear-from-top");
  navbar.classList.add("disappear-from-top");
};