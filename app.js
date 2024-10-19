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
                <img src="${categoryImages[category]}" alt="${category} image">
                <p>${category}</p>
            `;
            categoryGrid.appendChild(categoryCard);
            categoryCard.addEventListener('click', () => {
                categoryProducts(category);
            });
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories. Please try again later.');
    } finally {
        loader.style.display = 'none';
    }
}

function displayProducts(products, page = 1) {
    const productsCard = document.querySelector('#productsCard');
    productsCard.innerHTML = '';
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
    const loader = document.querySelector('.loading');
    loader.style.display = 'flex';
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await res.json();
        allProducts = products;
        currentPage = 1;
        displayProducts(products, currentPage);

        const seeMoreButton = document.querySelector('.seeMore') || document.createElement('button');
        seeMoreButton.textContent = 'See More';
        seeMoreButton.classList.add('seeMore');
        document.querySelector('.products').appendChild(seeMoreButton);
        seeMoreButton.style.display = 'block';

        seeMoreButton.onclick = () => {
            currentPage++;
            displayProducts(products, currentPage);
            if (currentPage * itemsPage >= products.length) {
                seeMoreButton.style.display = 'none';
            }
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Please try again later.');
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
        displayProducts(products, currentPage);

        const seeMoreButton = document.createElement('button');
        seeMoreButton.textContent = 'See More';
        seeMoreButton.classList.add('seeMore');
        document.querySelector('.products').appendChild(seeMoreButton);

        seeMoreButton.addEventListener('click', () => {
            currentPage++;
            displayProducts(allProducts, currentPage);
            if (currentPage * itemsPage >= allProducts.length) {
                seeMoreButton.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error fetching all products:', error);
        alert('Failed to load all products. Please try again later.');
    } finally {
        loader.style.display = 'none';
    }
}

window.onload = function () {
    fetchCategory();
    fetchAllProducts();
};

const productsCard = document.querySelector("#productsCard");
productsCard.addEventListener("click", (event) => {
    if (event.target.classList.contains("product__image")) {
        let id = event.target.closest(".product__card").dataset.id;
        open(`/pages/product.html?q=${id}`, "_self");
    }
});
