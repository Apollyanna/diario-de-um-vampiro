// Criar partículas
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(particle);
  }
}
createParticles();

// Criar gotas de sangue
function createBloodDrops() {
  setInterval(() => {
    const drop = document.createElement('div');
    drop.className = 'blood-drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = (Math.random() * 5 + 5) + 's';
    drop.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 10000);
  }, 2000);
}
createBloodDrops();

// Loading
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 1000);
});

// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Parallax
const moon = document.getElementById("parallaxMoon");
const silhouette = document.getElementById("parallaxSilhouette");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  if (scrolled < 800) {
    moon.style.transform = `translateY(${scrolled * 0.2}px)`;
    silhouette.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Cursor glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// Menu mobile
const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
});
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// Animação scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

// Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

function openCharacter(card) {
  modalTitle.textContent = card.dataset.name;
  modalText.textContent = card.dataset.text;
  const img = card.querySelector('.character-image');
  if (img && img.src) {
    modalImage.src = img.src;
    modalImage.style.display = 'block';
  } else {
    modalImage.style.display = 'none';
  }
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  closeModal.focus();
}

document.querySelectorAll(".character").forEach(card => {
  card.addEventListener("click", () => openCharacter(card));
});

function hideModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", event => {
  if (event.target === modal) hideModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("active")) hideModal();
});

// Escolha
const result = document.getElementById("choiceResult");
const toast = document.getElementById("toast");
const choiceButtons = document.querySelectorAll(".choice-button");

const savedChoice = localStorage.getItem("tvd_choice");
if (savedChoice) {
  choiceButtons.forEach(btn => {
    if (btn.dataset.type === savedChoice) {
      btn.classList.add("active");
      result.innerHTML = `<strong>Seu diário lembra:</strong> ${btn.dataset.result}`;
      result.classList.add("show");
    }
  });
}

choiceButtons.forEach(button => {
  button.addEventListener("click", function() {
    choiceButtons.forEach(item => item.classList.remove("active"));
    this.classList.add("active");
    localStorage.setItem("tvd_choice", this.dataset.type);
    result.classList.remove("show");
    setTimeout(() => {
      result.innerHTML = `<strong>Seu diário diz:</strong> ${this.dataset.result}`;
      result.classList.add("show");
    }, 300);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});