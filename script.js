// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default for anchor links (not for index.html)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
    });
});

// Add active class to current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

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
    let lastScrollTop = 0;
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
        
        lastScrollTop = scrollTop;
    });
}

// Materi Page: Scroll Animation & Background Change
if (document.querySelector('.materi-page')) {
    const sections = document.querySelectorAll('section');
    const materiPage = document.querySelector('.materi-page');
    
    // Background images untuk setiap section
    const backgrounds = [
        'kerusuhan.png',  // Section 1 - Background
        'section 2.png',  // Section 2 - Project Process
        'koran.png',  // Section 3 - Problem Identification
        'rapat.png',  // Section 4 - Project Objectives
        'semanggi 1.png'   // Section 5 - Problem Identification
    ];

    let currentBg = 0;
    let isScrolling = false;

    // Intersection Observer untuk scroll animation
    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class visible untuk animasi
                entry.target.classList.add('section-visible');
                
                // Ubah background sesuai section
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                if (sectionIndex !== -1 && sectionIndex !== currentBg) {
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
        if (!isScrolling) {
            isScrolling = true;
            
            // Fade out
            materiPage.style.transition = 'background-image 0.8s ease-in-out';
            
            // Change background
            setTimeout(() => {
                materiPage.style.backgroundImage = `url('${backgrounds[index]}')`;
                isScrolling = false;
            }, 100);
        }
    }

    // Smooth scroll behavior dengan easing
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Parallax effect untuk sections
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    if (scrollPercent > 0 && scrollPercent < 1) {
                        const content = section.querySelector('.section-content-wrapper, .section-content-wrapper-center');
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

    // Set initial background
    if (backgrounds[0]) {
        materiPage.style.backgroundImage = `url('${backgrounds[0]}')`;
    }
}

// Tentang Kami Page: Scroll Animation & Background Change
if (document.querySelector('.tentang-page')) {
    const sections = document.querySelectorAll('section');
    const tentangPage = document.querySelector('.tentang-page');
    
    // Background images untuk setiap section
    const backgrounds = [
        'trisakti.png',      // Section 1 - Hero/About Us
        'demo.png'           // Section 2 - Team
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

    // Smooth parallax effect saat scroll
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                    
                    if (scrollPercent > 0 && scrollPercent < 1.2) {
                        // Subtle parallax effect
                        const translateY = Math.max(-20, (0.5 - scrollPercent) * 30);
                        section.style.transform = `translateY(${translateY}px)`;
                    }
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}

// Popup Functions
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close popup when clicking outside the content
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-overlay')) {
        closePopup(e.target.id);
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup-overlay.active');
        if (activePopup) {
            closePopup(activePopup.id);
        }
    }
});
