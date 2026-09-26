const themeToggle = document.querySelector('.change_dark');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

const burgerButton = document.querySelector('.menu_button');
const headerNavigation = document.querySelector('.header_nav');
const allMenuLinks = document.querySelectorAll('.header_list .link');

function toggleMobileMenu() {
    headerNavigation.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
    burgerButton.classList.toggle('is-open');
}

function closeMobileMenu() {
    headerNavigation.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    burgerButton.classList.remove('is-open');
}

burgerButton.addEventListener('click', toggleMobileMenu); 
    allMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 769) {
        closeMobileMenu();
    }
}); 
