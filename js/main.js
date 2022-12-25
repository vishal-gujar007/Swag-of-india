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
const id= document.getElementsByClassName("toWishlist");
event.target.style.backgroundColor='orange';
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent);
//console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent);

 let product1 ={
    Image:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].src,
    name:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent,
    price:event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[2].children[0].children[1].textContent,
    quantity:1
 
    
}
addItemToLocal(product1)
}


function addItemToLocal(product1)
{
    
    let cartItem1 = JSON.parse(localStorage.getItem('prdInCart1'))
    if(cartItem1 === null)
    {
        productsW.push(product1)
        localStorage.setItem('prdInCart1',JSON.stringify(productsW))
        console.log(cartItem1);
    }
    else{
    
      cartItem1.forEach(item =>
          {
        if(product1.name == item.name){
            product1.quantity= item.quantity += 1;
        }else
        {
            productsW.push(item)
        }
    
      });
     
   productsW.push(product1)
    }    

    localStorage.setItem('prdInCart1',JSON.stringify(productsW))
    window.location.reload()
}
