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