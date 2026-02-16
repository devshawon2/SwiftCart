// Call Categories
const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json));
};

// Call Products
const loadProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => displayProducts(json));
};


// click functionality for Categories
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("category-btn")) {
        const category = event.target.dataset.category;
        loadCategoryProduct(category);
    }
    // active buttons + disable buttons
    const btn = event.target.closest(".category-btn");
    if (btn) {
        const allButtons = document.querySelectorAll(".category-btn");
        allButtons.forEach(button => {
            button.classList.remove("bg-primary", "text-base-100");
        });
        btn.classList.add("bg-primary", "text-base-100");
    }
});

// categorizing products in groups
loadCategoryProduct = (category) => {
    const categoryWiseProductUrl = `https://fakestoreapi.com/products/category/${category}`;
    fetch(categoryWiseProductUrl)
        .then((res) => res.json())
        .then((data) => displayCategoryProduct(data));
}
// display category wise products
displayCategoryProduct = (data) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ``;
    const spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("border", "border-indigo-700");
}
// get and show Categories
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button data-category="${category}" class="category-btn btn border border-gray-600 p-4 rounded-full hover:bg-primary hover:text-base-100 mx-2">
                ${category}
            </button>
        `
        categoriesContainer.append(btnDiv);
    }

};

// get and display Products
const displayProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ``;
    for (let product of products) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add('card', 'bg-base-100', 'w-auto', 'shadow-md', 'flex', 'flex-col', 'h-full');
        cardDiv.innerHTML = `
            <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <div class="gender-rating flex justify-between items-center">
                        <div class="clothing-gender">
                            <p class="gender text-primary open-sans-bold text-sm">${product.category}</p>
                        </div>
                        <div class="user-ratings flex items-center">
                            <i class="fa-solid text-yellow-400 fa-star"></i>
                            <p class="rating px-1"> ${product.rating.rate}</p>
                            <p class="total-ratings"> (${product.rating.count})</p>
                        </div>
                    </div>
                    <div class="flex flex-col h-[77px] relative">
                    <h2 class="card-title product-name text-md line-clamp-2">${product.title}</h2>
                    <p class="product-price open-sans-bold text-md absolute bottom-0 left-0">
                        $<span>${product.price}</span>
                    </p>
                    </div>
                    <div class="card-actions justify-evenly mt-auto">
                        <button class="rounded-md px-12 btn btn-base text-gray-600"><i
                                class="fa-regular fa-eye"></i>Details</button>
                        <button class="rounded-md px-12 btn btn-primary"><i
                                class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
        `
        productsContainer.append(cardDiv);

    }
}

loadCategories();
loadProducts();