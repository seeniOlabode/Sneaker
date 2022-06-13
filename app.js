

// ALL DOM VARIABLES

const openMenuButton = document.getElementById('open-menu');
const navigationContainer = document.getElementById('nav-container');
const navigationContentContainer = document.getElementById('nav-content-holder');
const openMenuButtonImage = document.getElementById('open-menu-image');


const slideShowBox = document.getElementById('product-photo-display');
const slideShowImage = document.getElementById('slideshow-image');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const slideCloseButton = document.getElementById('slide-close-button');

const quantityBox = document.getElementById('quantity-number');

const cartHolder = document.getElementById('cart-holder');
const cartButton = document.getElementById('cart-header-button');
const cartProducts = document.getElementById('full-cart');

const cartProductImage = document.getElementById('cart-product-image');
const cartProductName = document.getElementById('cart-product-name');
const cartPrice = document.getElementById('cart-price');
const cartProductPrice = document.getElementById('cart-product-price');
const cartProductQuantity = document.getElementById('cart-product-quantity');
const cartProductTotal = document.getElementById('cart-product-total');
const emptyCartText = document.getElementById('empty-cart-text');

const headerCartNumber = document.getElementById('cart-icon-number');

const cartDeleteButton = document.getElementById('cart-delete-button');

const thumbNailContainer = document.getElementById('thumbnail-display');

const firstThumb = document.getElementById('first-thumb');
const secondThumb = document.getElementById('second-thumb');
const thirdThumb = document.getElementById('third-thumb');
const fourthThumb = document.getElementById('fourth-thumb');

const thumbElementList = [ firstThumb , secondThumb , thirdThumb , fourthThumb ];

const ProductsList = [];

const ThumbnailList = [];

const removeHighlight = () => {
    thumbElementList.forEach(thumb => {
        thumb.classList.remove('active');
    });
}

class Thumbnail {
    constructor (url , thumb , thisIndex) {
        this.url = url;
        this.thumb = thumb;
        this.index = thisIndex;
        ThumbnailList.push(this);
    }

    display () {
        // slideShowImage.setAttribute( 'src' , this.url );
        slideShowImage.setAttribute( 'src' , ProductsList[0].productPhotos[slideClosure('thumbnail' , this.index)] )
        removeHighlight();
        this.thumb.classList.add('active');
    }


}

const firstPhoto = new Thumbnail('images/image-product-1.jpg' , firstThumb , 0 );
const secondPhoto = new Thumbnail('images/image-product-2.jpg' , secondThumb , 1 );
const thirdPhoto = new Thumbnail('images/image-product-3.jpg' , thirdThumb , 2 );
const fourthPhoto = new Thumbnail('images/image-product-4.jpg' , fourthThumb , 3 );





class Product {
    constructor ( name , price , description , companyName , newPrice , photo1Url , photo2Url , photo3Url , photo4Url , thumbnail1 , thumbnail2 , thumbnail3 , thumbnail4 ) {
        this.name = name;
        this.price = price;
        this.quantity = 0;
        this.description = description;
        this.companyName = companyName;
        this.productPhotos = [ photo1Url , photo2Url , photo3Url , photo4Url ];
        this.productThumbnails = [ thumbnail1 , thumbnail2 , thumbnail3 , thumbnail4 ]
        this.newPrice = newPrice;
        ProductsList.push(this);
    }

    increment() {
        this.quantity++;
    }

    decrement() {
        if ( this.quantity > 0 ) {
            this.quantity--;
        }
    }

    total() {
        return this.newPrice ? this.newPrice * this.quantity : this.price * this.quantity;
    };
}

const Shoes = new Product( 'Fall Limited Edition Sneakers' ,
                             250 ,
                            "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer." ,
                            'Sneaker Company',
                            125,
                            'images/image-product-1.jpg',
                            'images/image-product-2.jpg',
                            'images/image-product-3.jpg',
                            'images/image-product-4.jpg',
                            firstPhoto,
                            secondPhoto,
                            thirdPhoto,
                            fourthPhoto,
                            )

// MENU-MOBILE 

const closeMenuOnClick = (event) => {
    if ( event.target === navigationContainer ) {
        closeMenu();
    }
}



const openMenu = () => {
    navigationContainer.classList.remove('nav-collapsed');
    navigationContainer.classList.add('nav-displayed');
    window.addEventListener( 'click' , closeMenuOnClick )
}

const closeMenu = () => {
    navigationContainer.classList.remove('nav-displayed');
    navigationContainer.classList.add('nav-collapsed');
}


// MOBILE SLIDESHOW 

const closure1 = () => {
    let currentIndex = 0;
    return (direction , optionalIndex) => {
        if ( direction ) {
            let output;
            if ( direction == 'next' ) {
                if ( currentIndex >= 3 ) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                output = currentIndex
            } else if ( direction == 'previous' ) {
                if ( currentIndex <= 0 ) {
                 currentIndex = 3;
                } else {
                currentIndex--;
                }
                output = currentIndex;
            } else if (direction === 'thumbnail') {
                currentIndex = optionalIndex;
                output = currentIndex;
            }
            return output;
        }
        return 'Please provide direction';
    }
}

slideClosure = closure1();

const displayNextImage = () => {
    ProductsList[0].productThumbnails[slideClosure('next')].display();  
}

const displayPreviousImage = () => {
    ProductsList[0].productThumbnails[slideClosure('previous')].display()
}

// QUANTITY INTERACTIONS 

const closure2 = () => {
    let quantity = 0;
    return ( direction ) => {
        if ( direction === 'increment' ) {
            quantity++;
            return quantity;
        } else if ( direction === 'decrement' ) {
            if ( !(quantity <= 0) ) {
                quantity--;
                return quantity;
            } else {
                return quantity;
            }
        }
    }
}

quantityClosure = closure2()

const increaseQuantity = (product) => {
   quantityBox.textContent = quantityClosure('increment');
   product.increment();

};

const decreaseQuantity = (product) => {
    quantityBox.textContent = quantityClosure('decrement');
    product.decrement();
}


// MOBILE CART 

const openCart = () => {
    cartHolder.classList.remove('cart-collapsed');
    cartHolder.classList.add('cart-displayed');
    cartButton.setAttribute('onclick' , 'closeCart()');
}

const closeCart = () => {
    cartHolder.classList.remove('cart-displayed');
    cartHolder.classList.add('cart-collapsed');
    cartButton.setAttribute('onclick' , 'openCart()');
}

// Add to cart

closure3 = () => {
    let canRun = true; 
    return (reset) => {
        let output = canRun;
        canRun = false;
        if (reset == 'reset') {
            canRun = true;
        }
        return output;
    }
}

addToCartOnce = closure3();

const addToCart = (product) => {
    if ( product.quantity > 0 ) {
        if ( addToCartOnce() ) {
            headerCartNumber.textContent = 1;
            headerCartNumber.classList.remove('collapsed');
            headerCartNumber.classList.add('displayed');
            emptyCartText.classList.remove('displayed');
            emptyCartText.classList.add('collapsed');
            cartProducts.classList.remove('full-cart-collapsed');
            cartProducts.classList.add('full-cart-displayed');
            cartProductImage.setAttribute( 'src' , product.productThumbnails[0].url );
            cartProductName.textContent = `${product.name.slice(0 , 21)}...`;
            cartProductPrice.textContent = `$${product.newPrice}.00`;
            cartProductQuantity.textContent = product.quantity;
            cartProductTotal.textContent = `$${product.newPrice * product.quantity}`;
            alert('Product Has Been Added To Cart');
        } else {
            alert('Product Has Already Been Added to Cart');
        }
    } else {
        alert('Check Product Quantity')
    }
     
}


// CART DOM VARIABLES



// DELETE FROM CART 

const deleteFromCart = () => {
    headerCartNumber.textContent = 0;
    headerCartNumber.classList.remove('displayed');
    headerCartNumber.classList.add('collapsed');
    emptyCartText.classList.remove('collapsed');
    emptyCartText.classList.add('displayed');
    cartProducts.classList.remove('full-cart-displayed');
    cartProducts.classList.add('full-cart-collapsed');
    addToCartOnce('reset');
    alert('Product Has Been Removed');
}


// DESKTOP SLIDESHOW 

const closeSlideOnClick = (event) => {
    if ( event.target === slideShowBox  || event.target == slideCloseButton  ) {
        removeSlideshow();
    }
}

const displaySlideshow = () => {
    slideShowBox.setAttribute( 'id' , 'slide-product-photo-display' );
    previousButton.setAttribute( 'id' , 'slide-previous-button');
    nextButton.setAttribute( 'id' , 'slide-next-button');
    slideShowBox.addEventListener( 'click' , closeSlideOnClick);
    slideShowImage.removeAttribute('onclick');
}

const removeSlideshow = () => {
    slideShowBox.setAttribute( 'id' , 'product-photo-display');
    previousButton.setAttribute( 'id' , 'previous-button');
    nextButton.setAttribute( 'id' , 'next-button');
    slideShowImage.setAttribute('onclick' , 'displaySlideshow()');
}



// HANDLE SLIDE DISPLAY 

const getSlideReady = (event) => {
    if( window.innerWidth >= 750) {
        slideShowImage.setAttribute( 'onclick' , 'displaySlideshow()');
    } else if ( event.target.innerWidth >= 750) {
        slideShowImage.setAttribute( 'onclick' , 'displaySlideshow()');
    } else if ( event.target.innerWidth < 750 ) {
        slideShowImage.removeAttribute('onclick');
    }
};

getSlideReady('blah blah');


window.addEventListener( 'resize' , getSlideReady);