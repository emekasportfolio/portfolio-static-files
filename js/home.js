// JavaScript specific to the Home page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page is loaded');
    
    // Example: Change content on the home page dynamically
    let content = document.querySelector('.content');
    if (content) {
        content.style.backgroundColor = '#f9f9f9';  // Light grey background
    }
});
