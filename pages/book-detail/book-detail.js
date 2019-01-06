// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    // id  从其他page页面传过来的参数id  用 options.id 来接收
    const bid = options.bid
    console.log(bid)

    const detail =  bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const liseStatus = bookModel.getLikeStatus(bid)

    // Promise.race() 竞争 谁先完成，先执行谁
    // 使用Promise.all() 合体 代替了一下三个promise回调
    Promise.all([detail, comments, liseStatus])  
      .then(res => {
        console.log(res)
        this.setData({
          book: res[0],
          comments: res[1].comment,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })

    // detail.then(res => {
    //   this.setData({
    //     book:res
    //   })
    // })

    // comments.then(res => {
    //   this.setData({
    //     comments: res.comment
    //   })
    // })

    // liseStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  /**
   * 书籍点赞
   */
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  /**
   * 显示 隐藏 短评输入
   */
  onFakePost(event) {
    this.setData({
      posting:true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  /**
   * 点击tag标签，获取tag文本内容
   */
  onPost(event) {
    const comment = event.detail.text || event.detail.value;
    console.log(comment);

    if (!comment) {
      return
    }
    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      }) 
      return   
    }

    bookModel.postComments(this.data.book.id, comment)
      .then(res => {
        wx.showTabBar({
          title: '+ 1',
          icon: 'none'
        })

        this.data.comments.unshift({
          content:comment,
          nums: 1
        })

        this.setData({
          comment:this.data.comments,
          posting: false
        })
      })
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