// components/loginCheck/loginCheck.js
//获取应用实例
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: true, //是否已经授权
    impowerShow: wx.getStorageSync('impowerShow') == 'hide' ? 'hide' : 'show', //授权提示弹框是否被关闭过
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    wxUserInfo: null, //微信用户信息
    session_key: null, //会话密钥
  },
  // 实例进入页面节点树
  attached: function() {
    this.login();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 再次授权
    loginAgain: function() {
      this.setData({
        impowerShow: 'show'
      })

    },
    // 登录授权
    login: function() {
      let _this = this;
      // 登录
      wx.login({
        success: res => {
          // console.log(res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.getUserMsg(res.code);
        }
      });

      // 获取用户授权信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res);
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo
                _this.setData({
                  wxUserInfo: res,
                  hasUserInfo: true
                });
              }
            })
          } else if (_this.data.canIUse) {
            // 没有授权，弹框提示授权
            this.setData({
              hasUserInfo: false
            })
          } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                  wxUserInfo: res.userInfo,
                  hasUserInfo: true
                });
              }
            })
          }
        }
      })
    },
    // code换取用户信息
    getUserMsg: function(code) {
      let _this = this;
      wx.showLoading({
        title: '登录中...',
        mask: true,
      })
      wx.request({
        url: app.d.ceshiUrl + 'wechat/getOpenInfo',
        data: {
          code: code
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data);
          app.globalData.openId = res.data.openid;
          app.globalData.session_key = res.data.session_key;
          _this.setData({
            session_key: res.data.session_key
          });
        },
        fail: function(res) {},
        complete: function(res) {
          wx.hideLoading();
        },
      })
    },

    // 第三方用户登录
    loginThird: function() {
      let _this = this;
      let host = SERVERS_INFO[SERVERS_ALIAS.SMK_BASE].host;
      let params = {
        logType: '07',
        thirdId: app.globalData.unionId,
        resId: 'weixin',
        userSystem: '0052'
      };

      http({
        path: PATHS_ALIAS.THIRD_USER_LOGIN,
        params: params,
        header: {
          sendChl: 'hzsmk.h5', // 应用渠道(必填) 
          sendClient: 'hellohzsmk', //应用验证码(必填) string 
        },
        success: function(res) {
          console.log(res);
          wx.setStorageSync('accessToken', res.response.accessToken)
          wx.hideLoading();
        },
        fail: function(err) {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
          console.log(err);
          if (err.code == 'PY0005') { //跳转输入手机号登录
            wx.navigateTo({
              url: '/pages/phoneLogin/phoneLogin',
            })
          }
        },
        complete: function() {

        }
      })


      // wx.request({
      //   url: host + '/ThirdUserLogin',
      //   header: app.globalData.ajaxHeader,
      //   method: 'POST',
      //   data: params,
      //   success: function (res) {
      //     console.log(res)
      //     if(res){

      //     }

      //   },
      //   fail: function (res) {

      //   }
      // })
    },
    // 获取用户信息-处理数据
    bindgetuserinfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        wxUserInfo: e.detail,
        hasUserInfo: true
      });
      wx.login({
        success: res => {
          // console.log(res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.getUserMsg(res.code);
        }
      });

    },
    // 授权弹框-取消
    cancelGetInfo: function() {
      let _this = this;
      wx.setStorage({
        key: 'impowerShow',
        data: 'hide',
        success: function() {
          _this.setData({
            impowerShow: 'hide'
          })
        }
      })
    },
  }
})