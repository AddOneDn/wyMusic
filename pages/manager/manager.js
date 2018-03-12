const app = getApp()
Page({
    data: {
        department: [],
        status: ['全部','未回复','未结束'],
        statusIndex: 0,
        departmentIndex: 0,
        departmentName: '',
        List: ''
    },
    onLoad: function(){
        wx.request({
            url: app.globalData.url,
            data: {
                s: 'User.GetAllDepart',
                token: app.globalData.manager
            },
            success: (res) => {
                console.log(res)
                this.setData({
                    department: res.data.data
                })
            }
        })
        this.getList('Admin.GetAllReport')
        // wx.request({
        //     url: app.globalData.url,
        //     data: {
        //         s: 'Admin.GetAllReport',
        //         token: app.globalData.manager
        //     },
        //     success: (res) => {
        //         console.log(res.data)
        //         if(res.data.ret == -1){
        //             wx.showModal({
        //                 content: 'token错误',
        //                 showCancel: false
        //             })
        //         }else if(res.data.ret == 200){
        //             this.setData({
        //                 List: res.data.data
        //             })
        //         }
        //     }
        // })
        wx.setNavigationBarTitle({
            title: '管理员界面',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    },
    bindDepartmentChange: function (e) {
        this.setData({
            departmentName: this.data.department[e.detail.value]
        })
    },
    bindStatusChange: function(e){
        console.log(e.detail.value)
        if (e.detail.value == 0) {
            this.getList('Admin.GetAllReport')
        }else if(e.detail.value == 1){
            this.getList('Admin.GetUnReply')
        }else if(e.detail.value == 2){
            this.getList('Admin.GetUnDone')
        }
        this.setData({
            statusIndex: e.detail.value
        })
    },
    toSolve: (e) => {
        wx.setStorage({
            key: 'id',
            data: e.currentTarget.dataset.id,
            success: () => {
                wx.navigateTo({
                    url: '../solve/solve',
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
    logout: () => {
        wx.redirectTo({
            url: '../index/index',
        })
    },
    getList: function(s){
        wx.request({
            url: app.globalData.url,
            data: {
                s: s,
                token: app.globalData.manager
            },
            success: (res) => {
                console.log(res.data)
                if (res.data.ret == -1) {
                    wx.showModal({
                        content: 'token错误',
                        showCancel: false
                    })
                } else if (res.data.ret == 200) {
                    this.setData({
                        List: res.data.data
                    })
                }
            }
        })
    }
})