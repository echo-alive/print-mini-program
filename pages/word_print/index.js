// pages/word_print/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

  },
  chooseWechatFile() {

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        if (res.tempFiles.length > 0) {
          wx.navigateTo({
            url: '/pages/word_print/view?file=' + JSON.stringify(res),
          })
        } else {
          wx.showToast({
            title: '文件不存在或未下载',
            icon: 'none',
            duration: 2000,
            mask: true,
          })
        }
      }
    })
  },
  chooseLocalFile() {
    wx.navigateTo({
      url: '/pages/word_print/local',
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