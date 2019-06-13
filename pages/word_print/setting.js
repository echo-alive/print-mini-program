// pages/word_print/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    reduce_disabled: true,
    add_disabled: false,
    limit_start: 1,
    limit_end: 1,
    count: 1
  },
  numAdd() {
    var that = this;
    var num = parseInt(that.data.num);
    num++;
    that.setData({
      'num': num,
      'reduce_disabled': num <= 1 ? true : false
    })
  },
  numReduce() {
    var that = this;
    var num = parseInt(that.data.num);
    if (num <= 1) {
      num = 1;
    } else {
      num--;
    }
    that.setData({
      'num': num,
      'reduce_disabled': num <= 1 ? true : false
    })
  },

  limit_start_blur(e) {
    var that = this;
    var limit_start = e.detail.value;
    var limit_end = parseInt(that.data.limit_end);
    if (limit_start > limit_end || limit_start == "" || limit_start == 0) {
      that.setData({
        'limit_start': 1
      })
    } else {
      that.setData({
        'limit_start': e.detail.value
      })
    }
  },
  limit_end_blur(e) {
    var that = this;
    var limit_start = parseInt(that.data.limit_start);
    var limit_end = e.detail.value;
    console.log(limit_end)
    if (limit_end < limit_start || limit_end == "" || limit_end == 0 || limit_end > that.data.count) {
      that.setData({
        'limit_end': that.data.count
      })
    } else {
      that.setData({
        'limit_end': e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.data) {
      var data = JSON.parse(options.data);
      that.setData({
        'file_name': data.file_name,
        'file_path': data.file_path,
        'count': data.count,
        'limit_start': 1,
        'limit_end': data.count
      })
    }
  },
  yulan() {
    var that = this;
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'https://print.alive1996.com/' + that.data.file_path,
      success: function(res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            console.log(res)
          }
        })
      }
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