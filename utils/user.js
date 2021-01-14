const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: (res) => {
        resolve(true);
      },
      fail: (res) => {
        reject(false);
      }
    })
  })
}
/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: (res) => {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
/**
 * 调用微信登录
 */
function loginByWeiXin(userInfo) {
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, {
        code: res.code,
        userInfo: userInfo
      }, 'POST').then(res => {
        console.log(res)
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          resolve(res);
        } else {
          reject(res); 
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}
/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      })
    } else {
      reject(false);
    }
  })
}

module.exports={
  loginByWeiXin,
  checkLogin,
};