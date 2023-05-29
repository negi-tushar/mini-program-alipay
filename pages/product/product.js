Page({
  data: {
    products: [],
    cart: new Map(), 
    totalItems : 0,
  },

  onLoad() {
    // Call the API and retrieve the product data
    this.fetchProducts();
  },

  fetchProducts() {
    my.showLoading();
    const that = this;
    my.request({
      url: 'https://fakestoreapi.com/products',
      success(res) {
        const products = res.data;
        that.setData({
          products: products
        });

      },
      fail() {
        // Handle API request failure
        console.error('Failed to fetch products');
      }


    });
    my.hideLoading();
  },

  addToCart(event) {
    const productId = event.currentTarget.dataset.id;

    // Check if the product is already in the cart
    if (this.data.cart.has(productId)) {
      // If the product exists, increment its quantity
      const quantity = this.data.cart.get(productId);
      this.data.cart.set(productId, quantity + 1);
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      this.data.cart.set(productId, 1);
    }
      this.setData({
        cart: this.data.cart,
        totalItems : this.calculateTotalItems()
      });
console.log(this.data.cart);
      my.showToast({
        content: 'Product added to cart',
        duration: 1000
      });
    
  },
  calculateTotalItems() {
    let totalItems = 0;

    // Iterate over the cart items and sum up the quantities
    this.data.cart.forEach((quantity) => {
      totalItems += quantity;
    });

    return totalItems;
  },

  navigateToCart() {
    const cartItems = Array.from(this.data.cart);

    const cartParam = encodeURIComponent(JSON.stringify(cartItems));
console.log(cartItems);
    my.navigateTo({
      url: `/pages/cart/cart?cart=${cartParam}`,
    });
  }
});