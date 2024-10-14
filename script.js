// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x0a1929, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme switching
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Language switching
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'dv';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'dv' ? 'en' : 'dv';
    updateLanguage();
});

function updateLanguage() {
    document.querySelectorAll('[data-dv]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    langToggle.textContent = currentLang === 'dv' ? 'English' : 'ދިވެހި';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chat functionality
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initial AI message
addMessage('ހާދަ ރީތި ދުވަހެއް! އަހަރެންނަކީ އަދަބީ. ކިހިނެއްތޯ އަހަރެންނަށް އެހީތެރިވެވޭނީ؟');

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage, lang: currentLang }),
            });
            const data = await response.json();
            addMessage(data.response);
        } catch (error) {
            console.error('Error:', error);
            addMessage(' !މަޢާފުކުރައްވާ، މިވަގުތު އަހަރެންނަށް ޖަވާބެއް ނުދެވޭނެ. އަހަރެންގެ ޤާބިލިއްޔަތު އިތުރަށް ތަރައްޤީ ކުރެވެމުންދަނީ. ޑިސްކޯރޑް ސާރވާރ އަށް ޖޮއިންކޮށްލައްވައިގެން އަދަބީ ބޭނުން ކުރައްވާ');
        }
    }
});

// Initialize language
updateLanguage();








// ... (keep the existing code for background, theme switching, and language switching)

// Chat functionality
function initChat() {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    if (!chatForm) return;

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = content;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initial AI message
    addMessage('ހާދަ ރީތި ދުވަހެއް! އަހަރެންނަކީ އަދަބީ. ކިހިނެއްތޯ އަހަރެންނަށް އެހީތެރިވެވޭނީ؟');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, true);
            userInput.value = '';

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userMessage, lang: document.documentElement.lang }),
                });
                const data = await response.json();
                addMessage(data.response);
            } catch (error) {
                console.error('Error:', error);
                addMessage('މަޢާފުކުރައްވާ، މިވަގުތު އަހަރެންނަށް ޖަވާބެއް ނުދެވޭނެ. އަހަރެންގެ ޤާބިލިއްޔަތު އިތުރަށް ތަރައްޤީ ކުރެވެމުންދަނީ.');
            }
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initThemeSwitch();
    initLanguageSwitch();
    initChat();
});
