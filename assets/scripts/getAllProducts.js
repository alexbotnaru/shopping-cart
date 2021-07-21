const productCard = document.querySelector('.product-card');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

if (localStorage.getItem('product')) {
    productsList = JSON.parse(localStorage.getItem('product'));
    displayProducts();
}

function displayProducts() {
    let displayProduct = '';

    productsList.forEach((item, i) => {
        if (i % 4 === 0) {
            displayProduct += `<div class="row">`;
        }

        displayProduct +=
            `
            <div class="card col-md-4 col-6 col-lg-3 mt-4 col">
                <img src="assets/img/${item.image}" class="card-img-top" alt="${item.image}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}<br> ${item.price}$</p>
                    <a href="#" class="btn btn-primary">More details</a> <span> <a href="#" class="btn btn-danger btn-sm add-cart">Add to cart</a></span>
                </div>
            </div>
       ` ;

        if (i % 4 === 3) {
            displayProduct += `</div>`
        }

        productCard.innerHTML = displayProduct;

    });

}
