async function fetchProducts() {
    try {
        const response = await fetch('https://course-api.com/react-store-products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = products.map(product => `
        <div>
            <h3>${product.name}</h3>
            <p>$${product.price / 100}</p>
            <p>${product.description}</p>
        </div>
    `).join('');
}

fetchProducts();

function handleError(error) {
    const container = document.getElementById('product-container');
    container.innerHTML = `<p>Error: ${error.message}. Try refreshing the page.</p>`;
}

function displayLoading() {
    const container = document.getElementById('product-container');
    container.innerHTML = '<p>Loading products...</p>';
}

let currentIndex = 0;
let products = [];

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