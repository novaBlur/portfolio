// Single Source of Truth for Navigation
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

// Ensure elements exist before proceeding
if (!navLinks.length || !sections.length) {
    console.warn('Navigation elements not found');
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to section with offset for header
function scrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight || 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle Active Link on Scroll (with debouncing for performance)
const handleScroll = debounce(() => {
    let current = "";
    const scrollPosition = window.pageYOffset + 200; // Offset for better detection
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        const linkParent = a.parentElement; // Should be <li>
        if (linkParent) {
            linkParent.classList.remove("active");
            const href = a.getAttribute("href");
            if (href && current && href.includes(current)) {
                linkParent.classList.add("active");
            }
        }
    });

    // Back to Top Visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
        backToTop.setAttribute('aria-hidden', window.scrollY <= 500);
    }
}, 10); // Debounce scroll events

window.addEventListener('scroll', handleScroll);

// Navigation Link Click Handlers with Smooth Scroll
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            scrollToSection(targetId);
            
            // Close mobile menu after navigation
            if (navLinksContainer && window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active-menu');
                // Update mobile menu icon
                const menuIcon = mobileMenu?.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        }
    });
});

// Typing Effect Logic with Error Handling
function initTypingEffect() {
    const typingElement = document.querySelector('.hero h1');
    if (!typingElement) return;
    
    const words = ["Full-Stack Developer", "Systems & Automation", "Data Analyst"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
        const currentWord = words[wordIndex];
        const displayedText = isDeleting ? 
            currentWord.substring(0, charIndex--) : 
            currentWord.substring(0, charIndex++);

        typingElement.innerHTML = `${displayedText}<span class="cursor" aria-hidden="true">|</span>`;

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            speed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        typingTimeout = setTimeout(type, speed);
    }
    
    type();
    
    // Cleanup function for when page unloads
    return () => {
        if (typingTimeout) clearTimeout(typingTimeout);
    };
}

// Mobile Menu Toggle with Icon Animation
if (mobileMenu && navLinksContainer) {
    mobileMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active-menu');
        const menuIcon = mobileMenu.querySelector('i');
        
        if (menuIcon) {
            if (navLinksContainer.classList.contains('active-menu')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                mobileMenu.setAttribute('aria-expanded', 'true');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            navLinksContainer.classList.contains('active-menu') &&
            !navLinksContainer.contains(e.target) &&
            !mobileMenu.contains(e.target)) {
            navLinksContainer.classList.remove('active-menu');
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && navLinksContainer.classList.contains('active-menu')) {
            navLinksContainer.classList.remove('active-menu');
            const menuIcon = mobileMenu.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    }, 250));
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinksContainer?.classList.contains('active-menu')) {
        navLinksContainer.classList.remove('active-menu');
        const menuIcon = mobileMenu?.querySelector('i');
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
        mobileMenu?.setAttribute('aria-expanded', 'false');
        mobileMenu?.focus();
    }
});

// Intersection Observer for Reveal Animations (Performance Optimization)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
            revealObserver.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, observerOptions);

// Observe elements with reveal class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal, .project-card, .skill, .experience-item, .education-item');
    revealElements.forEach(el => revealObserver.observe(el));
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    initTypingEffect();
    
    // Create Back to Top Button with Accessibility
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '<i class="fa-solid fa-chevron-up" aria-hidden="true"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.setAttribute('title', 'Back to top');
    backToTop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backToTop);
    
    // Back to Top Click Handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Focus management for accessibility
        document.querySelector('header a')?.focus();
    });
    
    // Loading Screen Logic with Error Handling
    const loadingScreen = document.getElementById("loading-screen");
    const mainPage = document.getElementById("main-page");
    
    if (loadingScreen && mainPage) {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const loadingDuration = prefersReducedMotion ? 1000 : 3500;
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.setAttribute('aria-hidden', 'true');
                mainPage.classList.add("visible");
                mainPage.setAttribute('aria-hidden', 'false');
                
                // Focus management - skip to main content
                const skipLink = document.querySelector('.skip-link');
                if (skipLink) {
                    skipLink.style.display = 'none';
                }
            }, 500);
        }, loadingDuration);
    } else {
        // If loading screen doesn't exist, ensure main page is visible
        if (mainPage) {
            mainPage.classList.add("visible");
            mainPage.setAttribute('aria-hidden', 'false');
        }
    }
    
    // Add loading state management for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        img.addEventListener('error', () => {
            img.classList.add('error');
            img.setAttribute('alt', 'Image failed to load');
        });
    });
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});
