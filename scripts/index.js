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

// Function for Top Rated Products
const topRatedProducts = () => {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
            const topProductSorted = json.sort((a, b) => a.rating.rate - b.rating.rate);
            const top3Products = topProductSorted.slice(0, 3);

            // top Product Container
            let topProductsContainer = document.getElementById('trending-products');
            topProductsContainer.innerHTML = ``;
            top3Products.forEach(product => {
                const topProductCard = document.createElement('div');
                topProductCard.classList.add('card', 'bg-base-100', 'w-92', 'shadow-sm', 'border', 'border-indigo-400', 'py-4');
                topProductCard.innerHTML = `
                <figure>
                    <img class="w-full h-48 object-contain" src="${product.image}" alt="Shoes" />
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
                    <br>
                    <p class="product-price open-sans-bold text-lg absolute bottom-0 left-0">
                        $<span>${product.price}</span>
                    </p>
                    </div>
                    <div class="card-actions justify-around mt-auto">
                        <button onclick="openDetails(${product.id})" class="rounded-md px-12 btn btn-base text-gray-600"><i
                                class="fa-regular fa-eye"></i>Details</button>
                        <button class="rounded-md px-12 btn btn-primary"><i
                                class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
            `
                topProductsContainer.append(topProductCard);
            });
        })
}

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

        const category = btn.dataset.category;
        if (category === "all") {
            loadProducts();
        } else {
            loadCategoryProduct(category);
        }
    }
});

// Click Functionality for Details Buttons
const openDetails = async (id) => {
    const modalVisibility = document.getElementById('details-modal');
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();

    const modalContentContainer = document.getElementById('modal-content');

    modalContentContainer.innerHTML = `
        <figure class="bg-gray-100 p-10 flex justify-center">
            <img src="${data.image}" class="max-h-60 object-contain" />
        </figure>
        <div class="p-2">
            <h3 class="font-bold text-2xl mb-2">${data.title}</h3>
            <div class="badge badge-primary mb-4 p-3 open-sans-semibold my-1">${data.category}</div>
            <p class="text-gray-600 mb-4">${data.description}</p>
            <div class="flex justify-between items-center">
                <p class="text-3xl font-bold text-primary">$${data.price}</p>
                <div class="flex items-center gap-1">
                    <span class="text-yellow-500 text-xl">★</span>
                    <span class="font-bold">${data.rating.rate}</span>
                    <span class="text-gray-400">(${data.rating.count})</span>
                </div>
            </div>
            
                <div class="flex justify-center w-full my-4">
                    <button class="rounded-md px-12 btn btn-primary hover:bg-base-100 hover:text-gray-900">Add to Cart</button>
                </div>
            
                <div class="text-center my-2">
                    <p class="py-4 open-sans-medium">Press ESC key or click the button below to close</p>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn border border-indigo-700 hover:bg-primary hover:text-base-100">Close</button>
                    </form>
                </div>
        </div>
    `
    modalVisibility.showModal();

}

// categorizing products in groups
loadCategoryProduct = async (category) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center min-h-[400px]">
            <span class="loading loading-infinity loading-xl w-20 text-primary"></span>
        </div>
    `;
    try {

        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();

        displayCategoryProduct(data);
    } catch (error) {
        console.error("Error fetching the data:", error);
        productsContainer.innerHTML = `<h1 class="col-span-full text-center text-4xl text-error montserrat-extrabold my-100">Failed to load products :(</h1>`
    }
};
// display category wise products
displayCategoryProduct = (data) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ``;
    for (let product of data) {
        const specificCards = document.createElement("div");
        specificCards.classList.add('card', 'bg-base-100', 'w-auto', 'shadow-xl', 'flex', 'flex-wrap', 'pt-2', 'border', 'border-primary', 'h-sm');
        specificCards.innerHTML = `
        <figure>
                    <img class="w-full h-48 object-contain" src="${product.image}" alt="Shoes" />
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
                    <br>
                    <p class="product-price open-sans-bold text-lg absolute bottom-0 left-0">
                        $<span>${product.price}</span>
                    </p>
                    </div>
                    <div class="card-actions justify-around mt-auto">
                        <button onclick=openDetails(${product.id}) class="rounded-md px-12 btn btn-base text-gray-600"><i
                                class="fa-regular fa-eye"></i>Details</button>
                        <button class="rounded-md px-12 btn btn-primary"><i
                                class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
        `
        productsContainer.append(specificCards);
    };

}
// get and show Categories
const displayCategories = (categories) => {
    let categoriesContainer = document.getElementById("categories-container");
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

// get and display all Products
const displayProducts = (products) => {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ``;
    for (let product of products) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add('card', 'bg-base-100', 'w-auto', 'shadow-xl', 'flex', 'flex-col', 'h-full', 'pt-2', 'border', 'border-primary');
        cardDiv.innerHTML = `
            <figure>
                    <img class="w-full h-48 object-contain" src="${product.image}" alt="Shoes" />
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
                        <button onclick="openDetails(${product.id})" class="rounded-md px-12 btn btn-base text-gray-600"><i
                                class="fa-regular fa-eye"></i>Details</button>
                        <button class="rounded-md px-12 btn btn-primary"><i
                                class="fa-solid fa-cart-shopping"></i>Add</button>
                    </div>
                </div>
        `
        productsContainer.append(cardDiv);
    }
}




// Call Global Functions
topRatedProducts();
loadCategories();
loadProducts();