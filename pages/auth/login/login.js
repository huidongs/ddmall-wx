var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({

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
  wxLogin:function (e) {
    if(e.detail.userInfo == undefined ){
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败')
      return;
    }
    user.checkLogin().catch(()=>{
      user.loginByWeiXin(e.detail.userInfo).then((res)=>{
        app.globalData.hasLogin = true;
        wx.navigateBack({
          delta: 1,
        })
      }).catch((err)=>{
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });
    });
  },
  accountLogin:function () {
    wx.navigateTo({
      url: '/pages/auth/accountLogin/accountLogin',
    })
  }

})