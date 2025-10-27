
    // Provided JavaScript for navigation, animations, etc.
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function removeActive() {
        navLinks.forEach(link => link.parentElement.classList.remove('active'));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80, 
                behavior: 'smooth'
            });

            removeActive();
            link.parentElement.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                removeActive();
                const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (activeLink) activeLink.parentElement.classList.add('active');
            }
        });

        if(window.scrollY > 500){
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }

        // Reveal elements on load and scroll
function checkReveal() {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active-reveal');
        }
    });
}

// Trigger reveal on page load (after loading screen)
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing loading screen code ...

    // After main page is visible, trigger initial reveal
    setTimeout(() => {
        checkReveal(); // Reveal elements immediately
    }, 4500); // Slightly after loading screen fades (adjust to match your timeout)
});

// Also trigger on scroll for dynamic reveals
window.addEventListener('scroll', checkReveal);});

    const backToTop = document.createElement('div');
    backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    backToTop.id = "back-to-top";
    document.body.appendChild(backToTop);

    backToTop.style.cssText = `
        position: fixed;
        bottom: 40px;
        right: 40px;
        background: #474af0;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        transition: transform 0.3s ease;
    `;

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
    backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

    const cards = document.querySelectorAll('.project-card, .skill');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
    });

    const typingElement = document.querySelector('.hero h1'); 
    const words = ["AI Assisted Full-Stack Developer", "Data Analyst", "Java Programmer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        let displayedText = currentWord.substring(0, charIndex);
        
        typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, typingSpeed / 2);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    document.addEventListener('DOMContentLoaded', type);

    document.addEventListener("DOMContentLoaded", () => {
        const loadingText = document.getElementById("loading-text");
        const mainIcon = document.querySelector(".main-icon");
        const subIcons = document.querySelectorAll(".sub-icons i");
        const designerText = document.getElementById("designer-text");
        const mainPage = document.getElementById("main-page");
        const loadingScreen = document.getElementById("loading-screen");

        function showElement(element, delay=0){
            setTimeout(() => {
                element.classList.remove("hidden");
                element.classList.add("fall");
            }, delay);
        }

        showElement(loadingText, 0);          
        showElement(mainIcon, 800);         
        subIcons.forEach((icon, idx) => {
            showElement(icon, 1600 + idx*400);  
        });
        showElement(designerText, 2800);    

        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display='none', 500);
            mainPage.classList.add("visible");
        }, 4000);
    });

    // Existing script for mobile menu and smooth scrolling
    // Mobile menu toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for anchor links with mobile check
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Only close mobile menu if on mobile (screen width <= 768px)
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').style.display = 'none';
                }
            }
        });
    });

    // Optional: Add scroll event to re-open menu on mobile when scrolling to top
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {  // Only on mobile
            const navLinks = document.querySelector('.nav-links');
            if (window.scrollY === 0) {  // At the top of the page
                navLinks.style.display = 'none';  // Or 'flex' if you want it to open automatically
                // Note: Uncomment the line below if you want it to open automatically at the top
                // navLinks.style.display = 'flex';
            }
        }
    });

 // Background Music Control (Plays Once)
const bgMusic = document.getElementById('bg-music');
const musicControl = document.getElementById('music-control');
let hasPlayed = false;

// Attempt autoplay on page load (may be blocked)
document.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().catch(error => {
        console.log('Autoplay blocked:', error); // Logs if blocked
        musicControl.style.display = 'block'; // Show button if blocked
    });
    hasPlayed = true; // Prevent re-playing
});

// Manual play/pause toggle
musicControl.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        bgMusic.pause();
        musicControl.innerHTML = '<i class="fas fa-play"></i>';
    }
});
