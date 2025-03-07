document.addEventListener("DOMContentLoaded", () => {
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

    const planets = [
        {
            name: "Zyphar-7",
            description: "A neon-lit cyberpunk metropolis floating above a gas giant.",
            image: "Zyphar-7.webp",
            climate: "Artificially regulated",
            terrain: "Floating cityscapes",
            attractions: ["AI-powered nightlife", "Zero-G racing", "Sky bazaars"]
        },
        {
            name: "Vorrak Prime",
            description: "A volcanic planet teeming with powerful energy crystals.",
            image: "Vorrak Prime.webp",
            climate: "Extreme heat",
            terrain: "Lava fields, obsidian cliffs",
            attractions: ["Crystal caverns", "Magma surfing", "Energy mining tours"]
        },
        {
            name: "Aquaria-9",
            description: "An oceanic world covered in massive coral megacities.",
            image: "Aquaria-9.webp",
            climate: "Tropical and humid",
            terrain: "Deep oceans, floating islands",
            attractions: ["Underwater expeditions", "Bioluminescent nightlife", "Giant manta rides"]
        }
    ];

    const planetList = document.getElementById("planet-list");
    planetList.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-3");

    planets.forEach(planet => {
        const planetCard = document.createElement("div");
        planetCard.classList.add("col-md-3");

        planetCard.innerHTML = `
            <div class="card">
                <img src="images/${planet.image}" alt="${planet.name}">
                <div class="card-body">
                    <h5 class="card-title">${planet.name}</h5>
                    <p>${planet.description}</p>
                    <ul>
                        <li><strong>Climate:</strong> ${planet.climate}</li>
                        <li><strong>Terrain:</strong> ${planet.terrain}</li>
                        <li><strong>Attractions:</strong> ${planet.attractions.join(", ")}</li>
                    </ul>
                </div>
            </div>
        `;

        planetList.appendChild(planetCard);
    });
});
