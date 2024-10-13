// Navbar toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Particle background
function createParticles() {
    const particleContainer = document.querySelector('.particle-background');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particleContainer.appendChild(particle);
    }
}

createParticles();

// Three.js brain visualization
function initBrainVisualization() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('brain-canvas').appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5, wireframe: true });
    const brain = new THREE.Mesh(geometry, material);

    scene.add(brain);
    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        brain.rotation.x += 0.01;
        brain.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

initBrainVisualization();

// Demo form submission
const demoForm = document.getElementById('demo-form');
const demoText = document.getElementById('demo-text');
const demoResult = document.getElementById('demo-result');

demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = demoText.value;
    
    // Simulate AI processing
    setTimeout(() => {
        const translatedText = text.split('').reverse().join('');
        demoResult.textContent = `Dhivehi translation: ${translatedText}`;
        demoResult.style.opacity = 1;
    }, 1000);
});







document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.discord-card');
    const sparklesContainer = document.querySelector('.sparkles');

    // Create sparkles
    for (let i = 0; i < 20; i++) {
        createSparkle(sparklesContainer);
    }

    // Tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Button click effect
    const joinButton = document.querySelector('.join-button');
    joinButton.addEventListener('click', () => {
        joinButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            joinButton.style.transform = 'scale(1)';
        }, 100);
    });
});

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const size = Math.random() * 5 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    sparkle.style.animationDelay = `${Math.random() * 1.5}s`;
    
    container.appendChild(sparkle);
}


