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
const headerNav = document.querySelector('.header_nav');
const allMenuLinks = document.querySelectorAll('.header_list .link');

function toggleMobileMenu() {
    headerNav.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
    burgerButton.classList.toggle('is-open');
}

function closeMobileMenu() {
    headerNav.classList.remove('is-open');
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {

        const headerNav = document.querySelector('.header_nav');
        const menuButton = document.querySelector('.menu_button');
        
        if (headerNav && headerNav.classList.contains('is-open')) {
            headerNav.classList.remove('is-open');
            menuButton.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }

        const modal = document.getElementById('product-modal');
        if (modal && modal.classList.contains('is-active')) {
            modal.classList.remove('is-active'); 
            document.body.classList.remove('no-scroll'); 
        }
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
            moveSlider();
        } else {
            currentSlideIndex = 0;
            
            sliderTrack.style.transition = 'none';
            moveSlider();
            
            setTimeout(() => {
                sliderTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 20);
        }
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            moveSlider();
        } else {
            currentSlideIndex = sliderSlides.length - 1;
            
            sliderTrack.style.transition = 'none';
            moveSlider();
            
            setTimeout(() => {
                sliderTrack.style.transition = 'transform 0.5s ease-in-out';
            }, 20);
        }
    });
}


let touchStartX = 0;
let touchEndX = 0;

if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    sliderTrack.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance < -50) {
        if (currentSlideIndex < sliderSlides.length - 1) {
            currentSlideIndex++;
        } else {
            currentSlideIndex = 0; 
        }
        moveSlider();
    }
    
    if (swipeDistance > 50) {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
        } else {
            currentSlideIndex = sliderSlides.length - 1; 
        }
        moveSlider();
    }
}



            // catalog coffee/tea/desserts


const productsContainer = document.getElementById('products-container'); 
const categoryButtons = document.querySelectorAll('.coffee_tea_dessert'); 
const loadMoreBtn = document.getElementById('load-more-btn');

let allProducts = []; 
let currentCategory = 'coffee';

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

function displayProducts(categoryName, showAll = false) {
    currentCategory = categoryName;
    productsContainer.innerHTML = '';
    
    const filtered = allProducts.filter(item => item.category === categoryName);
    
    const isMobile = window.innerWidth <= 768;
    
    let productsToRender = filtered;
    
    if (isMobile && filtered.length > 4 && !showAll) {
        productsToRender = filtered.slice(0, 4); 
        if (loadMoreBtn) loadMoreBtn.style.display = 'block'; 
    } else {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none'; 
    }

    productsToRender.forEach(product => {
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
        button.addEventListener('click', (e) => {
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            const selectedCategory = button.dataset.category;
            displayProducts(selectedCategory); 
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayProducts(currentCategory, true); 
        });
    }

    window.addEventListener('resize', () => {
        displayProducts(currentCategory);
    });

    // pop-up

    function updateTotalPrice() {
    const basePrice = Number(currentProduct.price);
    const totalPrice = basePrice + selectedSizeAddPrice + selectedAdditivesPrice;
    
    const totalPriceElement = document.getElementById('modal-total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function initModalInteractivity() {
    const sizeButtons = modalBody.querySelectorAll('.size-btn');
    const additiveButtons = modalBody.querySelectorAll('.additive-btn');

    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedSizeAddPrice = Number(btn.dataset.sizePrice);
            updateTotalPrice();
        });
    });

    additiveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active'); 
            
            selectedAdditivesPrice = 0;
            modalBody.querySelectorAll('.additive-btn.active').forEach(activeBtn => {
                selectedAdditivesPrice += Number(activeBtn.dataset.additivePrice);
            });
            
            updateTotalPrice();
        });
    });
}

if (productsContainer && modal) {
    productsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.catalog_coffee');
        if (card) {
            const productName = card.dataset.id;
            const productData = allProducts.find(item => item.name === productName);
            
            if (productData) {
                renderModalContent(productData);
                modal.classList.add('is-active');
                document.body.classList.add('no-scroll');
            }
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        }
    });
}
}


const modal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body-content');
const modalCloseBtn = document.getElementById('modal-close');

let currentProduct = null; 
let selectedSizeAddPrice = 0.00; 
let selectedAdditivesPrice = 0.00; 

function renderModalContent(product) {
    currentProduct = product;
    
    selectedSizeAddPrice = 0.00;
    selectedAdditivesPrice = 0.00;

    let sizesHTML = '';
    Object.keys(product.sizes).forEach((key, index) => {
        const sizeInfo = product.sizes[key];
        const isActive = index === 0 ? 'active' : ''; 
        sizesHTML += `
            <button class="modal-tab-btn size-btn ${isActive}" data-size-price="${sizeInfo['add-price']}">
                <span class="btn-icon">${key.toUpperCase()}</span> ${sizeInfo.size}
            </button>
        `;
    });

    let additivesHTML = '';
    product.additives.forEach((additive, index) => {
        additivesHTML += `
            <button class="modal-tab-btn additive-btn" data-additive-price="${additive['add-price']}">
                <span class="btn-icon">${index + 1}</span> ${additive.name}
            </button>
        `;
    });

    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-img-wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="modal-info-block">
                <h2>${product.name}</h2>
                <p class="modal-desc">${product.description}</p>
                
                <div class="modal-section">
                    <span class="section-title">Size</span>
                    <div class="modal-tabs-row">${sizesHTML}</div>
                </div>

                <div class="modal-section">
                    <span class="section-title">Additives</span>
                    <div class="modal-tabs-row">${additivesHTML}</div>
                </div>

                <div class="modal-total-row">
                    <span class="total-title">Total:</span>
                    <span class="total-price" id="modal-total-price">$${Number(product.price).toFixed(2)}</span>
                </div>
                
                <div class="modal-warning">
                    <img src="./img/info-icon-dark.png" alt="info" class="info-icon info-icon-dark">
                    <img src="./img/info-icon-light.png" alt="info" class="info-icon info-icon-light">
                    <span>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</span>
                </div>

                <button class="modal-action-close-btn" id="modal-btn-close-click">Close</button>
            </div>
        </div>
    `;

    initModalInteractivity();
    const closeBtnClick = modalBody.querySelector('#modal-btn-close-click');
    if (closeBtnClick) {
        closeBtnClick.addEventListener('click', () => {
            modal.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        });
    }
}

