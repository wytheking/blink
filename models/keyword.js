
import {HTTP} from '../util/http-p.js'

class KeyWordsModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 队列模式
    if (!has) {
      // 当数组数据达到最大值时 再添加数据，数组末尾的先删除，在添加keyword到数组第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }   
  }
}

export {
  KeyWordsModel
}