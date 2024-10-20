const content = document.querySelector(".content");
const review = document.querySelector(".review");
const loader = document.querySelector(".loading");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('q')

const BASE_URL = `https://fakestoreapi.com/products/${id}`;


async function getData() {
    loader.style.display = 'flex';
    try {
        const response = await fetch(`${BASE_URL}`);
        const product = await response.json();
        console.log(product);
        createContent(product)
    } catch (err) {
        console.log('Error fetching data:', err);
    } finally {
        loader.style.display = 'none';
    }
}

function createContent(product) {
    content.innerHTML = `
    
<div class="container">
 <div class="content">

    <img src="${product.image}" class="content__image main__image">

    <div class="content__info">
        <h1>${product.title}</h1>
        <h2>$${product.price}</h2>
        <p>${product.description}</p>
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
</div>
</div>
       `
}

window.onload = getData;
