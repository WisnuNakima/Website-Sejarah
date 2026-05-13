// JavaScript untuk halaman Tentang Kami (tentang.html)

// Tentang Kami Page: Scroll Animation & Background Change
if (document.querySelector('.tentang-page')) {
    const sections = document.querySelectorAll('section');
    const tentangPage = document.querySelector('.tentang-page');
    
    // Background images untuk setiap section
    const backgrounds = [
        'images/trisakti.png',      // Section 1 - Hero/About Us
        'images/kelompok.png'           // Section 2 - Team
    ];

    let currentBg = 0;
    let isScrolling = false;

    // Set initial background
    if (backgrounds[0]) {
        tentangPage.style.backgroundImage = `url('${backgrounds[0]}')`;
    }

    // Intersection Observer untuk scroll animation
    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Ubah background sesuai section
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                if (sectionIndex !== -1 && sectionIndex !== currentBg && backgrounds[sectionIndex]) {
                    changeBackground(sectionIndex);
                    currentBg = sectionIndex;
                }
            }
        });
    }, observerOptions);

    // Observe semua sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Function untuk mengubah background dengan smooth transition
    function changeBackground(index) {
        if (!isScrolling && backgrounds[index]) {
            isScrolling = true;
            
            // Fade transition
            tentangPage.style.transition = 'background-image 0.8s ease-in-out';
            
            // Change background
            setTimeout(() => {
                tentangPage.style.backgroundImage = `url('${backgrounds[index]}')`;
                isScrolling = false;
            }, 100);
        }
    }

    // Smooth scroll behavior dengan easing dan parallax effect
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    if (scrollPercent > 0 && scrollPercent < 1) {
                        const content = section.querySelector('.about-hero-content, .team-content-wrapper');
                        if (content) {
                            // Smooth fade in dan slide up effect
                            const translateY = Math.max(0, (1 - scrollPercent) * 50);
                            const opacity = Math.min(1, scrollPercent * 1.5);
                            content.style.transform = `translateY(${translateY}px)`;
                            content.style.opacity = opacity;
                        }
                    }
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}
