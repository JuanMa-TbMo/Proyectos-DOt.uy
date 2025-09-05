// js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA CONSOLIDADA ---

    const projectGrid = document.querySelector('.grid-proyectos');
    const filterButtonsContainer = document.querySelector('.filter-buttons');
    const yearSpan = document.getElementById('anio-actual');
    const sections = document.querySelectorAll('.fade-in-section');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // --- 1. NAVEGACIÓN (MENÚ MÓVIL Y EFECTO SCROLL) ---
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }

    // Añadir sombra al navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 2. FILTRADO DE PROYECTOS ---
    if (projectGrid && filterButtonsContainer) {
        const renderProjects = (filter = 'all') => {
            const filteredProjects = projectsData.filter(project => 
                filter === 'all' || project.categories.includes(filter)
            );

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

        filterButtonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            filterButtonsContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            const newFilter = e.target.dataset.filter;
            projectGrid.classList.add('fading-out');

            setTimeout(() => {
                renderProjects(newFilter);
                projectGrid.classList.remove('fading-out');
            }, 400); // Aumentado ligeramente para coincidir con la nueva transición
        });
        
        // Renderizado inicial
        renderProjects();
    }


    // --- 3. ANIMACIÓN FADE-IN EN SECCIONES ---
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- 4. AÑO ACTUAL EN EL FOOTER ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});