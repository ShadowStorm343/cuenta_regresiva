/* ==========================================================================
   Lógica JavaScript - Bloqueo por Contraseña y Audio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {



    // ---------------------------------------------------------
    // 2. Lluvia Continua de Pétalos/Corazones Ambientales
    // ---------------------------------------------------------
    const heartsContainer = document.getElementById('hearts-container');

    function createAmbientHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('ambient-heart');
        
        // Emojis románticos
        const heartTypes = ['❤️', '💖', '🌸', '✨', '💕', '🌹'];
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        
        const size = Math.random() * 1.5 + 0.8; // entre 0.8rem y 2.3rem
        heart.style.fontSize = `${size}rem`;
        
        const duration = Math.random() * 5 + 5; // entre 5s y 10s
        heart.style.animationDuration = `${duration}s`;
        
        heart.style.opacity = Math.random() * 0.4 + 0.3;

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Generar corazones ambientales cada cierto tiempo
    setInterval(createAmbientHeart, 1500);
    for (let i = 0; i < 8; i++) {
        setTimeout(createAmbientHeart, Math.random() * 4000);
    }


    // ---------------------------------------------------------
    // 3. Efecto al hacer clic en pantalla (Brotar corazones)
    // ---------------------------------------------------------
    document.body.addEventListener('click', (e) => {
        // No generar corazones si hace click en botones del teclado
        if (e.target.closest('.key-btn')) return;

        const clickX = e.clientX;
        const clickY = e.clientY;

        for (let i = 0; i < 5; i++) {
            createBurstHeart(clickX, clickY);
        }
    });

    function createBurstHeart(x, y) {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.textContent = ['❤️', '💖', '🌸', '✨'][Math.floor(Math.random() * 4)];
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
        heart.style.zIndex = '9999';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 30;
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity - 50;

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
    // 4. Panel de Contraseña y Keypad
    // ---------------------------------------------------------
    const correctPin = "2507";
    let enteredPin = [];
    const pinDots = document.querySelectorAll('.pin-dot');
    const passcodeCard = document.getElementById('passcode-card');
    const keys = document.querySelectorAll('.key-btn');
    let isProcessing = false;

    function updatePinDisplay() {
        pinDots.forEach((dot, index) => {
            if (index < enteredPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    function addDigit(digit) {
        if (isProcessing || enteredPin.length >= 4) return;
        enteredPin.push(digit);
        updatePinDisplay();

        if (enteredPin.length === 4) {
            verifyPin();
        }
    }

    function removeDigit() {
        if (isProcessing || enteredPin.length === 0) return;
        enteredPin.pop();
        updatePinDisplay();
    }

    // Reset completo del pin
    function clearPin() {
        if (isProcessing) return;
        enteredPin = [];
        updatePinDisplay();
    }

    function verifyPin() {
        isProcessing = true;
        const pinString = enteredPin.join('');

        if (pinString === correctPin) {
            // Éxito
            pinDots.forEach(dot => {
                dot.classList.remove('filled');
                dot.classList.add('success');
            });
            passcodeCard.classList.add('success-scale');

            // Explosión de corazones en el centro de la pantalla
            const rect = passcodeCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    createBurstHeart(centerX + (Math.random() * 100 - 50), centerY + (Math.random() * 100 - 50));
                }, i * 30);
            }

            // Redirección
            setTimeout(() => {
                window.location.href = 'conteo.html';
            }, 1000);
        } else {
            // Error
            pinDots.forEach(dot => {
                dot.classList.remove('filled');
                dot.classList.add('error');
            });
            passcodeCard.classList.add('shake');

            // Pequeña vibración háptica en móviles si está soportada
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }

            setTimeout(() => {
                // Resetear estado después del error
                pinDots.forEach(dot => {
                    dot.classList.remove('error');
                });
                passcodeCard.classList.remove('shake');
                enteredPin = [];
                updatePinDisplay();
                isProcessing = false;
            }, 600);
        }
    }

    // Eventos del teclado en pantalla
    keys.forEach(key => {
        key.addEventListener('click', (e) => {
            e.stopPropagation();
            const keyValue = key.getAttribute('data-key');
            if (keyValue === 'clear') {
                clearPin();
            } else if (keyValue === 'backspace') {
                removeDigit();
            } else {
                addDigit(keyValue);
            }
        });
    });

    // Eventos del teclado físico
    document.addEventListener('keydown', (e) => {
        if (isProcessing) return;
        
        const key = e.key;
        if (key >= '0' && key <= '9') {
            addDigit(key);
        } else if (key === 'Backspace') {
            removeDigit();
        } else if (key === 'Escape' || key === 'Delete' || key.toLowerCase() === 'c') {
            clearPin();
        }
    });
});
