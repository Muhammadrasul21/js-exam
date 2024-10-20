const content = document.querySelector(".content");
const review = document.querySelector(".review");
const loader = document.querySelector(".loading");
const BASE_URL = "https://fakestoreapi.com/products";

async function getData() {
    loader.style.display = 'flex';
    try {
        const response = await fetch(`${BASE_URL}`);
        const products = await response.json();
        if (products.length > 0) {
            createContent(products);
        } else {
            content.innerHTML = '<p>No products available.</p>';
        }
    } catch (err) {
        console.log('Error fetching data:', err);
    } finally {
        loader.style.display = 'none';
    }
}

function createContent(products) {
    content.innerHTML = products.map(data => `
        <div>
            <img src="${data.image}" class="content__image main__image" alt="${data.title}">
            <h1>${data.title}</h1>
            <h2>$${data.price}</h2>
            <p>${data.description}</p>
            <button>Buy now</button>
            <hr>
            <div class="color">
                <p>Colours:</p>
            </div>
            <div class="size">
                <p>Size:</p>
                <button>XS</button>
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
            </div>
            <div class="bynow">
                <div class="bynow__count">
                    <button>-</button>
                    <button>2</button>
                    <button>+</button>
                </div>
                <button class="seeMore">Buy now</button>
                <button><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="free">
                <div class="free_delivery">
                    <p>Free Delivery <br>
                        Enter your postal code for Delivery Availability</p>
                </div>
                <div class="free__return">
                    <p>Return Delivery <br> Free 30 Days Delivery Returns. Details</p>
                </div>
            </div>
        </div>
    `).join('');
    review.innerHTML = '<p>No reviews available.</p>';
}

window.onload = getData;
