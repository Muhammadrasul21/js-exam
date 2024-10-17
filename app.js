const categoryImages = {
    electronics: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    jewelry: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UL640_QL65_ML3_.jpg', // "jewelery" emas, "jewelry" to'g'ri yozilishi
    "men's clothing": 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    "women's clothing": 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'
};

fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        const categoryGrid = document.getElementById('categoryGrid');

        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.classList.add('category-card');

            const imageSrc = categoryImages[category] || 'https://via.placeholder.com/150';

            categoryCard.innerHTML = `
                <img src="${imageSrc}" alt="${category}">
                <p>${category}</p>
            `;
            categoryGrid.appendChild(categoryCard);
        });
    });
