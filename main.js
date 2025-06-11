// --- Initialize AOS (Animate on Scroll) on all pages ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });
});

// --- Homepage: Typing Effect ---
const heroHeadline = document.getElementById('hero-headline');
if (heroHeadline) {
    const originalText = "The Universe Of Entertainment";
    heroHeadline.textContent = "";
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroHeadline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 75);
        }
    }
    window.addEventListener('load', typeWriter);
}

// --- Pricing Page: FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if(question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    }
});

// --- Setup Guide: Tabs Logic ---
const tabsContainer = document.querySelector('.tabs-container');
if (tabsContainer) {
    const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
    const tabPanels = tabsContainer.querySelectorAll('.tab-content-panel');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}

// --- Channel Guide Logic ---
const channelListBody = document.getElementById('channel-list-body');
if (channelListBody) {
    // ... (Paste the full Channel Guide JS code from the previous response here) ...
}


// --- Dashboard & Firebase Logic ---
const dashboardPage = document.querySelector('.dashboard-page');
if (dashboardPage) {
    // PASTE YOUR FIREBASE CONFIG OBJECT HERE
    // const firebaseConfig = { apiKey: "...", ... };
    // const app = firebase.initializeApp(firebaseConfig);
    
    // ... (Paste the full Dashboard/Firebase JS code from the previous response here) ...
}

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log(`Service Worker Error: ${err}`));
    });
}
