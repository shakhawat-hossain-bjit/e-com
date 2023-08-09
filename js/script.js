let cart=[];
let products=[];

async function getProducts(){
    const response=await fetch(`https://dummyjson.com/products`);
    const jsonData=await response.json();
    // console.log(jsonData.products);
    products=jsonData.products.slice(0,10);
    showProduct();
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

function showCart(){
    console.log("cart ",cart)
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
    // console.log("Add to catrt ",id);
    var index = cart.findIndex(x => x.id==id); 
    let filteredProduct=products.find(product=>product.id===id);
    if(index===-1){
        cart.push(filteredProduct);
    }
    else{
        alert("This product is already in your cart")
    }
    showCart();
}

function removeFromCart(id){
    var index = cart.findIndex(x => x.id==id); 
    if(index===-1){
        alert("This product is already removed from your cart")
    }
    else{
        let filteredProduct=cart.filter(product=>product.id!==id);
        cart=filteredProduct;
    }
    showCart();
}


function orderProduct(id){

    let updatedProducts=products.map(product=>{
        if(product.id===id)
            product.stock= product.stock-1;
        return product;
    });

    let updatedCart=cart.map(product=>{
        // if(product.id===id)
        //     product.stock= product.stock-1;
        return product;
    });

    console.log("updated products ", updatedProducts)

    products=updatedProducts;
    cart=updatedCart;
    showProduct();
    showCart();
    
}


getProducts();

