document.addEventListener("DOMContentLoaded", function () {
   const navbar = document.querySelector("nav");
   const header = document.querySelector("header");
   const sticky = header.offsetHeight;

   window.addEventListener("scroll", function () {
       if (window.scrollY > sticky) {
           navbar.classList.add("sticky");
       } else {
           navbar.classList.remove("sticky");
       }
   });

   const navLinks = document.querySelectorAll(".nav-link");
   const navbarCollapse = document.querySelector(".navbar-collapse");

   navLinks.forEach(link => {
       link.addEventListener("click", function (event) {
           event.preventDefault();

           const targetId = this.getAttribute("href");
           const targetSection = document.querySelector(targetId);

           if (navbarCollapse.classList.contains("show")) {
               new bootstrap.Collapse(navbarCollapse).hide();
           }

           setTimeout(() => {
               targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
           }, 300);
       });
   });
});
