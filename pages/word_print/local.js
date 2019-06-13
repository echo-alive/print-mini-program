// pages/word_print/local.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_pic:'/images/upload.jpg',
    btn_disabled:true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    if (currentPage.options.return_url) {
      var web_src = decodeURIComponent(currentPage.options.return_url);
      console.log(web_src)
      this.setData({
        src: web_src
      });
    }
  },
  msgHandler: function (e) { //转发时候先执行（h5像小程序传递参数）
    console.log(e.detail.data) //我是网页，获取到来自也页面的数据
    var info = (e.detail.data)[((e.detail.data).length) - 1]
    this.setData({
      value: info
    });
    this.setData({
      title: this.data.value
    });
  },

  bindmessage(e) {//接收web-view传递的参数
    if (e.detail.data[e.detail.data - 1].title) {
      this.setData({//存储状态
        title: e.detail.data[0].title
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})