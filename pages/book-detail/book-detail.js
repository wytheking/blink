// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // id  从其他page页面传过来的参数id  用 options.id 来接收
    const bid = options.bid
    console.log(bid)

    const detail =  bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const liseStatus = bookModel.getLikeStatus(bid)

    detail.then(
      res => {
        this.setData({
          book:res
        })
      }
    )

    comments.then(
      res => {
        this.setData({
          comments: res.comment
        })
      }
    )

    liseStatus.then(
      res => {
        this.setData({
          likeStatus: res.like_status,
          likeCount: res.fav_nums
        })
      }
    )
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

  }
})