// U72955273
let currentIndex = 0;
let products = [];

async function fetchProducts() {
    displayLoading();
    try {
        const response = await fetch('https://course-api.com/react-store-products');
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
        if (products.length > 0) {
            showProduct();
        } else {
            displayError(new Error("No products found"));
        }
    } catch (error) {
        displayError(error);
    }
}

function displayProducts() {
    showProduct();  // Shows the product at currentIndex
}

function displayLoading() {
    const container = document.getElementById('product-container');
    container.innerHTML = '<p>Loading products...</p>';
}

function displayError(error) {
    const container = document.getElementById('product-container');
    container.innerHTML = `<p>Error: ${error.message}. Please try again later.</p>`;
}

function showProduct() {
    const product = products[currentIndex];
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <div>
            <h3>${product.name}</h3>
            <p>$${product.price / 100}</p>
            <p>${product.description}</p>
        </div>
    `;
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % products.length;
    showProduct();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    showProduct();
});

fetchProducts();