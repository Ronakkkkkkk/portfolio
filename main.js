// ===== Animate Page Content =====
function animatePage() {
  document.body.classList.remove("no-scroll");
  document.body.classList.add("ready");

  gsap.from("header h1", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from("header p", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.from(".navbar li", {
    opacity: 0,
    y: -20,
    duration: 0.6,
    delay: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });

  gsap.from(".intro img", {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.7)"
  });

  gsap.from(".intro-text p", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  gsap.from("footer", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 1.4,
    ease: "power2.out"
  });
}

// ===== Welcome Popup (Session-based) =====
const popup = document.getElementById("welcome-popup");
const popupContent = document.querySelector(".popup-content");
const closeBtn = document.getElementById("close-popup");

document.body.classList.add("no-scroll");

if (!sessionStorage.getItem("popupShown")) {
  popup.classList.remove("hidden");

  // Animate popup entrance
  gsap.from(popupContent, {
    opacity: 0,
    scale: 0.7,
    duration: 0.6,
    ease: "power2.out"
  });

  sessionStorage.setItem("popupShown", "true");
} else {
  popup.classList.add("hidden");
  animatePage(); // Skip popup and animate page
}

closeBtn.addEventListener("click", () => {
  gsap.to(popup, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      popup.classList.add("hidden");
      popup.style.opacity = "";
      animatePage();
    }
  });
});

// ===== Highlight Active Tab =====
const currentPath = window.location.pathname;
let currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

// Default to index.html if path is empty
if (currentPage === "") {
  currentPage = "index.html";
}

document.querySelectorAll(".navbar li a").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  }
});
// background.js

(function init() {
  function setup() {
    let canvas = document.getElementById('bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'bg-canvas';
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    const shapes = [];
    const count = 60;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Shape {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 10;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.color = 'rgba(40,40,40,0.8)';
        this.type = ['triangle','square','hexagon'][Math.floor(Math.random()*3)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.rotSpeed;
        if (
          this.x < -this.size || this.x > canvas.width + this.size ||
          this.y < -this.size || this.y > canvas.height + this.size
        ) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        const sides = this.type === 'triangle' ? 3 :
                      this.type === 'square'   ? 4 : 6;
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          ctx.lineTo(Math.cos(angle) * this.size, Math.sin(angle) * this.size);
        }
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      shapes.push(new Shape());
    }

    (function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(s => { s.update(); s.draw(); });
      requestAnimationFrame(animate);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();