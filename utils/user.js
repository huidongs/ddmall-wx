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