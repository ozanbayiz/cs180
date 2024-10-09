function adjustTextContent() {
    const projectNames = document.querySelectorAll('.project-name');

    projectNames.forEach((projectName) => {
        const smallScreenText = projectName.getAttribute('small-screen-text');
        const largeScreenText = projectName.getAttribute('large-screen-text');

        projectName.textContent = window.innerWidth < 880 ? smallScreenText : largeScreenText;
    });
}

function toggleNav() {
    var sidebar = document.getElementById("mySidebar");
    var main = document.getElementById("main");
    var toggleBtn = document.querySelector(".toggle-btn");
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle("sidebar-expanded");
        if (sidebar.classList.contains("sidebar-expanded")) {
            toggleBtn.innerHTML = "&lt;&lt;&lt;";
            main.style.marginLeft = "250px";
        } else {
            toggleBtn.innerHTML = "&gt;&gt;&gt;";
            main.style.marginLeft = "55px";
        }
    } else {
        sidebar.classList.toggle("sidebar-collapsed");
        if (sidebar.classList.contains("sidebar-collapsed")) {
            toggleBtn.innerHTML = "&gt;&gt;&gt;";
            main.style.marginLeft = "55px";
        } else {
            toggleBtn.innerHTML = "&lt;&lt;&lt;";
            main.style.marginLeft = "250px";
        }
    }
}

function initializeSidebar() {
    var sidebar = document.getElementById("mySidebar");
    var main = document.getElementById("main");
    var toggleBtn = document.querySelector(".toggle-btn");
    if (window.innerWidth <= 768) {
        sidebar.classList.remove("sidebar-collapsed");
        toggleBtn.innerHTML = "&gt;&gt;&gt;";
        main.style.marginLeft = "55px";
    } else {
        toggleBtn.innerHTML = "&lt;&lt;&lt;";
        main.style.marginLeft = "250px";
    }
}

function handleResize() {
    var sidebar = document.getElementById("mySidebar");
    var toggleBtn = document.querySelector(".toggle-btn");
    var main = document.getElementById("main");
    if (window.innerWidth <= 768) {
        sidebar.classList.remove("sidebar-collapsed");
        sidebar.classList.remove("sidebar-expanded");
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

window.addEventListener('resize', function() {
    adjustTextContent();
    handleResize();
});

window.addEventListener('load', function() {
    adjustTextContent();
    initializeSidebar();
});
