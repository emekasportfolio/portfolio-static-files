// JavaScript specific to the About page
document.addEventListener('DOMContentLoaded', function() {
    console.log('About page is loaded');
    
    // Example: Add interactivity or animations to the about page content
    let header = document.querySelector('h1');
    if (header) {
        header.style.color = '#8B0000';  // Dark red text for the header
    }
    
    let links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            link.style.color = '#556B2F';  // Dark olive green on hover
        });
        link.addEventListener('mouseleave', function() {
            link.style.color = '#8B0000';  // Revert back to dark red
        });
    });
});
