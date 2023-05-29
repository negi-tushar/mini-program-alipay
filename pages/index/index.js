Page({
  data: {
    location: '',
    hasLocation: false,
    latitude: 0.0,
    longitude: 0.0,
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

  },
  onReady() {

    my.navigateTo({
      url: '/pages/product/product'
      //'/pages/product/product'
    });
  },
  onShow() {
    // 页面显示
    //this.mapCtx = my.createMapContext('map');

  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {

    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  getLocation(){
    let response = new Map();

    my.getLocation({
      success(res){
    // for(var i in res){
response.set('latitude',res.latitude);
response.set('longitude',res.longitude);

    //   response[i]= res[i];
    //   console.log(      response[i]);

    // }
 //   console.log(response)
      },
      fail() {
        my.hideLoading();
        my.alert({ title: 'location failed' });
      },
      complete(){

      }
    });
    try{
             this.setData({
        hasLocation: true,
        location: 'success',
        longitude: response.longitude,
        latitude :  response.latitude
      });
      console.log(response.size +'  whats is up '); 
console.log(response);
     }catch (e){
       console.log(e);
     }
  }
});


