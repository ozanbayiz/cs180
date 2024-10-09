function adjustTextContent() {
    const projectNames = document.querySelectorAll('.project-name');

    projectNames.forEach((projectName) => {
        const smallScreenText = projectName.getAttribute('small-screen-text');
        const largeScreenText = projectName.getAttribute('large-screen-text');

        projectName.textContent = window.innerWidth < 880 ? smallScreenText : largeScreenText;
    });
}

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    const toggleBtn = document.querySelector(".toggle-btn");
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.toggle("sidebar-expanded");
        toggleBtn.innerHTML = sidebar.classList.contains("sidebar-expanded") ? "&lt;&lt;&lt;" : "&gt;&gt;&gt;";
        main.style.marginLeft = sidebar.classList.contains("sidebar-expanded") ? "250px" : "55px";
    } else {
        sidebar.classList.toggle("sidebar-collapsed");
        toggleBtn.innerHTML = sidebar.classList.contains("sidebar-collapsed") ? "&gt;&gt;&gt;" : "&lt;&lt;&lt;";
        main.style.marginLeft = sidebar.classList.contains("sidebar-collapsed") ? "55px" : "250px";
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
        main.style.marginLeft = "55px";
    } else {
        toggleBtn.innerHTML = "&lt;&lt;&lt;";
        main.style.marginLeft = "250px";
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
        main.style.marginLeft = "55px";
    } else {
        sidebar.classList.remove("sidebar-expanded");
        if (!sidebar.classList.contains("sidebar-collapsed")) {
            toggleBtn.innerHTML = "&lt;&lt;&lt;";
            main.style.marginLeft = "250px";
        }
    }
}

window.addEventListener('load', initializeSidebar);
window.addEventListener('resize', handleResize);
