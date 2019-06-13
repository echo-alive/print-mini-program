// pages/print/index.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/banner.jpg',
      '/images/banner.jpg',
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.checkVersion();
  },
  // 显示模态对话框 ———— 版本过低提示
  checkVersion: function() {
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        let version = res.SDKVersion;
        version = version.replace(/\./g, '');
        if (parseInt(version) < 167) { //小于 1.6.7的版本
          wx.showModal({
            title: '提示',
            content: '微信版本过低，请前往升级微信',
            showCancel: false,
            success: function(res) {
              // console.log(res)
              if (res.confirm) {
                _this.openModal()
              }
            }
          })
          return;
        }
      }
    });
  },
  // 二次授权
  loginAgain: function() {
    this.selectComponent('#loginCheck').loginAgain();
  },

  word_print() {
    wx.navigateTo({
      url: '/pages/word_print/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})