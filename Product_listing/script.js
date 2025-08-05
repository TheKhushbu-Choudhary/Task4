document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: "Laptop", category: "electronics", price: 900, rating: 4.5 },
        { id: 2, name: "Smartphone", category: "electronics", price: 500, rating: 4.2 },
        { id: 3, name: "T-Shirt", category: "clothing", price: 20, rating: 4.0 },
        { id: 4, name: "Jeans", category: "clothing", price: 40, rating: 3.9 },
        { id: 5, name: "Novel", category: "books", price: 15, rating: 4.8 },
        { id: 6, name: "Textbook", category: "books", price: 50, rating: 4.7 },
    ];

    const categoryFilter = document.getElementById('categoryFilter');
    const sortCriteria = document.getElementById('sortCriteria');
    const productContainer = document.getElementById('productContainer');

    function renderProducts(filteredProducts) {
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-image">Image</div>
                <div class="product-title">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
                    <span class="rating-value">(${product.rating})</span>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function filterAndSortProducts() {
        let filteredProducts = [...products];
        const categoryValue = categoryFilter.value;
        const sortValue = sortCriteria.value;

        if (categoryValue !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
        }

        if (sortValue === 'priceLowHigh') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'priceHighLow') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'ratingHighLow') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(filteredProducts);
    }

    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortCriteria.addEventListener('change', filterAndSortProducts);

    renderProducts(products);
});

