/* ==========================================================================
   Lógica JavaScript - Conteo Regresivo Romántico a Ancash
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Configuración del Conteo Regresivo
    // ---------------------------------------------------------
    // Fecha objetivo: 24 de Julio de 2026, 00:00:00 hora local
    const targetDate = new Date('2026-07-24T00:00:00').getTime();
    
    // Fecha de inicio fija (11 de Julio de 2026) para calcular el progreso de la barra
    const startDate = new Date('2026-07-11T00:00:00').getTime();
    const totalDuration = targetDate - startDate;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownGrid = document.getElementById('countdown');
    const celebrationMsg = document.getElementById('celebration-msg');
    
    const progressBar = document.getElementById('progress-bar');
    const traveler = document.getElementById('traveler');

    function updateCountdown() {
        const now = Date.now();
        const difference = targetDate - now;

        // Si ya llegó la fecha o pasó
        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            
            // Ocultar conteo y mostrar mensaje especial de viaje
            countdownGrid.classList.add('hidden');
            celebrationMsg.classList.remove('hidden');
            
            progressBar.style.width = '100%';
            traveler.style.left = '100%';
            
            // Iniciar lluvia de confeti / celebración
            triggerDDayCelebration();
            return;
        }

        // Cálculos de tiempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Actualizar DOM con formato 00
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        // Actualizar barra de progreso y el corazoncito viajero
        const elapsed = now - startDate;
        let progressPercent = (elapsed / totalDuration) * 100;
        progressPercent = Math.min(Math.max(progressPercent, 0), 100);
        
        progressBar.style.width = `${progressPercent}%`;
        traveler.style.left = `${progressPercent}%`;
    }

    // Actualizar inmediatamente y luego cada segundo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);


    // ---------------------------------------------------------
    // 2. Sobre y Carta de Amor Interactiva
    // ---------------------------------------------------------
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', (e) => {
            envelopeWrapper.classList.toggle('open');
            // Detener la propagación para no generar corazones del click al abrir la carta
            e.stopPropagation();
        });
    }


    // ---------------------------------------------------------
    // 3. Lluvia Continua de Pétalos/Corazones Ambientales
    // ---------------------------------------------------------
    const heartsContainer = document.getElementById('hearts-container');

    function createAmbientHeart() {
        const heart = document.createElement('div');
        heart.classList.add('ambient-heart');
        
        // Emojis románticos aleatorios
        const heartTypes = ['❤️', '💖', '🌸', '✨', '💕', '🌹'];
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        // Posicionamiento horizontal aleatorio
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamaño aleatorio
        const size = Math.random() * 1.5 + 0.8; // entre 0.8rem y 2.3rem
        heart.style.fontSize = `${size}rem`;
        
        // Duración de animación aleatoria
        const duration = Math.random() * 5 + 5; // entre 5s y 10s
        heart.style.animationDuration = `${duration}s`;
        
        // Opacidad sutil
        heart.style.opacity = Math.random() * 0.4 + 0.3;

        heartsContainer.appendChild(heart);

        // Remover después de que acabe la animación
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Generar corazones ambientales cada cierto tiempo
    setInterval(createAmbientHeart, 1500);
    // Generar unos iniciales para que no empiece vacío
    for (let i = 0; i < 8; i++) {
        setTimeout(createAmbientHeart, Math.random() * 4000);
    }


    // ---------------------------------------------------------
    // 4. Efecto al hacer clic en pantalla (Brotar corazones)
    // ---------------------------------------------------------
    document.body.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;

        // Crear una pequeña ráfaga de 5 corazoncitos
        for (let i = 0; i < 5; i++) {
            createBurstHeart(clickX, clickY);
        }
    });

    function createBurstHeart(x, y) {
        const heart = document.createElement('div');
        heart.textContent = ['❤️', '💖', '🌸', '✨'][Math.floor(Math.random() * 4)];
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
        heart.style.zIndex = '9999';
        
        // Calcular dirección aleatoria para el esparcimiento
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 30; // distancia de vuelo
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity - 50; // Tendencia hacia arriba

        // Animación dinámica por JavaScript Web Animation API
        const anim = heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${moveX}px, ${moveY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });

        heartsContainer.appendChild(heart);

        anim.onfinish = () => {
            heart.remove();
        };
    }


    // ---------------------------------------------------------
    // 5. Reproductor de Música de Fondo (Archivo Local)
    // ---------------------------------------------------------
    const musicBtn = document.getElementById('music-btn');
    const iconPlay = musicBtn.querySelector('.icon-play');
    const iconPause = musicBtn.querySelector('.icon-pause');
    
    // Crear el objeto Audio con el archivo local
    const bgMusic = new Audio("I Follow Rivers - Lykke Li (La Vie d'AdèleLa Vida de Adele).MP3");
    bgMusic.loop = true;
    let isPlaying = false;

    function playMusic() {
        bgMusic.play()
            .then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                iconPlay.classList.add('hidden');
                iconPause.classList.remove('hidden');
            })
            .catch((error) => {
                console.log("La reproducción automática fue bloqueada por el navegador. Se reproducirá al interactuar.", error);
            });
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
    }

    // Intentar reproducir de inmediato al ingresar a la página
    playMusic();

    // Función para reproducir tras la primera interacción del usuario (requerido por políticas de navegadores)
    const playOnInteraction = () => {
        if (!isPlaying) {
            playMusic();
        }
        // Remover eventos para que no sigan ejecutándose
        window.removeEventListener('click', playOnInteraction);
        window.removeEventListener('keydown', playOnInteraction);
        window.removeEventListener('touchstart', playOnInteraction);
    };

    window.addEventListener('click', playOnInteraction);
    window.addEventListener('keydown', playOnInteraction);
    window.addEventListener('touchstart', playOnInteraction);

    // Controlador del botón flotante de música
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar corazoncitos al tocar el botón de música
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });


    // ---------------------------------------------------------
    // 6. Celebración de Día Cero (D-Day)
    // ---------------------------------------------------------
    let celebrationActive = false;

    function triggerDDayCelebration() {
        if (celebrationActive) return;
        celebrationActive = true;
        
        // Lanzar una ráfaga masiva de confeti/corazones al inicio
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const randomX = Math.random() * window.innerWidth;
                const randomY = window.innerHeight + 20;
                createBurstHeart(randomX, randomY);
            }, i * 100);
        }

        // Seguir lanzando confeti periódicamente
        setInterval(() => {
            const randomX = Math.random() * window.innerWidth;
            createBurstHeart(randomX, window.innerHeight - 10);
        }, 300);
    }
});
