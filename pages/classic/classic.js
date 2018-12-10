// pages/classic/classic.js

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    classicModel.getLatest((res) => {
      console.log(res);
      this._getLikeStatus(res.data.id, res.data.type);
      // 数据更新, 缓存数据--Storage
      this.setData({
        classicData: res.data,  // 普通写法
        // ...res.data   // ES6扩展语法用法,这样在页面数据绑定时，就可以写变量名index，不用带classicData.index
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums
      })

      // latestClassicData latestIndex     currentClassicData  currentIndex

    })
  },

  /**
   * 点赞
   */
  onLike: function (event) {
    console.log(event);
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  /**
   * 上一页(相当于下一期，排序是按最新一期在第一个)
   */
  onNext: function (event) {
    // this._updataClassic('next');
    this._updataClassic(+1);
  },

  /**
   * 下一页
   */
  onPrevious: function (event) {
    // this._updataClassic('previous');
    this._updataClassic(-1);
  },

  /**
   * （上一页、下一页） 公用方法
   */
  _updataClassic: function (nextOrPrevious) {
    let index = this.data.classicData.index;
    // classicModel.getClassic(index, nextOrPrevious, (res) => {
    index = index + nextOrPrevious;
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log(res);
      this._getLikeStatus(res.data.id, res.data.type),
      // 更新数据
      this.setData({
        classicData: res.data,  // 普通写法
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },

  /**
   *  获取点赞信息的私有方法
   */
  _getLikeStatus: function (artId, category) {
    likeModel.getClassicLikeStatus(artId, category,
      (res) => {
        this.setData({
          likeStatus: res.data.like_status,
          likeCount: res.data.fav_nums
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