const api = require("../../../config/api");
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');
var app = getApp();
// pages/auth/accountLogin/accountLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  accountLogin: function () {
    var that = this;
    if (this.data.username.length < 1 || this.data.password.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }
    wx.request({
      url: api.AuthLoginByAccount,
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.erron == 0) {
          that.setData({
            loginErrorCount: 0
          });
          app.globalData.hasLogin = true;
          wx.setStorageSync('userInfo', res.data.data.userInfo);
          wx.setStorage({
            data: res.data.data.token,
            key: 'token',
            success: function () {
              wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          })
        } else {
          that.setData({
            loginErrorCount: that.data.loginErrorCount + 1
          });
          app.globalData.hasLogin = false;
          util.showErrorToast(res.data.errmsg);
        }
      }
    });
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindPasswordInput: function(e){
    this.setData({
      password: e.detail.value
    })
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})