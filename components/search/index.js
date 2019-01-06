// components/search/index.js

import { KeyWordsModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordsModel = new KeyWordsModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */

  behaviors: [paginationBev],

  properties: {
    more:{
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached() { // 小程序的组件初始化加载数据的函数
    this.setData({
      historyWords: keywordsModel.getHistory()
    })

    keywordsModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 监听page中触发触底事件（上拉加载），在components中执行上拉加载
     */
    loadMore(event) {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) { // 一次请求结束之后才能发第二次请求
        return
      }
      if (this.hasMore()) {
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)          
            this.unLocked()
          },() => {
            this.unLocked()
          })
      }
      
    },

    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel',{},{})
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      // this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q: q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)      
          keywordsModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }

    /**
     * 页面上拉触底事件的处理函数
     * 小程序在components中不能使用onReachBottom
     */
    // onReachBottom: function () {
    //   console.log(123)
    // }
  }
})
