//app.js
App({

  d: {
    ceshiUrl: 'https://print.alive1996.com/interfaces.'
  },
  onLaunch: function () {
   
  },
  globalData: {
    userInfo: null,
    openId: null,
    session_key: null,
    unionId: null,
    ajaxHeader: {
      // accessToken: '',
      // clientCode: '100001', //测试100001  生产验证用 300016
      // sendChl: 'hzsmk.h5',// 应用渠道(必填) 
      // sendClient: 'hellohzsmk', //应用验证码(必填) string  
      // sendDev: 'test',//设备号(必填) string  
      // serialSeq: '20180712' //流水号(必填) string
    }

  }
})