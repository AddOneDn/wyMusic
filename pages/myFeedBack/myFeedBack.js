var app = getApp();
Page({
    data:{
        List: '',
        Message: {}
    },
    onLoad:function(){
        console.log(app.globalData.userDetails.token)
        wx.request({
            url: app.globalData.url,
            data: {
                service: 'App.User.GetPost',
                token: app.globalData.userDetails.token
            },
            success: (res) => {
                console.log(res.data)
                if(res.data.ret == 200)
                    this.setData({
                        List: res.data.data.report,
                        Message: res.data.data.message
                    })
                else if(res.data.ref == -1)
                    wx.showModal({
                        content: 'token出错',
                        showCancel: false
                    })
            },
            fail: () => {
                wx.showModal({
                    title: '网络错误',
                    showCancel: false
                })
            }
        })
        wx.setNavigationBarTitle({
            title: '我的投诉',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    },
    toDetails: (e) => {
        wx.setStorage({
            key: 'id',
            data: e.currentTarget.dataset.id,
            success: () => {
                wx.navigateTo({
                    url: '../details/details',
                })
            },
            fail: () => {
                wx.showModal({
                    content: '未知错误',
                    showCancel: false
                })
            }
        })

    },
    toComplain: () => {
        wx.navigateTo({
            url: '../complain/complain',
        })
    },
    logout: () => {
        wx.reLaunch({
            url: '../index/index',
        })
    }
})