// pages/book/book.js

import { BookModel } from '../../models/book.js'
import { random } from '../../util/common.js'

let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  纯粹 callback  回调地狱 renturn
    // promise  代码风格  多个异步等待合并
    // async  await  ES2017 小程序   不支持
    // 一次调用 多次调用服务器API  链式调用 3个API  API1 API2 API3
    // 
    books: [],
    searching:false,
    more: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * Promise 的正确用法
     */
    bookModel.getHotList()
      .then(
        res => {
          console.log(res)
          this.setData({
            books: res
          })
        }
      )
    
    // 通过传不同id 到详情
    // wx.navigateTo({
    //   id: this.data.id,
    //   url: '/pages/book-detail/book-detail',
    // })

    /* Promise 的错误的用法
    const hotList = bookModel.getHotList()
    hotList.then(
      res => {
        console.log(res)
        bookModel.getMyBookCount()
          .then(res => {
            console.log(res)
            bookModel.getMyBookCount()
              .then(res => {
                console.log(res)
              })
          })
      }
    )
    */

    // Promise 对象  函数
    // 对象  保存状态 函数

    // 使用  Promise 第一步
    // 异步代码 写在 Promise的函数中  第二步
    /*
    const promise = new Promise((resolve, reject) => {
        // pending  fulfilled  rejected   三种状态
        // 进行中    已成功      已失败
        wx.getSystemInfo({ // 小程序获取 系统信息的API
          success: res =>  resolve(res),
          fail: error => reject(error)
        })
    })

    // 使用 promise 对象
    promise.then(
      res => console.log(res),
      error => console.log(error)
    )
    */
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
    console.log('上拉加载！')
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击搜索书籍事件
   */
  onSearching: function () {
    this.setData({
      searching: true
    })
  },
  /**
   * 点击取消事件
   */
  onCancel:function () {
    this.setData({
      searching: false
    })
  }


})