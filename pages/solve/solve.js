const app = getApp()
var  util = require('../../utils/util.js')
Page({
    data: {
        contentNum: 0,
        Question: [],
        Answer: [],
        askTime: '',
        replyTime: '',
        isAnswer: false
    },
    onLoad: function () {
        wx.getStorage({
            key: 'id',
            success: (res) => {
                this.setData({
                    id: res.data
                })
                wx.request({
                    url: app.globalData.url,
                    data: {
                        s: 'Admin.GetOneReport',
                        token: app.globalData.manager,
                        to: res.data
                    },
                    success: (res) => {
                        if(res.data.ret == 200){
                            this.setData({
                                Question: res.data.data.report,
                                Answer: res.data.data.message,
                                askTime: util.toDate(parseInt(res.data.data.report.time)),
                            })
                            // if (res.data.data.message.length != 0 )
                            //     this.setData({
                            //         replyTime: util.toDate(parseInt(res.data.data.message[0].replytime))
                            //     })
                            console.log(res.data)
                        } 
                        else
                            wx.showModal({
                                content: '未知错误',
                                showCancel: false
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
            fail: () => {
                wx.showModal({
                    content: '未知错误',
                    showCancel: false
                })
            }
        })
        wx.setNavigationBarTitle({
            title: '回复',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    },
    bindInputContent: function (e) {
        let num = e.detail.value.length;
        this.setData({
            content: e.detail.value,
            contentNum: num
        })
    },
    answer: function () {
        console.log('aaa')
        this.setData({
            isAnswer: true
        })
    },
    cancel: function () {
        this.setData({
            isAnswer: false
        })
    },
    confirm: function () {
        wx.request({
            url: app.globalData.url,
            data: {
                s: 'Admin.ReplyReport',
                token: app.globalData.manager,
                to: this.data.id,
                message: this.data.content
            },
            success: (res) => {
                console.log(res)
                if (res.data.ret == -1)
                    wx.showModal({
                        content: 'token错误',
                        showCancel: false
                    })
                else if (res.data.ret == -100)
                    wx.showModal({
                        content: '未知错误',
                        showCancel: false
                    })
                else if (res.data.ret == 200) {
                    wx.showToast({
                        title: '回复成功',
                        success: () => {
                            wx.redirectTo({
                                url: '../manager/manager',
                            })
                        }
                    })
                }
            }
        })
        this.setData({
            isAnswer: false
        })
    },
    finish: function(){
        wx.showModal({
            content: '是否确认结束该投诉?',
            success: (res) => {
                if(res.confirm){
                    wx.request({
                        url: app.globalData.url,
                        data:{
                            s: 'Admin.EndReport',
                            token: app.globalData.manager,
                            to: this.data.id
                        },
                        success: (res) => {
                            wx.showToast({
                                title: '结束成功',
                                success: () => {
                                    wx.redirectTo({
                                        url: '../manager/manager',
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})