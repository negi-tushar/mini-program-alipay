
Page({
  data: {
    latitude: null,
    longitude: null,
    accuracy: null
  },

onReady(){

  this.getLocation();
},

  getLocation() {
    const that = this;
    my.getLocation({
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        const accuracy = res.accuracy;

        that.setData({
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy
        });
      },
      fail() {
        // Handle location retrieval failure
        console.error('Failed to get location');
      }
    });
  }
});