const loadProducts = () => {
    fetch("https://fakestoreapi.com/products")
    .then((res)=> res.json())
    .then((json)=> displayProducts(json));
};

const displayProducts = (products) => {
    console.log(products);
};
loadProducts();