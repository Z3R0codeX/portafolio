const stackData = [
    // Frameworks & Mobile
    { name: "React Native", cat: "framework", icon: "fab fa-react" },
    { name: "Flutter", cat: "framework", icon: "fas fa-mobile-alt" },
    { name: "Bootstrap", cat: "framework", icon: "fab fa-bootstrap" },
    
    // APIs & Backend
    { name: "Laravel", cat: "api", icon: "fab fa-laravel" },
    { name: "PHP", cat: "api", icon: "fab fa-php" },
    { name: "REST APIs", cat: "api", icon: "fas fa-network-wired" },
    { name: "MySQL / SQL Server", cat: "api", icon: "fas fa-database" },
    
    // Hardware & Systems
    { name: "ESP32 / C++", cat: "lowlevel", icon: "fas fa-microchip" },
    { name: "Linux Admin", cat: "lowlevel", icon: "fab fa-linux" },
    { name: "Ciberseguridad", cat: "lowlevel", icon: "fas fa-user-shield" },
    { name: "Sistemas de Archivos", cat: "lowlevel", icon: "fas fa-hdd" },
    { name: "Ciberseguridad", cat: "lowlevel", icon: "fas fa-user-shield" },
    
    // Core Web
    { name: "HTML5", cat: "web-core", icon: "fab fa-html5" },
    { name: "CSS3", cat: "web-core", icon: "fab fa-css3-alt" },
    { name: "JavaScript", cat: "web-core", icon: "fab fa-js" }
];

const projectsData = [
    {
        title: "Ecosistema PetPedia",
        desc: "Plataforma integral para la gestión de servicios veterinarios y adopciones. Implementada con una interfaz responsiva en Bootstrap y una arquitectura de datos robusta en SQL para garantizar la integridad y escalabilidad de la información.",
        img: "assets/proyectos/app1.png",
        tags: ["Bootstrap", "MySQL / SQL Server", "PHP"],
        demo: "https://z3r0codex.github.io/"
    },
   {
        title: "Control Humanoide InnoBotica",
        desc: "Ingeniería de control y programación de bajo nivel para actuadores en tiempo real. Incluye el diseño y desarrollo de una interfaz de control mediante una aplicación móvil personalizada, permitiendo la gestión inalámbrica de movimientos cinemáticos del hardware basado en ESP32.",
        img: "assets/proyectos/robot1.jpg",
        tags: ["C++", "ESP32", "App Móvil", "Embedded Systems"],
        demo: null
    },
    {
        title: "Micropack Mobile App",
        desc: "Ecosistema móvil para el comercio de servicios, basado en una arquitectura desacoplada. Utiliza una API REST potente desarrollada en Laravel y una interfaz nativa en React Native, priorizando la seguridad en las transacciones y la eficiencia del servidor.",
        img: "assets/proyectos/app2.png", // Sugerencia: añadir una imagen representativa
        tags: ["Laravel", "APIs REST", "React Native"],
        demo: null
    },

];

// Dark Mode Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Render Skills Dinámico
function renderSkills(filter = 'all') {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // LÓGICA CORREGIDA: 
    // Si es 'all', muestra todo. 
    // Si no, filtra SOLO por la categoría exacta del botón.
    const filtered = filter === 'all' 
        ? stackData 
        : stackData.filter(s => s.cat === filter);

    filtered.forEach((s, index) => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.style.transitionDelay = `${index * 50}ms`;
        item.innerHTML = `
            <i class="${s.icon}"></i>
            <span>${s.name}</span>
        `;
        grid.appendChild(item);
        
        setTimeout(() => item.classList.add('active'), 10);
    });
}

// Configuración de los botones de filtro
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remover clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Añadir a este botón
        this.classList.add('active');
        
        // Ejecutar el filtrado usando el atributo data-cat
        renderSkills(this.getAttribute('data-cat'));
    });
});

// Render Proyectos
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    projectsData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card reveal';

        if (p.demo) {
            card.style.cursor = 'pointer';
            card.onclick = () => window.open(p.demo, '_blank');
        }

        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${p.img}" alt="${p.title}">
            </div>
            <div style="padding:1.5rem">
                <h3 style="margin-bottom:0.5rem">${p.title}</h3>
                <p style="color:var(--secondary); font-size:0.9rem; margin-bottom:1rem">${p.desc}</p>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                    ${p.tags.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtros click
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderSkills(btn.dataset.cat);
    });
});

// Inicialización
function init() {
    renderSkills();
    renderProjects();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

init();