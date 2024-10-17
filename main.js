// Define sidebar width variables
const SIDEBAR_EXPANDED_WIDTH = '250px';
const SIDEBAR_COLLAPSED_WIDTH = '55px';
const SIDEBAR_MOBILE_WIDTH = '30vw';

function adjustTextContent() {
    const projectNames = document.querySelectorAll('.project-name');

    projectNames.forEach((projectName) => {
        const smallScreenText = projectName.getAttribute('small-screen-text');
        const largeScreenText = projectName.getAttribute('large-screen-text');

        projectName.textContent = window.innerWidth <= 768 ? smallScreenText : largeScreenText;
    });
}

function setMainWidth(sidebarWidth) {
    const main = document.getElementById("main");
    const viewportWidth = window.innerWidth;
    const maxWidth = 1000;
    const isMobile = viewportWidth <= 768;
    
    // Ensure sidebar width doesn't exceed 30vw on mobile
    if (isMobile && sidebarWidth.includes('vw')) {
        sidebarWidth = Math.min(parseInt(sidebarWidth), 30) + 'vw';
    }
    
    // Calculate the available width
    const availableWidth = viewportWidth - (sidebarWidth.includes('vw') 
        ? viewportWidth * parseInt(sidebarWidth) / 100 
        : parseInt(sidebarWidth));
    
    // Set the width to the smaller of availableWidth and maxWidth
    const newWidth = Math.min(availableWidth, maxWidth);
    
    main.style.width = `${newWidth}px`;
    main.style.marginLeft = sidebarWidth;
}

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const toggleBtn = document.querySelector(".toggle-btn");
    const isMobile = window.innerWidth <= 768;
    
    console.log("Toggle Nav called. isMobile:", isMobile);

    if (isMobile) {
        sidebar.classList.toggle("sidebar-expanded");
        toggleBtn.innerHTML = sidebar.classList.contains("sidebar-expanded") ? "&lt;&lt;&lt;" : "&gt;&gt;&gt;";
        const sidebarWidth = sidebar.classList.contains("sidebar-expanded") ? SIDEBAR_MOBILE_WIDTH : SIDEBAR_COLLAPSED_WIDTH;
        setMainWidth(sidebarWidth);
    } else {
        sidebar.classList.toggle("sidebar-collapsed");
        toggleBtn.innerHTML = sidebar.classList.contains("sidebar-collapsed") ? "&gt;&gt;&gt;" : "&lt;&lt;&lt;";
        const sidebarWidth = sidebar.classList.contains("sidebar-collapsed") ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
        setMainWidth(sidebarWidth);
    }
}

function initializeSidebar() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    const toggleBtn = document.querySelector(".toggle-btn");
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        sidebar.classList.remove("sidebar-collapsed");
        toggleBtn.innerHTML = "&gt;&gt;&gt;";
        setMainWidth(SIDEBAR_COLLAPSED_WIDTH);
    } else {
        toggleBtn.innerHTML = "&lt;&lt;&lt;";
        setMainWidth(SIDEBAR_EXPANDED_WIDTH);
    }

    // Add click event listeners to dropdown items and carets
    const dropdowns = document.querySelectorAll('.sidebar-content > ol > li');
    dropdowns.forEach(function(dropdown) {
        const subList = dropdown.querySelector('ol');
        if (subList) {
            subList.style.display = 'none';
            const caret = document.createElement('span');
            caret.className = 'caret';
            caret.innerHTML = '˅';
            dropdown.insertBefore(caret, subList);
            
            caret.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                toggleDropdown(dropdown);
            });
        }
    });
}

function toggleDropdown(listItem) {
    const subList = listItem.querySelector('ol');
    const caret = listItem.querySelector('.caret');
    
    if (subList) {
        const isExpanded = subList.style.display === 'block';
        subList.style.display = isExpanded ? 'none' : 'block';
        listItem.classList.toggle('active', !isExpanded);
        caret.innerHTML = isExpanded ? '˅' : '˄';
    }
}

function handleResize() {
    const sidebar = document.getElementById("mySidebar");
    const toggleBtn = document.querySelector(".toggle-btn");
    const main = document.getElementById("main");
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        sidebar.classList.remove("sidebar-collapsed", "sidebar-expanded");
        toggleBtn.innerHTML = "&gt;&gt;&gt;";
        setMainWidth(SIDEBAR_COLLAPSED_WIDTH);
    } else {
        sidebar.classList.remove("sidebar-expanded");
        if (!sidebar.classList.contains("sidebar-collapsed")) {
            toggleBtn.innerHTML = "&lt;&lt;&lt;";
            setMainWidth(SIDEBAR_EXPANDED_WIDTH);
        } else {
            setMainWidth(SIDEBAR_COLLAPSED_WIDTH);
        }
    }

    adjustTextContent();
}

function createImageOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = 'X';
    closeBtn.onclick = closeOverlay;
    
    const img = document.createElement('img');
    img.className = 'enlarged-image';
    
    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    
    return overlay;
}

function openOverlay(imageSrc) {
    const overlay = document.querySelector('.image-overlay') || createImageOverlay();
    const enlargedImage = overlay.querySelector('.enlarged-image');
    enlargedImage.src = imageSrc;
    overlay.style.display = 'flex';
}

function closeOverlay() {
    const overlay = document.querySelector('.image-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function setupImageGrid() {
    const images = document.querySelectorAll('.image-grid img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            openOverlay(this.src);
        });
    });
}

window.addEventListener('load', function() {
    initializeSidebar();
    adjustTextContent();
    setupImageGrid();
});

window.addEventListener('resize', handleResize);
