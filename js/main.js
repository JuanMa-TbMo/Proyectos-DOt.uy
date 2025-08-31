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

// Actualizar año del footer
document.getElementById('anio-actual').textContent = new Date().getFullYear();