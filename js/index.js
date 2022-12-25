let contacts = new Map()
contacts.set('india', '+91888888888')
contacts.set('usa', '+188888888')
contacts.set('canada', '+1999999999')
contacts.set('uae', '+97188888888')



document.getElementById("select1").addEventListener('change', () => {
    let country = document.getElementById('select1').value;
    document.getElementById('contact').innerHTML = contacts.get(country);
    document.getElementById('flag').src = `images/${country}.png`;
})

document.getElementById("scrollUp").classList.add("hide");
getYPosition = () => {
    var top = window.pageYOffset || document.documentElement.scrollTop
    return top;
};


document.addEventListener('scroll', () => {
    var scroll = getYPosition();
    var arrow = document.getElementById('scrollUp');
    scrolled = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    if (scroll < 250) {
        document.getElementById("header-sticky").classList.remove("sticky-bar");
    } else {
        document.getElementById("header-sticky").classList.add("sticky-bar");
    }
    
    if (scroll > 1200) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
        arrow.addEventListener('click', scrolled);
    } else {
        document.getElementById('scrollUp').classList.remove("show");
        document.getElementById('scrollUp').classList.add("hide");
        document.getElementById("scrollUp").removeEventListener("click", scrolled);
    }
})

// get products data
let productsListUrl = 'https://my-json-server.typicode.com/swagofindia/products/db';
var productsList;
let htmlToReturn = "",
    reviews = "",
    lowStar = 0,
    i = 0.
    isNew='';
async function loadProducts(productsListUrl) { // (1)
    // let response = await fetch(productsListUrl); // (2)

    // if (response.status == 200) {
    //   let json = await response.json(); // (3)
    //   return json;
    // }

    fetch('https://my-json-server.typicode.com/swagofindia/products/db')
        .then(response => response.json())
        .then(json => {
            productsList = json;
            productsList.Products.forEach((product) => {
                htmlToReturn = '<div class="col-xl-4 col-lg-4 col-md-6">' +
                    '<div class="single-product" id="product' + product.id + '">' +
                    '<div class="product-img">' +
                    '       <img src="images/product' + product.id + '.png" alt="">';
                    isNew='       <div class="new-product">' +
                    '           <span>New</span>' +
                    '       </div>'
                    if(product.isNew=='TRUE')
                    htmlToReturn+=isNew;
                    isNew="";
                    htmlToReturn+='       <div class="product-hover">' +
                    '            <div class="container">' +
                    '                <div class="row">' +
                    '                    <div class="col-4">' +
                    '                        <a href=""class="toCart" onclick="add()"><img src="images/cart.png" alt=""></a>' +
                    '                    </div>' +
                    '                    <div class="col-4">' +
                    '                        <a href=""><img src="images/view.png" alt=""></a>' +
                    '                    </div>' +
                    '                    <div class="col-4">' +
                    '                        <a href=""class="toWishlist" onclick="addtoWishlist()"><img src="images/wishlist.png" alt=""></a>' +
                    '                    </div>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="product-caption">' +
                    '        <div class="product-rating">';
                lowStar = 6 - product.ratings;
                if(product.ratings==5)
                lowStar=0;
                for (i = 1; i <= product.ratings; i++) {
                    reviews += '<i class="far fa-star"></i>';
                }
                for (i = 1; i <= lowStar; i++) {
                    reviews += '<i class="far fa-star low-star"></i>';
                }
                lowStar=0;
                htmlToReturn += reviews + product.ratings + '/5';
                reviews = "";
                htmlToReturn += '        </div>' +
                    '      <div class="product"><h4><a href="#">'+ product.name + '</a></h4></div>' +
                    '        <div class="price">' +
                    '            <ul>' +
                    '                <li>' + product.priceAfterDiscount + '</li>' +
                    '                <li class="discount">'+product.price+'</li>'+
                    '            </ul>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>' +
                    '</div>';
                document.querySelector('#productsListArea').innerHTML += htmlToReturn;
            });

            //on hover of any product code
            document.querySelectorAll('.product-hover').forEach(product1 => {
                product1.classList.add('hide');
            })

            document.querySelectorAll('div[id^="product"]').forEach(product1 => {
                product1.addEventListener('mouseover', event => {
                    product1.querySelector('.product-img').classList.add('blur');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('hide');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.add('show');
                })
                product1.addEventListener('mouseout', event => {
                    product1.querySelector('.product-img').classList.remove('blur');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.add('hide');
                    product1.querySelector('.product-img').querySelector('.product-hover').classList.remove('show');
                })
            });

        })
}

loadProducts(productsListUrl);
const productsW=[]
function addtoWishlist()
{
const id1= document.getElementsByClassName("toWishlist");
event.target.style.backgroundColor='orange';
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent);

 let product2={
    Image:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src,
    name:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent,
    price:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent,
    quantity:1
 
    
}
addItemToLocal2(product2)
}


function addItemToLocal2(product2)
{
    
    let cartItem1 = JSON.parse(localStorage.getItem('prdInCart1'))
    if(cartItem1 === null)
    {
        productsW.push(product2)
        localStorage.setItem('prdInCart1',JSON.stringify(productsW))
        console.log(cartItem1);
    }
    else{
    
      cartItem1.forEach(item =>
          {
        if(product2.name == item.name){
            product2.quantity= item.quantity += 1;
        }else
        {
            productsW.push(item)
        }
    
      });
     
   productsW.push(product2)
    }    

    localStorage.setItem('prdInCart1',JSON.stringify(productsW))
    window.location.reload()
}



const products=[]
function add()
{
const id= document.getElementsByClassName("toCart");
event.target.style.backgroundColor='orange';
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent);

 let product ={
    Image:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src,
    name:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent,
    price:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent,
    quantity:1
 
    
}
addItemToLocal(product)
}


function addItemToLocal(product)
{
    
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    if(cartItem === null)
    {
        products.push(product)
        localStorage.setItem('prdInCart',JSON.stringify(products))
        console.log(cartItem);
    }
    else{
    
      cartItem.forEach(item =>
          {
        if(product.name == item.name){
            product.quantity= item.quantity += 1;
        }else
        {
            products.push(item)
        }
    
      });
     
   products.push(product)
    }    

    localStorage.setItem('prdInCart',JSON.stringify(products))
    window.location.reload()
}

cartNumberDisplay()

function cartNumberDisplay()
{
    let cartNumbers=0;
    let cartItem=JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item=>{
cartNumbers=item.quantity+cartNumbers;
    });
console.log(cartNumbers);
document.querySelector('nav span').textContent=cartNumbers;

}



function cartNumberDisplayW()
{
    let cartNumbers1=0;
    let cartItem1=JSON.parse(localStorage.getItem('prdInCart1'))
    cartItem1.forEach(item=>{
cartNumbers1=item.quantity+cartNumbers1;
    });
console.log(cartNumbers1);
document.querySelector('nav span1').textContent=cartNumbers1;

}


cartNumberDisplayW()


function displayCartItem()
{
    let html='';
    
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach( item => {
       
           html +=  `
           <div class="cart-list">
           
<div class="container">
          
  
        <div class="row">
        <div class="col-xl-8">
           
            <div class="card">
                <div class="row">

                    <div class="col-xl-4"><br>
                        <div class="card">
                       
                         <img src="${item.Image}">
                           </div>

                    </div>
                    <div class="col-xl-12">
                             
                            <div class="prod-name">${item.name}</div>

                            <div class="prod-price">${item.price}</div><br>
                            <div class="row">
                            <div class="col-xl-6">
                            <div class="input-group">
                                            
                                            <select class="form-select"aria-label="">
                                                <option selected>Size:One Size</option>
                                               
                                            </select>
                                        </div>
                            </div>
                            <div class="col-xl-6">
                            QUANTITY:${item.quantity}
                            <div class="input-group">
                                          
                             </div>
                            <div class="total"><br>
                            Total Price:${item.price*item.quantity}</div>                                                    

                      
                            
                            
                            <br>
                            <br>


                           <div class="removeItem"><button>REMOVE</button></div>

                           

                            </div><br>
                            </div>
                    </div>
                
                
                
              
            
                  <br><br>
                   
                 </div>
            
        </div>
        </div>
        
       
    
           </div>
<br><br><br>
</div>  
  `
                
           document.querySelector('.carddisp').innerHTML= html;
           
        });
    
        
    }

    displayCartItem()

    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    var total=0;
            
            cartItem.forEach(item =>{
                console.log(total);
             total=total+item.price*item.quantity;
            
             });
            
            console.log(total);   
           
        
       document.querySelector('.carddisplay2') .innerHTML=` 
       <div class="card">
       <ul class="list-group list-group-flush">
           <li class="list-group-item"> <img src="images/Coupons.png"><br>
               Apply coupons</li>
           <li class="list-group-item"><b>PRICE DETAILS</b><br>
           Price Details<br>
           Bag Discount<br>
           Coupon Discount<br>
           Order Total <br>
           Delivery Charges <br>
    
           </li>
           <li class="list-group-item"><br>
           <div class="Final-Total">Total:Rs.${total}</div>
           </div>
           <a href="checkout.html"><button>PLACE ORDER</button></a>
    
           </li>
           </ul>
      </div>
      
       `
     
           
const removeItem=document.getElementsByClassName('removeItem')
for(var j= 0;j<removeItem.length;j++)
{
  
    let removeBtn=removeItem[j]
    removeBtn.addEventListener('click',() =>{
        
        cartItem.forEach(item =>{
            console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent);

            

          if(item.name != event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].children[0].textContent)
         {
         
          products.push(item)

        }
     
      

        });
        
        localStorage.setItem('prdInCart',JSON.stringify(products))
        window.location.reload()
    

       
    }
    
    );

}

