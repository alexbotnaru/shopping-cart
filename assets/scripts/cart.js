let addCart = document.querySelectorAll('.add-cart');

let productsList = [];

if (localStorage.getItem('product')) {
    productsList = JSON.parse(localStorage.getItem('product'));
}
//show the number of items in cart
for (let i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener('click', () => {
        cartNumbers(productsList[i]);
        totalCost(productsList[i]);
    })
}

function onLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart);

    if(productsInCart != null){

        if(productsInCart[product.id] == undefined){
            productsInCart = {
                ...productsInCart,
                [product.id]: product
            }
        }
        productsInCart[product.id].inCart += 1;

    } else {
        product.inCart = 1;
        productsInCart = {
            [product.id]: product
        }
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
}

function totalCost(product){
    let totalCost = localStorage.getItem('totalCost');
    
    if(totalCost){
        
        localStorage.setItem('totalCost', +totalCost + +product.price);

    } else{
        localStorage.setItem('totalCost', +product.price);
    }
}

onLoadCartNumber();
////////////////////////////////////////


