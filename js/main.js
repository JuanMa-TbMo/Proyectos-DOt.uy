// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.grid-proyectos');
    const filterButtonsContainer = document.querySelector('.filter-buttons');

    // --- FUNCIÓN PARA RENDERIZAR PROYECTOS ---
    const renderProjects = (filter = 'all') => {
        // Filtrar los proyectos que se deben mostrar
        const filteredProjects = projectsData.filter(project => 
            filter === 'all' || project.categories.includes(filter)
        );

        // Generar el HTML para cada proyecto filtrado
        projectGrid.innerHTML = filteredProjects.map(project => `
            <article class="proyecto" data-category="${project.categories.join(' ')}">
                <div class="imagen-proyecto">
                    <img src="${project.imageSrc}" alt="${project.altText}" loading="lazy">
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="etiqueta">${project.tag}</span>
            </article>
        `).join('');
    };

    // --- MANEJO DE CLICS EN LOS BOTONES DE FILTRO ---
    filterButtonsContainer.addEventListener('click', (e) => {
        // Salir si el clic no fue en un botón
        if (e.target.tagName !== 'BUTTON') return;

        // Actualizar el botón activo
        filterButtonsContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        const newFilter = e.target.dataset.filter;

        // Aplicar la animación
        projectGrid.classList.add('fading-out');

        // Esperar a que la animación de fade-out termine
        setTimeout(() => {
            // Renderizar los nuevos proyectos
            renderProjects(newFilter);
            // Quitar la clase para que aparezcan con fade-in
            projectGrid.classList.remove('fading-out');
        }, 300); // Este tiempo debe coincidir con la transición en CSS
    });

    // --- RENDERIZADO INICIAL ---
    renderProjects();
});
document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para la animación Fade-in de secciones ---
    const sections = document.querySelectorAll('.fade-in-section');

    if (sections.length > 0) {
        const observerOptions = {
            root: null, // Observa la intersección con el viewport
            rootMargin: '0px',
            threshold: 0.1 // Se activa cuando el 10% del elemento es visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Si la sección está intersectando (visible en pantalla)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Una vez que la animación ocurre, dejamos de observar el elemento
                    observer.unobserve(entry.target);
                }
            });
        };

        const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- Script para el año actual en el footer ---
    const yearSpan = document.getElementById('anio-actual');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
});

// Actualizar año del footer
document.getElementById('anio-actual').textContent = new Date().getFullYear();