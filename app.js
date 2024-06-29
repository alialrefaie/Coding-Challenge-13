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