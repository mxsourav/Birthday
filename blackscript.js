// ====== Element References ======
const countdownEl = document.getElementById('countdown');
const dateEl = document.getElementById('date');
const continueButton = document.getElementById('continueButton'); // Continue button
const videoContainer = document.getElementById('videoContainer');
const popAudio = document.getElementById('popAudio');
const celebrationAudio = document.getElementById('celebrationAudio');
const confettiCanvas = document.getElementById('confetti');
const celebrationVideo = document.getElementById('celebrationVideo');
const ctx = confettiCanvas.getContext('2d');

// ====== Canvas Setup ======
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ====== Countdown Variables ======
let hours = 11;
let minutes = 59;
let seconds = 55; // start fake countdown

function pad(n) { return n < 10 ? '0' + n : n; }

// ====== Update Countdown Immediately ======
countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

// ====== Fake Countdown Interval ======
const countdownInterval = setInterval(() => {
    // Update countdown display
    countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    // Check if we've reached the target (12:00:00)
    if (hours === 12 && minutes === 0 && seconds === 0) {
        clearInterval(countdownInterval);

        // Countdown reached end: blink and show Continue button
        countdownEl.classList.add('blink');
        continueButton.style.display = 'inline-block';

        // Delay updating the date by a tiny bit to prevent overlap
        setTimeout(() => {
            dateEl.textContent = '13th September 2025';
        }, 100); // 100ms delay is enough

        return; // stop further increments
    }

    // Increment the fake timer
    seconds++;
    if (seconds > 59) {
        seconds = 0;
        minutes++;
        if (minutes > 59) {
            minutes = 0;
            hours++;
        }
    }
}, 1000);


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

// ====== Continue Button Click Handler ======
continueButton.addEventListener('click', () => {
    // Hide Continue button after click
    continueButton.style.display = 'none';

    // Stop blinking countdown
    countdownEl.classList.remove('blink');
    countdownEl.classList.add('fadeOut');

    // Start confetti
    startConfetti();

    // Show video
    videoContainer.style.display = 'block';
    videoContainer.classList.add('fadeIn');

    // Play audio
    celebrationAudio.play().catch(e => console.log("Audio autoplay blocked"));
    popAudio.play().catch(e => console.log("Pop sound autoplay blocked"));
});

// ====== Birthday Text + Next Button Appear When Video Plays ======
celebrationVideo.addEventListener("play", () => {
    // Birthday Text
    let birthdayText = document.getElementById("birthdayText");
    if (!birthdayText) {
        birthdayText = document.createElement("div");
        birthdayText.id = "birthdayText";
        birthdayText.textContent = "🎉 Wish You Happy 19th Birthday 🎂";
        birthdayText.style.position = "absolute";
        birthdayText.style.top = "20%";
        birthdayText.style.left = "50%";
        birthdayText.style.transform = "translate(-50%, -50%)";
        birthdayText.style.fontSize = "3em";
        birthdayText.style.fontWeight = "bold";
        birthdayText.style.color = "#fff";
        birthdayText.style.textShadow = "0 0 15px #ff00ff, 0 0 25px #00ffff";
        birthdayText.style.opacity = "0";
        birthdayText.style.transition = "opacity 2s ease-in-out";
        birthdayText.style.zIndex = "20";
        document.body.appendChild(birthdayText);
    }
    setTimeout(() => {
        birthdayText.style.opacity = "1";
    }, 500);

    // Show Next Button as soon as video starts
    nextButton.style.display = "block";
});


// ====== Confetti Setup ======
const confettiParticles = [];
function startConfetti() {
    for (let i = 0; i < 300; i++) {
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight - window.innerHeight,
            r: Math.random() * 6 + 4,
            d: Math.random() * 50 + 10,
            color: `hsl(${Math.random() * 360},100%,50%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r * (2 + Math.random() * 1.5);
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
    });
    requestAnimationFrame(drawConfetti);
}
// ====== Next Chapter Button Handler ======
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", () => {
    window.location.href = "index3.html";
});
