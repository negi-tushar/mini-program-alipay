Page({
  data: {
    totalPrice: 0, 
    cartItems: [],
  },
  props :{   
     myCart: [], 
  },
  onLoad(query) {
    my.showLoading();
    const cartParam = query.cart;

    const cartItem = JSON.parse(decodeURIComponent(cartParam));

    const cartMap = new Map(cartItem);

    this.setData({
      myCart: cartMap,
    });
    //
   this.loadCartItems();
   //
  },

  calculateTotalPrice() {
    let totalPrice = 0;
    console.log('length == > ' +
      this.data.cartItems.length
      );

  this.data.cartItems.forEach((cartItem) => {

    const { price, quantity } = cartItem;
    console.log(cartItem);
    totalPrice += price * quantity ;

    
  });

  this.setData({
    totalPrice: totalPrice.toFixed(2),
  });
  },
 async loadCartItems() {
    const promises = [];

    // Retrieve the product details for each cart item using the product ID
    this.data.myCart.forEach((quantity, productId) => {
      const apiUrl = `https://fakestoreapi.com/products/${productId}`;
      const promise = new Promise((resolve, reject) => {
        my.request({
          url: apiUrl,
          success: (response) => {
            console.log('statusCode' + response.statusCode );

            if (1==1) {
              const data = response.data;
              const cartItem = { ...data, quantity };
              resolve(cartItem);
            } else {
              console.log('reject');

              reject(new Error(`Failed to fetch product ${productId}: ${response.statusCode}`));
            }
          },
          fail: (error) => {
            console.log('fail;');

            reject(new Error(`Error fetching product ${productId}: ${error}`));
          },
        });
      });
  
      promises.push(promise);

    });
  
    // Wait for all promises to resolve
    Promise.all(promises)
      .then((cartItem) => {
        // Set the cartItems data in the state
        console.log('**************\n' +cartItem.length);

        this.setData({
          cartItems:  cartItem,
        });
      }).then(()=>
      my.hideLoading(),
      this.calculateTotalPrice())
      .catch((error) => {
        console.error('Error loading cart items:', error);
      });
     // this.calculateTotalPrice();

  }
});
