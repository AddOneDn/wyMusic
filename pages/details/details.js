const app = getApp()
var util = require('../../utils/util.js')
Page({

    onLoad:function(){
        wx.getStorage({
            key: 'id',
            success: (res) => {
                wx.request({
                    url: app.globalData.url,
                    data: {
                        s: 'User.GetOneReport',
                        token: app.globalData.user,
                        to: res.data
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.data.ret == 200){
                            let replytimeArr = []
                            for(let i=0;i<res.data.data.message.length;i++){
                                let replytime = util.toDate(parseInt(res.data.data.message[i].replytime))
                                replytimeArr.push(replytime)
                            }
                            this.setData({
                                Question: res.data.data.report,
                                Answer: res.data.data.message,
                                askTime: util.toDate(parseInt(res.data.data.report.time)),
                                replyTime: replytimeArr
                            })
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
        })
        wx.setNavigationBarTitle({
            title: '投诉详情',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    }
})