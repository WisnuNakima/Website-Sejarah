// JavaScript untuk halaman Materi (materi.html)

// Materi Page: Scroll Animation & Background Change
if (document.querySelector('.materi-page')) {
    const sections = document.querySelectorAll('section');
    const materiPage = document.querySelector('.materi-page');
    
    // Background images untuk setiap section
    const backgrounds = [
        'images/kerusuhan.png',     // Section 1 - Background
        'images/section 2.png',     // Section 2 - Project Process
        'images/koran.png',         // Section 3 - Problem Identification
        'images/rapat.png',         // Section 4 - Project Objectives
        'images/semanggi 1.png',    // Section 5 - Problem Identification
        'images/bg prabowo.png'    // Section 6 - Prabowo Subianto
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
