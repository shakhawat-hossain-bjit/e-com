const getDataFromDb = () => {
    const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || {};
    return shoppingCart;
}

function addToDb(id) {
    let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || {};
    if (shoppingCart[id]) {
        alert("This product is already in the cart");
    }
    else {
        shoppingCart[id] = 1;
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}


function removeFromDb(id) {
    let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
    if (shoppingCart[id]) {
        delete shoppingCart[id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}

let cart=[];
let products=[];

async function getProducts(){
    const response=await fetch(`https://dummyjson.com/products`);
    const jsonData=await response.json();
    products=jsonData.products.slice(0,10);
    showProduct();
    getCarts()
}


function showProduct(){
    const cardConatiner =document.getElementById('product-card-container');
    cardConatiner.innerHTML="";
    products.forEach(element => {
        const cardElement=document.createElement('div');
        cardElement.classList.add("card");
        cardElement.innerHTML=`
        <div class="img-container">
            <img src="${element?.thumbnail}" alt="" width="100%" height="100%">
        </div>
        <div class="card-text">
            <h2>
                ${element?.title}
            </h2>
            <p>
                ${element?.description}
            </p>
        </div>
        <div class="">
            <p>
            Price ${element?.price}
            </p>
            <p>
              Stock  ${element?.stock}
            </p>
        </div>
        <div style="text-align: center;">
            <button onclick="orderProduct(${element?.id})" class="order-button">
                Order Now
            </button>
            <button  onclick="addToCart(${element?.id})" class="add-to-cart-button">
                Add to Cart
            </button>
        </div>
        `;
        cardConatiner.appendChild(cardElement);
    });
}

function getCarts(){
    let db=getDataFromDb();
    // console.log("db ",db);
    // console.log("products ",products);
    cart=[];
    const productsIds=Object.keys(db);
    // console.log("productsIds ",productsIds)
    productsIds.forEach(id=>{
        products.forEach(x=>{
            if(x.id==id){
                // console.log(id,x);
                cart.push(x);
            }
        })
    })
    showCart();
}


function showCart(){
    const cardConatiner =document.getElementById('cart-card-container');
    cardConatiner.innerHTML="";
    cart.forEach(element => {
        const cardElement=document.createElement('div');
        cardElement.classList.add("card");
        cardElement.innerHTML=`
        <div class="img-container">
            <img src="${element?.thumbnail}" alt="" width="100%" height="100%">
        </div>
        <div class="card-text">
            <h2>
                ${element?.title}
            </h2>
            <p>
                ${element?.description}
            </p>
        </div>
        <div class="">
            <p>
               Price ${element?.price}
            </p>
            <p>
                Stock ${element?.stock}
            </p>
        </div>
        <div style="text-align: center;">
            <button onclick="orderProduct(${element?.id})" class="order-button">
                Order Now
            </button>
            <button  onclick="removeFromCart(${element?.id})" class="remove-from-cart-button ">
                Remove Cart
            </button>
        </div>
        `;
        cardConatiner.appendChild(cardElement);
    });
}


function addToCart(id){
    var index = cart.findIndex(x => x.id==id); 
    if(index===-1){
        addToDb(id);
        getCarts();
    }
    else{
        alert("This product is already in your cart")
    }
}

function removeFromCart(id){
    var index = cart.findIndex(x => x.id==id); 
    if(index===-1){
        alert("This product is already removed from your cart")
    }
    else{
        removeFromDb(id);
        cart=cart.filter(x=>x.id!=id)
    }
    showCart();
}


function orderProduct(id){
    let ans=confirm("Are you sure to order this product");
    // console.log(ans);
    if(false){
        return;
    }

    let updatedProducts=products.map(product=>{
        if(product.id===id)
            product.stock= product.stock-1;
        return product;
    });

    products=updatedProducts;
    showProduct();
    getCarts();
}


getProducts();
