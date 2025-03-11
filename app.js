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

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        document.getElementById('name-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('message-error').textContent = '';
        name.classList.remove('is-invalid');
        email.classList.remove('is-invalid');
        message.classList.remove('is-invalid');

        const nameAsterisk = document.querySelector('label[for="name"] .text-danger');
        const emailAsterisk = document.querySelector('label[for="email"] .text-danger');
        const messageAsterisk = document.querySelector('label[for="message"] .text-danger');
        nameAsterisk.style.color = '';
        emailAsterisk.style.color = '';
        messageAsterisk.style.color = '';

        let valid = true;

        if (name.value.length < 3) {
            document.getElementById('name-error').textContent = 'Name must be at least 3 characters long.';
            name.classList.add('is-invalid');
            nameAsterisk.style.color = '#ff1645';
            valid = false;
        }

        if (!validateEmail(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            email.classList.add('is-invalid');
            emailAsterisk.style.color = '#ff1645';
            valid = false;
        }

        if (message.value.length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters long.';
            message.classList.add('is-invalid');
            messageAsterisk.style.color = '#ff1645';
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

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
