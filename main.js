// Add this code to the top of your main.js file

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // values from 0 to 3000, with step 50ms
        once: true,     // whether animation should happen only once - while scrolling down
    });
});

// Optional: Dynamic typing effect for the hero headline
const headline = document.getElementById('hero-headline');
const originalText = "The Universe Of Entertainment";
headline.textContent = ""; // Clear the text initially

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        headline.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 75); // Adjust typing speed here
    }
}
// Start the typing effect after the page loads
window.addEventListener('load', typeWriter);


// --- PWA Service Worker Registration ---
// (Your existing PWA code remains here)

// --- Firebase Initialization and Auth Logic ---
// (Your existing Firebase code remains here)

// Add this code to your main.js file, after the AOS initialization

// --- FAQ Accordion Logic ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: Close other open FAQs
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
        });

        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});
