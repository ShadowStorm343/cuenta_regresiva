/* ==========================================================================
   Lógica JavaScript - Conteo Regresivo Romántico a Ancash
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Celebración Inicial
    // ---------------------------------------------------------
    setTimeout(() => {
        if (typeof triggerDDayCelebration === 'function') {
            triggerDDayCelebration();
        }
    }, 500);


    // ---------------------------------------------------------
    // 2. Sobre y Carta de Amor Interactiva y Pestañas Diarias
    // ---------------------------------------------------------
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', (e) => {
            envelopeWrapper.classList.toggle('open');
            // Detener la propagación para no generar corazones del click al abrir la carta
            e.stopPropagation();
        });
    }

    const lettersData = {
        lunes: {
            title: "Hola Cielito :3,",
            paragraphs: [
                "Falta muy poco para que comience esta maravillosa y pequeña aventura. Quería escribirte estas pequeñas palabras para decirte lo mucho que te quiero y lo feliz que me hace ver cómo te preparas para tus metas y sueños, incluyendo, por supuesto, este pequeño viaje c:.",
                "Disfruta de cada hermoso paisaje, de la hermosura de los cielos despejados de la provincia, y la belleza del paisaje que no puedes encontrar acá. Toma muchas fotos, respira el aire fresco de la provincia y siente la libertad que un viaje fuera de Lima te puede dar. Yo estaré pensando en ti a cada momento, contando los días para volver a abrazarte :3",
                "¡Te quiero muchísimo!. Y te quiero, te deseo, y te anhelo con todo mi ser ❤️."
            ],
            signature: "Siempre tuyo,<br>Tu Kari<3."
        },
        martes: {
            title: "Feliz Martes, Cielito🌸,",
            paragraphs: [
                "Hoy es martes y la emoción por tu viaje sigue creciendo. Quería escribir este mensajito para expresar lo especial que eres para mí y lo feliz que me hace ver cómo estás a punto de emprender esta gran aventura :3.",
                "Sé que, mientras escribo, estarás ocupada haciendo tus cositas, pero aún así escribo estas palabras con muchas ganas de que ya sea el momento de partir, porque sé que eso te hará feliz, y si te hace feliz eso me hará feliz :3. Ahora, recuerda ir con la mente lista para disfrutar de paisajes increíbles que te llenarán de energía positiva.",
                "Te mando un abrazo gigante y un beso enorme. Estaré aquí pensando en ti en cada paso de tu camino. ¡Te quiero muchísimo! ❤️"
            ],
            signature: "Con todo mi cariño,<br>Tu Kari<3."
        },
        miercoles: {
            title: "Miércoles de expectativas v:",
            paragraphs: [
                "Estoy emocionadooo, muy emocionadooo, estoy escribiendo esta notita mientras estás trabajando. ¡Y no sé como expresar la emoción que siento por tí! Se acerca cada vez tu día de viaje 🌸",
                "Mientras tanto, recuerda lo mucho que te quiero y lo orgulloso que estoy de ti. ¡Espero tengas un hermoso día! 💕"
            ],
            signature: "Con todo mi cariño,<br>Tu Kari<3."
        },
        jueves: {
            title: "¡Feliz Jueves!",
            paragraphs: [
                "¡Ya casi es hora! Dios santo, bendito y misericordioso :v.",
                "El viaje está a la vuelta de la esquina. ¡Prepárateeeeee! 🥰"
            ],
            signature: "Con todo mi cariño,<br>Tu Kari<3."
        },
        viernes: {
            title: "¡Viernes de viaje! ✈️ ❤️",
            paragraphs: [
                "¡El gran día ha llegado! ¡Es hoyyyyy, Dios míoooooooooo!.",
                "¡Te deseo el mejor de los viajes, Cielito lindaaaaaaa! Estaeré contando las horas, minutos, y segundos para saber si ya llegaste o como vas. ❤️",
                "Disfruta mucho, oraré porque tengas un buen viaje. Un saludito a la familia, a tu mamita y a tu hermanita, sé que tu papito se quedaré en casa :v.",
                "Este es tu viaje, disfruta mucho, relájate, duerme, come, y diviértete. Yo te esperaré aquí, pensando en ti y en lo feliz que estoy por ti. ❤️",
            ],
            signature: "Con todo mi cariño,<br>Tu Kari<3."
        }
    };

    function changeLetterTab(day) {
        const letterContent = document.querySelector('.letter-content');
        if (!letterContent) return;

        // Efecto suave de transición de opacidad y posición
        letterContent.style.opacity = '0';
        letterContent.style.transform = 'translateY(15px)';
        letterContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        setTimeout(() => {
            const data = lettersData[day];
            const titleEl = letterContent.querySelector('.letter-title');
            const signatureEl = letterContent.querySelector('.letter-signature');
            
            // Eliminar los párrafos de texto anteriores
            const oldParas = letterContent.querySelectorAll('.letter-text');
            oldParas.forEach(p => p.remove());

            // Actualizar Título
            titleEl.textContent = data.title;

            // Insertar nuevos párrafos antes de la firma
            data.paragraphs.forEach(paraText => {
                const p = document.createElement('p');
                p.className = 'letter-text';
                p.textContent = paraText;
                letterContent.insertBefore(p, signatureEl);
            });

            // Actualizar Firma
            signatureEl.innerHTML = data.signature;

            // Restablecer estilos para fade in
            letterContent.style.opacity = '';
            letterContent.style.transform = '';
            letterContent.style.transition = '';
        }, 220);
    }

    // Configurar eventos de los botones de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar corazones en el clic de pestañas
            
            if (btn.classList.contains('active')) return;

            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedDay = btn.getAttribute('data-day');
            changeLetterTab(selectedDay);

            // Si el sobre está cerrado, se abre automáticamente al cambiar de pestaña
            if (envelopeWrapper && !envelopeWrapper.classList.contains('open')) {
                setTimeout(() => {
                    envelopeWrapper.classList.add('open');
                }, 300);
            }
        });
    });


    // ---------------------------------------------------------
    // 3. Lluvia Continua de Pétalos/Corazones Ambientales
    // ---------------------------------------------------------
    const heartsContainer = document.getElementById('hearts-container');

    function createAmbientHeart() {
        const heart = document.createElement('div');
        heart.classList.add('ambient-heart');
        
        // Emojis de flores: girasoles (🌻), gerberas (🌼) y lirios (🌷)
        const flowerTypes = ['🌻', '🌼', '🌷'];
        heart.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        
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
        heart.textContent = ['🌻', '🌼', '🌷'][Math.floor(Math.random() * 3)];
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
    const musicPrompt = document.getElementById('music-prompt');
    
    // Crear el objeto Audio con el archivo local
    const bgMusic = new Audio("SANTOS BRAVOS - WOW (LetraLyrics).MP3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5; // Reducir volumen al 50%
    let isPlaying = false;

    function playMusic() {
        return bgMusic.play()
            .then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.classList.remove('pulse-attention');
                iconPlay.classList.add('hidden');
                iconPause.classList.remove('hidden');
                if (musicPrompt) musicPrompt.classList.add('hidden');
                removeInteractionListeners();
            })
            .catch((error) => {
                isPlaying = false;
                musicBtn.classList.remove('playing');
                musicBtn.classList.add('pulse-attention');
                iconPlay.classList.remove('hidden');
                iconPause.classList.add('hidden');
                if (musicPrompt) musicPrompt.classList.remove('hidden');
                console.log("Autoplay bloqueado por política del navegador. Esperando interacción del usuario.", error);
            });
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
    }

    function handleUserInteraction() {
        if (!isPlaying) {
            playMusic();
        }
    }

    const interactionEvents = ['click', 'pointerdown', 'touchstart', 'touchend', 'mousedown', 'keydown', 'scroll'];

    function addInteractionListeners() {
        interactionEvents.forEach(event => {
            window.addEventListener(event, handleUserInteraction, { capture: true, passive: true });
        });
    }

    function removeInteractionListeners() {
        interactionEvents.forEach(event => {
            window.removeEventListener(event, handleUserInteraction, { capture: true });
        });
    }

    // Escuchar cualquier tipo de interacción para desbloquear el audio del navegador
    addInteractionListeners();

    // Intentar reproducir inmediatamente
    playMusic();

    // Controlador del botón flotante de música
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar corazoncitos al tocar el botón de música
        if (isPlaying) {
            pauseMusic();
            if (musicPrompt) musicPrompt.classList.add('hidden');
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
