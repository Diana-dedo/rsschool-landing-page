            // work with dark/light theme 

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

            // work with burger

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


            // work with slider

const sliderTrack = document.querySelector('.slider-track');
const sliderSlides = document.querySelectorAll('.choose_coffee');
const sliderDots = document.querySelectorAll('.slider-dot');
const btnPrev = document.querySelector('.go_back_btn');
const btnNext = document.querySelector('.go_ahead_btn');

let currentSlideIndex = 0;
function moveSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    sliderDots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

btnNext.addEventListener('click', () => {
    if (currentSlideIndex <  sliderSlides.length -1) {
        currentSlideIndex++;
    } else {
        currentSlideIndex = 0
    }
    moveSlider();
});

btnPrev.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
    } else {
        currentSlideIndex = sliderSlides.length -1;
    }
    moveSlider();
});