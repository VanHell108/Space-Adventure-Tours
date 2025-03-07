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

   fetch('crew.json')
   .then(response => response.json())
   .then(data => {
       const crewAccordion = document.getElementById('crewAccordion');
       crewAccordion.innerHTML = '';

       data.forEach((crewMember, index) => {
           const item = document.createElement('div');
           item.className = 'accordion-item';
           item.innerHTML = `
               <h2 class="accordion-header">
                   <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#crew${index + 1}">
                       <i class="bi bi-${getIcon(crewMember.role)}"> ${crewMember.name} - ${crewMember.role}</i>
                   </button>
               </h2>
               <div id="crew${index + 1}" class="accordion-collapse collapse" data-bs-parent="#crewAccordion">
                   <div class="accordion-body">
                       <p><strong>Race:</strong> ${crewMember.race}</p>
                       <p><strong>Origin:</strong> ${crewMember.origin}</p>
                       <p><strong>Height:</strong> ${crewMember.height}</p>
                       <p><strong>Build:</strong> ${crewMember.build}</p>
                       <p><strong>Gender:</strong> ${crewMember.gender}</p>
                       <p><strong>Specialties:</strong> ${crewMember.specialties}</p>
                       <p><strong>Gear:</strong> ${crewMember.gear}</p>
                       <p><strong>Personality:</strong> ${crewMember.personality}</p>
                   </div>
               </div>
           `;
           crewAccordion.appendChild(item);
       });
   });

    const getIcon = (role) => {
        switch (role) {
            case 'Navigator': return 'globe';
            case 'Engineer': return 'wrench';
            case 'Warrior': return 'shield-shaded';
            case 'Medic': return 'heart-pulse';
            case 'Pilot': return 'rocket';
            default: return 'person';
        }
    }

    fetch('planets.json')
        .then(response => response.json())
        .then(planets => {
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
        })
        .catch(error => console.error('Error loading planets:', error));
});
