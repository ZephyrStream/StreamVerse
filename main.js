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

// --- CHANNEL GUIDE LOGIC ---
// This code will run only if it finds the 'channel-list-body' element.
document.addEventListener('DOMContentLoaded', () => {
    const channelListBody = document.getElementById('channel-list-body');
    if (!channelListBody) return; // Exit if not on the channel guide page

    const searchBar = document.getElementById('search-bar');
    const categoryFilters = document.querySelectorAll('.filter-btn');
    const paginationControls = document.getElementById('pagination-controls');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    let allChannels = [];
    let filteredChannels = [];
    let currentCategory = 'all';
    let currentPage = 1;
    const rowsPerPage = 50;

    // Fetch channel data from JSON file
    async function loadChannels() {
        try {
            const response = await fetch('channels.json');
            if (!response.ok) throw new Error('Network response was not ok');
            allChannels = await response.json();
            filteredChannels = [...allChannels];
            loadingIndicator.style.display = 'none';
            displayPage(1);
        } catch (error) {
            loadingIndicator.textContent = 'Failed to load channels. Please try again later.';
            console.error('Error fetching channels:', error);
        }
    }

    // Display a specific page of channels
    function displayPage(page) {
        currentPage = page;
        channelListBody.innerHTML = '';
        
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = filteredChannels.slice(start, end);

        paginatedItems.forEach(channel => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${channel.logo}" alt="${channel.name} Logo" class="channel-logo"></td>
                <td>${channel.name}</td>
                <td>${channel.category}</td>
            `;
            channelListBody.appendChild(row);
        });

        setupPagination();
    }

    // Setup pagination buttons
    function setupPagination() {
        paginationControls.innerHTML = '';
        const pageCount = Math.ceil(filteredChannels.length / rowsPerPage);
        
        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = '«';
        prevButton.classList.add('pagination-btn');
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => displayPage(currentPage - 1));
        paginationControls.appendChild(prevButton);

        // Page Number Buttons (simplified for performance)
        for (let i = 1; i <= pageCount; i++) {
             if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('pagination-btn');
                if (i === currentPage) pageButton.classList.add('active');
                pageButton.addEventListener('click', () => displayPage(i));
                paginationControls.appendChild(pageButton);
             } else if (i === currentPage - 3 || i === currentPage + 3) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                paginationControls.appendChild(ellipsis);
            }
        }
        
        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = '»';
        nextButton.classList.add('pagination-btn');
        nextButton.disabled = currentPage === pageCount;
        nextButton.addEventListener('click', () => displayPage(currentPage + 1));
        paginationControls.appendChild(nextButton);
    }

    // Filter and Search logic
    function applyFilters() {
        const searchTerm = searchBar.value.toLowerCase();

        // Start with category filter
        if (currentCategory === 'all') {
            filteredChannels = [...allChannels];
        } else {
            filteredChannels = allChannels.filter(channel => 
                channel.category.toLowerCase() === currentCategory.toLowerCase()
            );
        }
        
        // Then apply search filter
        if (searchTerm) {
            filteredChannels = filteredChannels.filter(channel => 
                channel.name.toLowerCase().includes(searchTerm)
            );
        }

        displayPage(1); // Reset to first page after filtering
    }

    // Event Listeners
    searchBar.addEventListener('keyup', applyFilters);

    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            applyFilters();
        });
    });

    // Initial load
    loadChannels();
});

// --- SETUP GUIDE TABS LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.tabs-container');
    if (!tabsContainer) return; // Exit if not on the setup guide page

    const tabButtons = tabsContainer.querySelectorAll('.tab-btn');
    const tabPanels = tabsContainer.querySelectorAll('.tab-content-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activate the clicked one
            button.classList.add('active');
_
            const targetPanelId = button.dataset.tab;
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});

// --- DASHBOARD AUTHENTICATION & DATA LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the dashboard page
    const dashboardPage = document.querySelector('.dashboard-page');
    if (!dashboardPage) return;

    // --- Firebase SDKs ---
    const { initializeApp } = firebase.app;
    const { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } = firebase.auth;
    const { getFirestore, doc, getDoc } = firebase.firestore;
    
    // --- Your Firebase Config (should be defined earlier in the file) ---
    // const firebaseConfig = { ... };
    // const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const db = getFirestore();
    const provider = new GoogleAuthProvider();

    // --- Get DOM Elements ---
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');
    const googleLoginBtn = document.getElementById('google-login-btn');
    const logoutButton = document.getElementById('logout-button');
    const userEmailDisplay = document.getElementById('user-email-display');
    const subscriptionDetailsDiv = document.getElementById('subscription-details');

    // --- Core Auth State Listener ---
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is signed in
            loginView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
            userEmailDisplay.textContent = user.email;
            loadSubscriptionData(user.uid);
        } else {
            // User is signed out
            dashboardView.classList.add('hidden');
            loginView.classList.remove('hidden');
        }
    });

    // --- Load Subscription Data from Firestore ---
    async function loadSubscriptionData(userId) {
        subscriptionDetailsDiv.innerHTML = '<div class="loader"></div>'; // Show loader
        const docRef = doc(db, "subscriptions", userId);
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const expiry = new Date(data.expiry_date.seconds * 1000).toLocaleDateString();
                subscriptionDetailsDiv.innerHTML = `
                    <div class="detail-item"><strong>Plan:</strong> <span>${data.plan}</span></div>
                    <div class="detail-item"><strong>Status:</strong> <span class="status-${data.status.toLowerCase()}">${data.status}</span></div>
                    <div class="detail-item"><strong>Expires On:</strong> <span>${expiry}</span></div>
                    <div class="detail-item">
                        <strong>M3U Link:</strong>
                        <div class="m3u-container">
                            <input type="text" id="m3u-link-input" value="${data.m3u_url}" readonly>
                            <button class="copy-btn" id="copy-m3u-btn">Copy</button>
                        </div>
                    </div>
                `;
                // Add event listener for the new copy button
                document.getElementById('copy-m3u-btn').addEventListener('click', copyM3uLink);
            } else {
                subscriptionDetailsDiv.innerHTML = "<p>No active subscription found for this account. If you've just paid, please wait a few minutes or contact support.</p>";
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
            subscriptionDetailsDiv.innerHTML = "<p>Could not load your subscription data. Please try again later.</p>";
        }
    }

    // --- Event Handlers ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.style.display = 'none';
        try {
            await signInWithEmailAndPassword(auth, loginEmailInput.value, loginPasswordInput.value);
        } catch (error) {
            loginError.textContent = "Invalid email or password. Please try again.";
            loginError.style.display = 'block';
        }
    });
    
    googleLoginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider).catch(error => {
            loginError.textContent = "Google Sign-In failed. Please try again.";
            loginError.style.display = 'block';
        });
    });

    logoutButton.addEventListener('click', () => {
        signOut(auth);
    });

    function copyM3uLink() {
        const m3uInput = document.getElementById('m3u-link-input');
        const copyBtn = document.getElementById('copy-m3u-btn');
        navigator.clipboard.writeText(m3uInput.value).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        });
    }
});
