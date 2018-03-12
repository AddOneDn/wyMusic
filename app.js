App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //改变navBar颜色
    wx.setNavigationBarColor({
        backgroundColor: '#0B568A',
        
        frontColor: '#ffffff'
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // if(res.code){
        //     wx.request({
        //         url: 'https://api.weixin.qq.com/sns/jscode2session',
        //         data:{
        //             appid: 'wx3795aa7c89912ebe',
        //             secret: 'ffcf345e5e1453b3f14fe53a29757be2',
        //             js_code: res.code,
        //             grant_type: 'authorization_code'
        //         },
        //         success: (res) => {
        //             console.log(res)
        //         }
        //     })
        // } else {
        //     wx.showModal({
        //         content: '获取用户登录态失败！',
        //         showCancel: false
        //     })
        //     console.log('获取用户登录态失败！' + res.errMsg)
        // }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userDetails: {},
    user: '',
    manager: '',
    extraCount: 0,
    url: 'https://nuaa.yuwenjie.cc/right/'
  }
})