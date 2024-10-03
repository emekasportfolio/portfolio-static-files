// JavaScript common to both header and footer across all pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Header and footer loaded');
    
    // Example: Change the header link color dynamically
    let links = document.querySelectorAll('.header a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(lnk => lnk.classList.remove('active'));
            link.classList.add('active');  // Mark the clicked link as active
        });
    });

    // Example: Dynamic footer updates
    let footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML += '<p>Thanks for visiting!</p>';
    }
});
