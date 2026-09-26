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
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }
    if (sliderDots.length > 0) {
        sliderDots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}
    if (btnNext) {
    btnNext.addEventListener('click', () => {
        if (currentSlideIndex < sliderSlides.length - 1) {
            currentSlideIndex++;
        } else {
            currentSlideIndex = 0;
        }
        moveSlider();
    });
}
    if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
        } else {
            currentSlideIndex = sliderSlides.length - 1;
        }
        moveSlider();
    });
}

            // catalog coffee/tea/desserts

const productsContainer = document.getElementById('products-container'); 
const categoryButtons = document.querySelectorAll('.coffee_tea_dessert'); 
let allProducts = []; 

function createCardHTML(product) {
    return `
        <div class="catalog_coffee" data-id="${product.name}"> 
            <div class="coffee_img_wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="coffee_text_block">
                <h3>${product.name}</h3>
                <p class="p_dark">${product.description}</p>
                <h3 class="price">$${product.price}</h3>
            </div>
        </div>
    `;
}

function displayProducts(categoryName) {
    productsContainer.innerHTML = '';
    
    const filtered = allProducts.filter(item => item.category === categoryName);
    
    filtered.forEach(product => {
        productsContainer.innerHTML += createCardHTML(product);
    });
}

if (productsContainer) { 
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data; 
            displayProducts('coffee'); 
        })
        .catch(error => console.error('Ошибка загрузки данных из JSON:', error));

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.dataset.category;
            displayProducts(selectedCategory);
        });
    });
}
