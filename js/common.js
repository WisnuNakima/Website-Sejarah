// Common JavaScript untuk semua halaman

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
