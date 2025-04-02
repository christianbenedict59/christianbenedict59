document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Year Update ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
            // Optional: Remove class if you want animation to reverse when scrolling out
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with the class 'animate-on-scroll'
    const targets = document.querySelectorAll('.animate-on-scroll');
    targets.forEach(target => {
        observer.observe(target);
    });

    // --- Optional: Active Nav Link Highlighting (More Complex) ---
    // This requires more logic to determine the currently viewed section based on scroll position.
    // You'd typically add scroll event listeners (throttled) and check section boundaries.
    // For simplicity, this is omitted here but can be added as an enhancement.
    // Example concept:
    // const sections = document.querySelectorAll('main section[id]');
    // const navLinks = document.querySelectorAll('.site-header nav ul li a');
    // window.addEventListener('scroll', () => { /* ... logic to find active section ... */ });

});
