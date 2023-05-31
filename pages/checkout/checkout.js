Page({
  data: {
    cartTotal : 0,
  },
  onLoad(query) {
    this.setData({
      cartTotal: query.cartTotal,
    });
  },
});
