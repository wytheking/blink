import { HTTP } from '../util/http.js'

/*
* extends  就是让 ClassicModel 类 去继承 HTTP 类
*/
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
        url: '/classic/latest',
        success: (res) => {
          sCallback(res)
          this._setLatestIndex(res.data.index)
        }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {    
    this.request({
      // url: '/classic/<int:index>/previous',
      url: '/classic/index/previous/' + nextOrPrevious,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index == latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index; 
  }

}

export { ClassicModel }