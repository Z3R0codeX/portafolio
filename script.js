// --- DATOS (Habilidades y Proyectos) ---

const habilidades = [
    { nombre: "HTML5", categoria: "Web", icono: "fab fa-html5" },
    { nombre: "CSS3", categoria: "Web", icono: "fab fa-css3-alt" },
    { nombre: "JavaScript", categoria: "Web", icono: "fab fa-js" },
    { nombre: "PHP", categoria: "Web", icono: "fab fa-php" },
    { nombre: "React", categoria: "Frameworks", icono: "fab fa-react" },
    { nombre: "Laravel", categoria: "Frameworks", icono: "fab fa-laravel" },
    { nombre: "Flutter", categoria: "Frameworks", icono: "fab fa-android" },
    { nombre: "Bootstrap", categoria: "Frameworks", icono: "fab fa-bootstrap" },
    { nombre: "Ciberseguridad", categoria: "Sistemas", icono: "fas fa-shield-alt" },
    { nombre: "Linux Admin", categoria: "Sistemas", icono: "fab fa-linux" },
    { nombre: "Redes", categoria: "Sistemas", icono: "fas fa-network-wired" },
    { nombre: "Liderazgo", categoria: "Gestión", icono: "fas fa-users" },
    { nombre: "Resolución", categoria: "Gestión", icono: "fas fa-lightbulb" },
    { nombre: "Colaboración", categoria: "Gestión", icono: "fas fa-handshake" },
];

const proyectosData = [
    {
        id: 1,
        titulo: "Robótica InnovaTecNM 2025",
        subtitulo: "Robot Humanoide (InnoBotica)",
        descripcion: "Diseño de aplicacion y programación de lógica en C++.",
        tags: ['C++', 'Arduino', 'Sensores', 'Mecánica'],
        imagenes: ["assets/proyectos/robot1.jpg", "assets/proyectos/robot2.jpg", "assets/proyectos/robot3.jpg", "assets/proyectos/robot4.jpg", "assets/proyectos/robot5.jpg"],
        link: null,
        demo: null
    },
    {
        id: 2,
        titulo: "Tech Smash V1",
        subtitulo: "Organización de Eventos",
        descripcion: "Coordinación logística del Torneo de Videojuegos por el 30 Aniversario.",
        tags: ['Liderazgo', 'Logística', 'Gestión', 'Marketing'],
        imagenes: ["assets/proyectos/torneo1.jpg", "assets/proyectos/torneo2.jpg", "assets/proyectos/torneo3.jpg"],
        link: null,
        demo: null
    },
    {
        id: 3,
        titulo: "PetPedia",
        subtitulo: "Plataforma de Servicios Veterinarios",
        descripcion: "Gestión de servicios y adopciones. Plataforma Web.",
        tags: ['React', 'Laravel', 'Bootstrap', 'SQL'],
        imagenes: ["assets/proyectos/app1.png"], 
        link: "https://github.com/Z3R0codeX/Z3R0codeX.github.io",
        demo: "https://z3r0codex.github.io/"
    },
];

// Estado simulado para los carruseles (guarda el indice actual de cada proyecto)
const carouselState = {
    1: 0, 2: 0, 3: 0, 4: 0
};

// --- 1. MODO OSCURO ---
const temaBtn = document.getElementById('tema-btn');
const body = document.body;

temaBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        temaBtn.textContent = '☀️ Luz';
    } else {
        temaBtn.textContent = '🌙 Neón';
    }
});

// --- 2. RENDERIZADO DE HABILIDADES (FILTRO) ---
function renderHabilidades(filtro = 'Todos') {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = ''; // Limpiar contenido previo

    const filtradas = filtro === 'Todos' 
        ? habilidades 
        : habilidades.filter(h => h.categoria === filtro);

    filtradas.forEach(h => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="skill-icon"><i class="${h.icono}"></i></div>
            <span>${h.nombre}</span>
            <div class="skill-category-tag">${h.categoria}</div>
        `;
        grid.appendChild(card);
    });
}

function filtrarHabilidades(categoria, btn) {
    // Actualizar visualmente los botones
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Renderizar de nuevo
    renderHabilidades(categoria);
}

// Inicializar habilidades
renderHabilidades();

// --- 3. RENDERIZADO DE PROYECTOS ---
function renderProyectos() {
    const grid = document.getElementById('projects-grid');
    
    proyectosData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Generar tags HTML
        const tagsHtml = p.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        
        // Generar botones (Github / Demo)
        let botonesHtml = '';
        if (p.demo) {
            botonesHtml += `<a href="${p.demo}" target="_blank" class="btn" style="padding: 6px 15px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px; text-decoration: none; margin-right: 10px;"><i class="fas fa-external-link-alt"></i> Visitar</a>`;
        }
        if (p.link) {
            botonesHtml += `<a href="${p.link}" target="_blank" class="btn-outline" style="padding: 6px 15px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 5px; text-decoration: none;"><i class="fab fa-github"></i> Código</a>`;
        }

        // Generar controles de carrusel solo si hay mas de 1 imagen
        let carruselControles = '';
        if (p.imagenes.length > 1) {
            carruselControles = `
                <button class="carousel-btn prev" onclick="cambiarImagen(${p.id}, -1)">❮</button>
                <button class="carousel-btn next" onclick="cambiarImagen(${p.id}, 1)">❯</button>
            `;
        }

        card.innerHTML = `
            <div class="carousel-container">
                <img src="${p.imagenes[0]}" alt="${p.titulo}" class="carousel-img" id="img-proy-${p.id}">
                ${carruselControles}
            </div>
            <div class="card-content">
                <h3>${p.titulo}</h3>
                <h4 class="card-subtitle">${p.subtitulo}</h4>
                <p>${p.descripcion}</p>
                <div class="tags-container">${tagsHtml}</div>
                <div style="margin-top: auto; padding-top: 20px;">
                    ${botonesHtml}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Inicializar proyectos
renderProyectos();

// --- 4. LÓGICA DEL CARRUSEL ---
// Esta función se llama desde el HTML generado (onclick)
window.cambiarImagen = function(idProyecto, direccion) {
    const proyecto = proyectosData.find(p => p.id === idProyecto);
    let indiceActual = carouselState[idProyecto];
    
    // Calcular nuevo índice
    let nuevoIndice = indiceActual + direccion;
    if (nuevoIndice < 0) nuevoIndice = proyecto.imagenes.length - 1;
    if (nuevoIndice >= proyecto.imagenes.length) nuevoIndice = 0;
    
    // Actualizar estado
    carouselState[idProyecto] = nuevoIndice;
    
    // Actualizar imagen en el DOM
    const imgElement = document.getElementById(`img-proy-${idProyecto}`);
    imgElement.src = proyecto.imagenes[nuevoIndice];
};

// --- 5. SCROLL REVEAL ANIMATION ---
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
});

// Lanzar animación al inicio por si ya estamos scrolleados
window.dispatchEvent(new Event('scroll'));