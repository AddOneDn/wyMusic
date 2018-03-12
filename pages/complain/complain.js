const app = getApp()
Page({
    data: {
        contentNum: 0,
        title: '',
        content: '',
        department: [],
        departmentIndex: 0
    },
    onLoad: function () {
        wx.request({
            url: app.globalData.url,
            data: {
                s: 'User.GetAllDepart',
                token: app.globalData.user
            },
            success: (res) => {
                console.log(res)
                res.data.data.push('')
                this.setData({
                    department: res.data.data
                })
            }
        })
        wx.setNavigationBarTitle({
            title: '投诉维权',
            success: () => {
                wx.setNavigationBarColor({
                    backgroundColor: '#0B568A',
                    frontColor: '#ffffff'
                })
            }
        })
    },
    bindInputTitle: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    bindInputContent: function (e) {
        let num = e.detail.value.length;
        this.setData({
            content: e.detail.value,
            contentNum: num
        })
    },
    bindDepartmentChange: function (e) {
        this.setData({
            departmentIndex: e.detail.value,
            departmentName: this.data.department[e.detail.value]
        })
    },
    bindInputDep: function(e){
        this.setData({
            departmentName: e.detail.value,
            departmentIndex: this.data.department.length-1
        })
    },
    submit: function(){
        if(this.data.title.length < 3 || this.data.content.length < 5){
            wx.showModal({
                content: '标题或内容太短',
                showCancel: false
            })
        }
        else
            wx.request({
                url: app.globalData.url,
                data: {
                    s: 'User.PostNew',
                    token: app.globalData.userDetails.token,
                    title: this.data.title,
                    detail: this.data.content,
                    department: this.data.departmentName
                },
                success: (res) => {
                    console.log(this.data.departmentName)
                    console.log(res)
                    if(res.data.data == 1){
                        wx.showToast({
                            title: '提交成功',
                            success: () => {
                                wx.redirectTo({
                                    url: '../myFeedBack/myFeedBack',
                                })
                            }
                        })
                    }else if(res.data.data == -1){
                        wx.showModal({
                            content: 'token错误',
                            showCancel: false
                        })
                    }else if(res.data.data == -100){
                        wx.showModal({
                            content: '未知错误',
                            showCancel: false
                        })
                    }
                },
                fail: () => {
                    wx.showModal({
                        title: '网络错误',
                        showCancel: false
                    })
                }
            })
            // wx.navigateBack()
    }
})