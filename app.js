const categoryImages = {
    electronics: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    jewelery: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    "men's clothing": 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    "women's clothing": 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
};

async function fetchCategory() {
    const loader = document.querySelector('.loading');
    loader.style.display = 'flex';
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();
        localStorage.setItem('categories', JSON.stringify(categories));
        const categoryGrid = document.querySelector('#categoryGrid');
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category__card');
            categoryCard.innerHTML = `
                <img src="${categoryImages[category]}" alt="">
                <p>${category}</p>
            `;
            categoryGrid.appendChild(categoryCard);
            categoryCard.addEventListener('click', () => {
                categoryProducts(category);
            });
        });
    } finally {
        loader.style.display = 'none';
    }
}

let currentPage = 1;
const itemsPage = 8;
let allProducts = [];

function produCts(products, page = 1) {
    const productsCard = document.querySelector('#productsCard');
    productsCard.innerHTML = '';
    const startIndex = (page - 1) * itemsPage;
    const endIndex = page * itemsPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product__card');

        const ratingStars = `
            <div>
                ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating.rate))}
                ${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.floor(product.rating.rate))}
            </div>
        `;

        productCard.innerHTML = `
            <div class="product__icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-eye"></i>
            </div>
            <div class="img">
                <img src="${product.image}" alt="" class="product__image">
            </div>
            <div class="product__details">
                <h3 class="product__title">${product.title.slice(0, 40)} ...</h3>
                <div class="card__rating">
                    <p class="product__price">$${product.price}</p>
                    <div class="product__stars">${ratingStars}</div>
                    <p class="product__rating">(${product.rating.count})</p>
                </div>
                <button class="product__btn">Add to Cart</button>
            </div>
        `;
        productsCard.appendChild(productCard);
    });
}

async function categoryProducts(category) {
    const loader = document.querySelector('.loading');
    loader.style.display = 'flex';
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await res.json();
        allProducts = products;
        currentPage = 1;
        produCts(products, currentPage);

        const seeMoreButton = document.querySelector('.seeMore');
        seeMoreButton.style.display = 'block';
        seeMoreButton.onclick = () => {
            currentPage++;
            produCts(products, currentPage);
            if (currentPage * itemsPage >= products.length) {
                seeMoreButton.style.display = 'none';
            }
        };
    } finally {
        loader.style.display = 'none';
    }
}

async function fetchAllProducts() {
    const loader = document.querySelector('.loading');
    loader.style.display = 'flex';
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        allProducts = products;
        produCts(products, currentPage);

        const seeMoreButton = document.createElement('button');
        seeMoreButton.textContent = 'See More';
        seeMoreButton.classList.add('seeMore');
        document.querySelector('.products').appendChild(seeMoreButton);

        seeMoreButton.addEventListener('click', () => {
            currentPage++;
            produCts(allProducts, currentPage);
            if (currentPage * itemsPage >= allProducts.length) {
                seeMoreButton.style.display = 'none';
            }
        });
    } finally {
        loader.style.display = 'none';
    }
}

window.onload = function () {
    fetchCategory();
    fetchAllProducts();
};
