document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const navDotsContainer = document.querySelector('.nav-dots');

    const presentationSteps = [
        { slideId: 0, action: 'show' }, // 1. Portada
        { slideId: 1, action: 'show' }, // 2. "Un poco sobre mí"
        { slideId: 2, action: 'show' }, // 3. Tarjeta de Patricia
        { slideId: 2, action: 'flip' }, // 4. Tarjeta de William
        { slideId: 3, action: 'show' }, // 5. Mapa de carrera
        { slideId: 4, action: 'show' }, // 6. Foco Principal (Flujo)
        { slideId: 5, action: 'show' }, // 7. Pregunta impactante
        { slideId: 6, action: 'show' }, // 8. Definición 1
        { slideId: 6, action: 'flip' }, // 9. Definición 2
        { slideId: 7, action: 'show' }, // 10. Definición clave
        { slideId: 8, action: 'show' }, // 11. Flyer 1
        { slideId: 8, action: 'flip' }, // 12. Flyer 2
        { slideId: 9, action: 'show' }, // 13. Pregunta de ejemplos
        { slideId: 10, action: 'show' },// 14. Grid de ejemplos
        { slideId: 11, action: 'show' },// 15. "Caso Hipotético"
        { slideId: 12, action: 'show' },// 16. Flujo de Anuncio de TV
        { slideId: 13, action: 'show' },// 17. Objetivo de Leads
        { slideId: 14, action: 'show' },// 18. Pregunta Clave
        { slideId: 15, action: 'show' },// 19. Puntos de Optimización
        { slideId: 16, action: 'show' },// 20. Pregunta de Transición
        { slideId: 18, action: 'show' },// 21. Segundo Objetivo
        { slideId: 17, action: 'show' },// 22. Seguimiento Constante
        { slideId: 19, action: 'show' },// 23. Conclusión
        { slideId: 20, action: 'show' },// 24. Gracias
        { slideId: 21, action: 'show' } // 25. Referencias
    ];
    let currentStep = 0;

    function runStep(stepIndex) {
        const step = presentationSteps[stepIndex];
        if (!step) return;

        // Lógica para la animación de caracteres en la diapositiva 11
        const slide11 = document.querySelector('.slide[data-slide-id="11"]');
        if (slide11) {
            const chars = slide11.querySelectorAll('.animated-char');
            chars.forEach((char, charIndex) => {
                char.style.animation = 'none'; // Reseteo
                if (step.slideId == 11) {
                    char.style.animation = `char-drop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
                    const wordIndex = char.parentElement.classList.contains('word') ? Array.from(char.parentElement.parentElement.children).indexOf(char.parentElement) : 0;
                    const baseDelay = wordIndex === 0 ? 0.8 : 1.4;
                    char.style.animationDelay = `${baseDelay + charIndex * 0.05}s`;
                }
            });
        }
        
        slides.forEach(s => s.classList.remove('active'));
        const currentSlideElement = document.querySelector(`.slide[data-slide-id="${step.slideId}"]`);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
        }
        
        const activeCard = currentSlideElement ? currentSlideElement.querySelector('.flip-card') : null;
        if (step.action === 'flip') {
            if (activeCard) activeCard.classList.add('is-flipped');
        } else {
            document.querySelectorAll('.flip-card').forEach(card => card.classList.remove('is-flipped'));
        }
        
        updateNavDots(step.slideId);
    }

    function updateNavDots(activeSlideId) {
        const dots = navDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot) => {
            const targetId = dot.dataset.targetSlide;
            dot.classList.toggle('active', targetId == activeSlideId);
        });
    }

    function createNavDots() {
        navDotsContainer.innerHTML = '';
        const uniqueSlideIds = [...new Set(presentationSteps.map(step => step.slideId))];
        
        uniqueSlideIds.forEach((slideId, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.dataset.targetSlide = slideId;
            dot.textContent = index + 1; // Añade el número

            // Añade la funcionalidad de clic
            dot.addEventListener('click', () => {
                const firstStepIndexForSlide = presentationSteps.findIndex(step => step.slideId == slideId);
                if (firstStepIndexForSlide !== -1) {
                    currentStep = firstStepIndexForSlide;
                    runStep(currentStep);
                }
            });

            navDotsContainer.appendChild(dot);
        });
    }

    function goToNextStep() {
        if (currentStep < presentationSteps.length - 1) {
            currentStep++;
            runStep(currentStep);
        }
    }

    function goToPrevStep() {
        if (currentStep > 0) {
            currentStep--;
            runStep(currentStep);
        }
    }

    createNavDots();
    runStep(currentStep);

    prevBtn.addEventListener('click', goToPrevStep);
    nextBtn.addEventListener('click', goToNextStep);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            goToNextStep();
        } else if (event.key === 'ArrowLeft') {
            goToPrevStep();
        }
    });
});