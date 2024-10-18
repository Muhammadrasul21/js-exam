const categoryImages = {
    electronics: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    jewelry: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', "men's clothing": 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    "women's clothing": 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
};

fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        localStorage.setItem(`categories`, JSON.stringify(categories))

        const categoryGrid = document.querySelector('#categoryGrid');
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category__card');

            const imageSrc = categoryImages[category] || 'https://via.placeholder.com/150';

            categoryCard.innerHTML = `
                <img src="${imageSrc}" alt="${category}">
                <p>${category}</p>
            `;
            categoryGrid.appendChild(categoryCard);
        });
    });

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        const productsCard = document.querySelector('#productsCard');

        products.forEach(product => {
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
                <img src="${product.image}" alt="${product.title}" class="product__image">
                <div class="product__details">
                    <h3 class="product__title">${product.title}</h3>
                <div class = "card__rating">
                    <p class="product__price">$${product.price}</p>
                    <div class="product__stars">${ratingStars}</div>
                    <p class="product__rating">(${product.rating.count})</p>  
                </div>
                    <button class="product__btn">Add to Cart</button>
                </div>
            `;
            productsCard.appendChild(productCard);
        });
    });
