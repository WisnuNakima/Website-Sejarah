// JavaScript untuk halaman Home (index.html)

// Enhanced card interaction
const imageCards = document.querySelectorAll('.image-card');

imageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Home Page: Scroll Indicator & Introduction Section Animation
if (document.querySelector('.hero-section')) {
    // Smooth scroll to introduction section when clicking scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const introSection = document.querySelector('.intro-section');
            if (introSection) {
                introSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Intersection Observer for introduction section animation (repeatable)
    const introContainer = document.querySelector('.intro-container');
    if (introContainer) {
        const observerOptions = {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        };

        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Tambahkan class visible saat masuk viewport
                    entry.target.classList.add('visible');
                } else {
                    // Hapus class visible saat keluar viewport (agar bisa muncul lagi)
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        introObserver.observe(introContainer);
    }

    // Hide scroll indicator when scrolling down
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollIndicator) {
            if (scrollTop > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });
}
