document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            // Change burger icon to 'X' and back
            navToggle.textContent = isActive ? '✕' : '☰';
            // Prevent body scroll when mobile menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
            // Set ARIA attribute for accessibility
            navToggle.setAttribute('aria-expanded', isActive);
        });

        // Close mobile nav when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.textContent = '☰';
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }


    // --- Sticky Header Background on Scroll --- (Optional Enhancement)
    const header = document.querySelector('.site-header');
    if (header && header.classList.contains('sticky')) { // Only if sticky header is used
        let lastScrollY = window.scrollY;
        const headerHeight = header.offsetHeight; // Get header height

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) { // Add background slightly after scroll starts
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // More opaque
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Back to initial less opaque
                 header.style.boxShadow = 'none';
            }

            // Optional: Hide header on scroll down, show on scroll up
            /*
            if (currentScrollY > lastScrollY && currentScrollY > headerHeight * 2) {
                // Scrolling Down and past the header height
                header.style.transform = `translateY(-${headerHeight}px)`;
            } else {
                 // Scrolling Up or near the top
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; // For Mobile or negative scrolling
            */

        }, { passive: true }); // Improve scroll performance
    }


    // --- Fade-in Animation on Scroll ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        // Adjust trigger point: Element is in view if its top is above the bottom of the viewport
        // and its bottom is below the top of the viewport (partially visible is okay)
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) &&
            el.getBoundingClientRect().bottom >= 0
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    displayScrollElement(entry.target);
                    // Optional: Unobserve after animation if you don't want it to repeat
                    // observer.unobserve(entry.target);
                }
                // Optional: If you want elements to fade out when scrolled out of view
                /* else {
                    entry.target.classList.remove('visible');
                } */
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        scrollElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback for older browsers (less performant)
        const handleScrollAnimationFallback = () => {
            scrollElements.forEach((el) => {
                 // Fallback uses a simpler check
                 const elementTop = el.getBoundingClientRect().top;
                 if (elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.85) { // Trigger when element is 85% up the screen
                    displayScrollElement(el);
                }
            });
        };
        handleScrollAnimationFallback(); // Initial check
        window.addEventListener('scroll', handleScrollAnimationFallback, { passive: true });
    }


    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
