const app = getApp()

Page({
    data: {
        studentid: '',
        password: '',
        isAdmin: 0,
        isLoading: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    checkboxChange: function (e) {
        this.setData({
            isAdmin: e.detail.value.length
        })
        console.log(this.data.isAdmin)
    },
    login: function () {
        if (this.data.isAdmin == 1 && this.data.studentid != 123456) {
            this.setData({
              isLoading: true
            })
            wx.request({
                url: app.globalData.url,
                data: {
                    service: 'App.Admin.Login',
                    token: 1,
                    studentid: this.data.studentid,
                    passwd: this.data.password
                },
                success: (res) => {
                    console.log(res)
                    if (res.data.ret == 200) {
                        app.globalData.manager = res.data.data.token
                        wx.navigateTo({
                            url: '../manager/manager',
                        })
                    } else if (res.data.ret == -1){
                        wx.showModal({
                            content: '用户名或密码错误',
                            showCancel: false
                        })
                    } else if (res.data.ret == -2){
                        wx.showModal({
                            content: '权限不足哦',
                            showCancel: false
                        })
                    }
                },
                fail: (err) => {
                    console.log(err)
                    wx.showModal({
                        title: '网络错误',
                        showCancel: false
                    })
                },
                complete: () => {
                  this.setData({
                    isLoading: false
                  })
                }
            })
        } else if (this.data.isAdmin == 0 && this.data.studentid != 123456) {
            this.setData({
              isLoading: true
            })
            wx.request({
                url: app.globalData.url,
                data: {
                    s: 'User.Login',
                    token: 1,
                    studentid: this.data.studentid,
                    passwd: this.data.password
                },
                success: (res) => {
                    console.log(res)
                    if (res.data.ret == 200) {
                        app.globalData.userDetails = res.data.data
                        app.globalData.user = res.data.data.token
                        console.log(app.globalData.user)
                        console.log(app.globalData.userDetails)
                        wx.navigateTo({
                            url: '../myFeedBack/myFeedBack',
                        })
                    } else {
                        wx.showModal({
                            content: '用户名或密码错误',
                            showCancel: false
                        })
                    }
                },
                fail: () => {
                    console.log(err)
                    wx.showModal({
                        title: '网络错误',
                        showCancel: false
                    })
                },
                complete: () => {
                  this.setData({
                    isLoading: false
                  })
                }
            })
        } else if (this.data.studentid == 123456){
            app.globalData.extraCount++;
            wx.navigateTo({
              url: '../extra/extra',
            })
        }
    },
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '登录',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
        }
        return {
            title: '青年权益!',
            path: '/pages/index/index.wxml',
            imageUrl: '../img/nuaa.jpg',
            success: function (res) {
                wx.showToast({
                    title: '转发成功',
                })
            },
            fail: function (res) {
               
            }
        }
    },
    bindInputId: function (e) {
        this.setData({
            studentid: e.detail.value
        })
    },
    bindInputPas: function (e) {
        this.setData({
            password: e.detail.value
        })
    }
})
