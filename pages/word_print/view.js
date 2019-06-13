// pages/word_print/view.js
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
    if (options.file) {
      var file = JSON.parse(options.file);
      console.log(file)
      that.setData({
        'file_name': file.tempFiles[0].name,
        'file_path': file.tempFiles[0].path,
      })
    }


  },
  chooseWechatFile() {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        if (res.tempFiles.length > 0) {
          that.setData({
            'file_name': res.tempFiles[0].name,
            'file_path': res.tempFiles[0].path,
          })
        } else {
          wx.showToast({
            title: '文件不存在或未下载',
            icon: 'none',
            duration: 2000,
            mask: true,
          })
          that.setData({
            'file_name': '文件不存在或未下载',
            'file_path': '',
          })
        }
      }
    })
  },
  uploadFile() {
    var that = this;
    var file_path = that.data.file_path;
    var type = file_path.split('.')[file_path.split('.').length-1];
    var supportType = ['doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];

    if (file_path) {
      console.log(type);
      if (supportType.indexOf(type) === -1) {
        wx.showToast({
          title: '格式不正确',
          image: '/images/error_format.png',
          duration: 2000,
          mask: true,
        })
        return false;
      }
      wx.showLoading({
        title: '上传中',
        mask: true,
      })

      wx.uploadFile({
        url: 'https://print.alive1996.com/interfaces.upload/uploadFiles',
        filePath: file_path,
        name: 'file',

        success: function(res) {
         
          var r = JSON.parse(res.data);
          console.log(r);
          var data = {
            'file_name': that.data.file_name,
            'file_path': r.pdf_file_url,
            'count': r.count
          };
          if (r.code == 0) {
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/word_print/setting?data=' + JSON.stringify(data),
            })
          }


        }
      })
    } else {
      wx.showToast({
        title: '未找到文件',
        icon: 'none',
        duration: 2000,
        mask: true,
      })
    }

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