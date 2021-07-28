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
// show cart items in modal winodw
const cartBtn = document.querySelector('.cart');
cartBtn.addEventListener('click', function(){
    displayCart();
})


function displayCart(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let totalCost = parseInt(localStorage.getItem('totalCost'));

    const productsContainer = document.querySelector('.products-container');
    if (!cartItems){
        productsContainer.innerHTML = '<h5> Your cart is empty!</h5>';
    } else {

    productsContainer.innerHTML = `
        <table class='cart-table table'>
        <thead>
        <tr>
            <th class='w-5-pct bg-dark text-white' style="text-align: center; width: 20%;">Image</th>
            <th class='w-5-pct bg-dark text-white' style="text-align: center">Product</th>
            <th class='w-5-pct bg-dark text-white' style="text-align: center">Price</th>
            <th class='w-5-pct bg-dark text-white' style="text-align: center">Amount</th>
            <th class='w-5-pct bg-dark text-white' style="text-align: center">Total</th>
            <th class='w-5-pct bg-dark text-white' style="text-align: center">Action</th>
         </tr>
         </thead>
        `;

        
        Object.values(cartItems).map(item => {
            let totalItemCost = item.price * item.inCart;
            
            let itemRow = document.createElement('tr');

            const cartTable = document.querySelector('.cart-table');
            
            let itemImg = document.createElement('img');
            itemImg.src = `assets/img/${item.image}`
            itemImg.style = "width: 100%;"

            let titleTD = document.createElement('td');
            titleTD.innerText = item.title

            let priceTD = document.createElement('td');
            priceTD.innerText = item.price + '$';

            let amountTD = document.createElement('td');
            amountTD.innerHTML = `<i class="bi bi-arrow-down"></i> ${item.inCart} <i class="bi bi-arrow-up"></i>`;

            let totalTD = document.createElement('td');
            totalTD.innerText = totalItemCost + '$';

            let deleteButtonTD = document.createElement('td');
            
            
            let deleteIcon = document.createElement('i');
            deleteIcon.classList.add("bi");
            deleteIcon.classList.add("bi-trash");
            deleteIcon.dataset.productId = item.id;

            deleteButtonTD.append(deleteIcon);
            
            
            itemRow.append(itemImg, titleTD, priceTD, amountTD, totalTD, deleteButtonTD);
            cartTable.append(itemRow);

        })
     
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.innerHTML = `<h4>Summary: <b>${totalCost}$</b></h4>`
    }
}

/*
const deleteItemButtons = document.querySelectorAll('.bi-trash');
for (const button of deleteItemButtons) {
    button.addEventListener('click', removeItemFromCart(deleteItemButtons.dataset));
    
}*/
//not working
const productsContainer = document.querySelector('.products-container');

productsContainer.addEventListener('click', (e) => {
    if (e.target.matches('[data-product-id]')){
        removeItemFromCart(e.target.dataset.productId);
        displayCart();
    }
})
/*
const removeItemFromCart = (removeId) => {
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
   // const cartItemsArr = Object.values;
    console.log(typeof(cartItems));
    //console.log( cartItems['removeId']);
    //console.log(typeof(removeId));
    const map = objectToMap(cartItems);
    map.forEach((value, key, map) => {
        // Prints "greeting Hello" followed by "name John"
        if (key == removeId) {
            map.delete['key'];
            
        }
      }); 

  console.log(map);
  /*
   // const newCartItems = cartItemsArr.map(item => item.id !== removeId );
   // localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    //console.log(cartItems);
    //const cartItemsArr = Object.entries(cartItems);
    //const newCartItems = cartItemsArr.filter(item => item.id !== id);
     //console.log(Object.values(cartItems));
    /*const newCartItems = Object.values(cartItems).map(item => {
    
        if(item.id === removeId) {
            item = undefined;
        }
    });*/




    //delete localStorage.productsInCart
    
}
/*
function removeItemFromCart(id){
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    const newCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('productsInCart', JSON.stringify(newCartItems));


}*/

//clear cart
clearCartBtn = document.querySelector('.clear-cart');
clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('cartNumbers');
    localStorage.removeItem('totalCost');
    
//@fixme remove summary, change cart items number 
    displayCart();
});

const objectToMap = obj => {
    const keys = Object.keys(obj);
    const map = new Map();
    for(let i = 0; i < keys.length; i++){
       //inserting new key value pair inside map
       map.set(keys[i], obj[keys[i]]);
    };
    return map;
 };