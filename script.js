let currentStep = 1;

// Move to next step
function nextStep(stepId) {
    document.getElementById(`step${currentStep}`).style.display = "none";
    currentStep = stepId || currentStep + 1;
    const next = document.getElementById(`step${currentStep}`);
    if (next) {
        next.style.display = "block";
        updateProgress();
    }
}

// Open specific step
function openStep(stepNum) {
    document.querySelectorAll(".step").forEach(step => step.style.display = "none");
    document.getElementById("step" + stepNum).style.display = "block";
    currentStep = stepNum;
    updateProgress();
}

// Go back to previous step
function backToStep(stepNum) {
    openStep(stepNum);
}

// Update progress bar
function updateProgress() {
    let progress = 0;
    if (currentStep <= 6) {
        progress = ((currentStep - 1) / 6) * 100;
    } else {
        progress = 100;
    }
    document.getElementById("progressBar").style.width = progress + "%";
}

// Lock screen logic
function saveName() {
    const input = document.getElementById("nameInput").value.trim();
    if (input === "1469") {
        document.getElementById("step2").style.display = "none";
        currentStep = 3;
        document.getElementById("step3").style.display = "block";
        updateProgress();
    } else {
        alert("Access Denied ❌ Wrong password!");
    }
}

// Heart interaction with pink beating heart
function createHearts() {
    const heart = document.getElementById("interactiveHeart");

    // Add beating animation
    heart.classList.add("beat");
    setTimeout(() => heart.classList.remove("beat"), 600);

    // Floating pink hearts
    for (let i = 0; i < 5; i++) {
        const smallHeart = document.createElement("div");
        smallHeart.className = "small-heart";
        smallHeart.innerHTML = "🤍"; // blue heart
        smallHeart.style.position = "fixed";
        smallHeart.style.left = Math.random() * 100 + "vw";
        smallHeart.style.bottom = "0";
        smallHeart.style.fontSize = (20 + Math.random() * 20) + "px";
        smallHeart.style.opacity = 1;
        smallHeart.style.pointerEvents = "none";
        document.body.appendChild(smallHeart);

        // Animate upwards
        let rise = 0;
        const interval = setInterval(() => {
            rise += 2 + Math.random() * 3;
            smallHeart.style.transform = `translateY(-${rise}px)`;
            smallHeart.style.opacity -= 0.01;
            if (rise > 300) {
                clearInterval(interval);
                smallHeart.remove();
            }
        }, 16);
    }

    // Show message
    document.getElementById("heartMessage").style.opacity = 1;
}


// Typing effect
const message = "Happy Birthday Ishu ❤️ Every moment with you is my favorite memory, baby! 💕";
let index = 0;
function typeMessage() {
    if (index < message.length) {
        document.getElementById("typingText").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeMessage, 80);
    }
}

// Trigger typing effect
const observer = new MutationObserver(() => {
    if (document.getElementById("step4").style.display === "block") {
        document.getElementById("typingText").innerHTML = "";
        index = 0;
        typeMessage();
    }
});
observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["style"] });

// Floating petals animation
function createPetals() {
    const container = document.getElementById("petalsContainer");
    if (!container) return;
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}
setInterval(createPetals, 1500);

// Floating background dots
const dots = [];
const numDots = 80;
for (let i = 0; i < numDots; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";
    dot.style.left = Math.random() * window.innerWidth + "px";
    dot.style.top = Math.random() * window.innerHeight + "px";
    dot.style.width = dot.style.height = 3 + Math.random() * 4 + "px";
    dot.speedX = (Math.random() - 0.5) * 0.4;
    dot.speedY = (Math.random() - 0.5) * 0.4;
    dot.style.background = "white";
    dot.style.boxShadow = "0 0 6px #00cfff, 0 0 10px #00cfff";
    dot.style.position = "absolute";
    dot.style.borderRadius = "50%";
    document.body.appendChild(dot);
    dots.push(dot);
}
function animateDots() {
    dots.forEach(dot => {
        let x = parseFloat(dot.style.left);
        let y = parseFloat(dot.style.top);
        x += dot.speedX;
        y += dot.speedY;
        if (x > window.innerWidth) x = 0;
        if (x < 0) x = window.innerWidth;
        if (y > window.innerHeight) y = 0;
        if (y < 0) y = window.innerHeight;
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        dot.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
    });
    requestAnimationFrame(animateDots);
}
animateDots();

// Magical click effect anywhere
document.addEventListener("click", (e) => {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className = "magic-particle";
        particle.style.position = "absolute";
        particle.style.left = e.clientX + "px";
        particle.style.top = e.clientY + "px";
        particle.style.width = particle.style.height = 5 + Math.random() * 5 + "px";
        particle.style.borderRadius = "50%";
        particle.style.background = "white";
        particle.style.boxShadow = "0 0 8px #00cfff, 0 0 12px #00cfff";
        particle.style.pointerEvents = "none";
        document.body.appendChild(particle);

        const animDuration = 800 + Math.random() * 400;
        particle.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${(Math.random()-0.5)*100}px, ${(Math.random()-0.5)*-150}px) scale(0)`, opacity: 0 }
        ], { duration: animDuration, easing: "ease-out" });

        setTimeout(() => particle.remove(), animDuration);
    }
});

// AUDIO
window.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const cakeImage = document.getElementById('cakeImage');
    const firstButton = document.querySelector('#step1 .btn');

    firstButton.addEventListener('click', () => {
        bgMusic.play().catch(err => console.log('Autoplay prevented'));
    });

    if (cakeImage) {
        cakeImage.addEventListener('click', () => {
            const savedTime = localStorage.getItem('bgMusicTime');
            if (savedTime) bgMusic.currentTime = parseFloat(savedTime);
            bgMusic.play().catch(err => console.log('User interaction required'));
        });
    }

    const savedTime = localStorage.getItem('bgMusicTime');
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
        bgMusic.play().catch(err => console.log('User interaction required'));
    }

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('bgMusicTime', bgMusic.currentTime);
    });
});


const heart = document.getElementById('interactiveHeart');

heart.addEventListener('click', () => {
    heart.classList.add('beat');
    setTimeout(() => heart.classList.remove('beat'), 600); // match animation duration
});
