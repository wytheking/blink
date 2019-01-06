// pages/my/my.js

import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    myBooksCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo() 
    // 这个是老板小程序获取用户信息的方法，会弹窗图示是否获取用户信息
    // 获取 wx.getUserInfo 接口后续将不再出现授权弹窗
    // 一、小程序:
    // 1、使用 button 组件，并将 open - type 指定为 getUserInfo 类型，获取用户基本信息。
    // 详情参考文档:https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    // 2、使用 open - data 展示用户基本信息。
    // 详情参考文档: https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html

    // 先判断用户是否授权
    // wx.getUserInfo({
    //   success:data => {
    //     console.log(data)
    //   }
    // })

    this.userAuthorized()

    this.getMyBookCount()

    this.getMyFavor()

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 判断用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      success:data => {
        console.log(data)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:data => {
              console.log(data)
              this.setData({
                authorized:true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }   
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          myBooksCount: res.count
        })
      })
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
        this.setData({
          classics: res
        })
    })
  }

})