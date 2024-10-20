const sidebar = document.querySelector(".sidebar")
const hamburger = document.querySelector(".navbar__hamburger")
const sidebarExit = document.querySelector(".sidebar__exit")
const categoryImages = {
    "electronics": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "jewelery": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "men's clothing": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "women's clothing": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
};

hamburger.addEventListener("click", () => {
    sidebar.style.right = "0px";
});
sidebarExit.addEventListener("click", () => {
    sidebar.style.right = "-100%";
});
document.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.style.right = "-100%";
    }
});

let currentPage = 1;
const itemsPage = 8;
let allProducts = [];

const loader2 = document.querySelector('.loading')

console.log(loader2);


async function fetchCategory() {
    try {
        loader2.style.display = 'block';
        let categories = JSON.parse(localStorage.getItem('categories'));
        if (!categories) {
            const res = await fetch('https://fakestoreapi.com/products/categories');
            if (!res.ok) throw new Error('Network response was not ok');
            categories = await res.json();
            localStorage.setItem('categories', JSON.stringify(categories));
        }

        const categoryGrid = document.querySelector('#categoryGrid');
        categoryGrid.innerHTML = '';
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category__card');
            categoryCard.innerHTML = `
                <img src="${categoryImages[category]}" alt="${category}">
                <p>${category}</p>
            `;
            categoryGrid.appendChild(categoryCard);

            categoryCard.addEventListener('click', () => categoryProducts(category));
        });
    } catch (error) {
        console.error('Error fetching categories:', error.message || error);
        alert('Failed to load categories. Please try again later.');
    } finally {
        loader2.style.display = 'none';
    }
}

function displayProducts(products, page = 1) {
    const productsCard = document.querySelector('#productsCard');

    const startIndex = (page - 1) * itemsPage;
    const endIndex = page * itemsPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product__card');
        productCard.setAttribute('data-id', product.id);

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
                <img src="${product.image}" alt="${product.title}" class="product__image">
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
    loader.style.display = 'flex';
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const products = await res.json();
        allProducts = products;
        currentPage = 1;
        displayProducts(products, currentPage);

        handleSeeMore(products);
    } catch (error) {
        console.error('Error fetching products:', error.message || error);
        alert('Failed to load products. Please try again later.');
    } finally {
        loader.style.display = 'none';
    }
}

async function fetchAllProducts() {
    loader2.style.display = 'flex';
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Network response was not ok');
        const products = await res.json();
        allProducts = products;
        displayProducts(products, currentPage);

        handleSeeMore(products);
    } catch (error) {
        console.error('Error fetching all products:', error.message || error);
        alert('Failed to load all products. Please try again later.');
    } finally {
        loader2.style.display = 'none';
    }
}

function handleSeeMore(products) {
    let seeMoreButton = document.querySelector('.seeMore');
    if (!seeMoreButton) {
        seeMoreButton = document.createElement('button');
        seeMoreButton.textContent = 'See More';
        seeMoreButton.classList.add('seeMore');
        document.querySelector('.products').appendChild(seeMoreButton);
    }

    seeMoreButton.style.display = 'block';
    seeMoreButton.onclick = () => {
        currentPage++;
        displayProducts(products, currentPage);
        if (currentPage * itemsPage >= products.length) {
            seeMoreButton.style.display = 'none';
        }
    };
}

window.onload = function () {
    fetchCategory();
    fetchAllProducts();
};

document.querySelector("#productsCard").addEventListener("click", (event) => {
    if (event.target.classList.contains("product__image")) {
        let id = event.target.closest(".product__card").dataset.id;
        open(`/pages/product.html?q=${id}`, "_self");
    }
});
