function resizeSpider() {
    const textContent = document.getElementById('ascii-spider');
    const smallScreenText = textContent.getAttribute('small-screen-text');
    const largeScreenText = textContent.getAttribute('large-screen-text');
    
    // Set the text based on the window size
    if (window.innerWidth < 880) {
        textContent.textContent = smallScreenText;
    } else {
        textContent.textContent = largeScreenText;
    }
}
// Automatically adjust text based on window size
window.addEventListener('resize', resizeSpider);
window.addEventListener('load', resizeSpider);

function adjustTextContent() {
    // Get all elements with the class 'ascii-art'
    const projectNames = document.querySelectorAll('.project-name');

    // Loop through each element
    projectNames.forEach((projectName) => {
        // Get the small and large screen ASCII art from the data attributes
        const smallScreenArt = projectName.getAttribute('small-screen-text');
        const largeScreenArt = projectName.getAttribute('large-screen-text');

        // Swap the content based on screen size
        if (window.innerWidth < 880) {
            projectName.textContent = smallScreenArt;
        } else {
            projectName.textContent = largeScreenArt;
        }
    });
}

window.addEventListener('resize', adjustTextContent);
window.addEventListener('load', adjustTextContent);
