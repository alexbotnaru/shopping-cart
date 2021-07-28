const saveButton = document.querySelector('.save-btn');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const image = document.querySelector('#image');

let productsList = [];

if (localStorage.getItem('product')) {
    productsList = JSON.parse(localStorage.getItem('product'));
}

saveButton.addEventListener('click', function (){
    if (!(title.value || description.value || price.value)) return;
    let newProduct = {
        id: productsList.length + 1,
        title: title.value,
        description: description.value,
        price: price.value,
        image: image.value || 'no-image.jpg',
        inCart: 0
    };

    productsList.push(newProduct);
    localStorage.setItem('product', JSON.stringify(productsList));
    title.value = '';
    description.value = '';
    price.value = '';
    image.value = '';

    // let confirmation = document.createElement('p');
    // confirmation.innerText = 'Product created!';
    // confirmation.style.color = '#60e74d';
    // document.body.append(confirmation);
    //@fixme element disappears
    alert('Product created!');
});