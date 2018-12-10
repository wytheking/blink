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
          let key = this._getKey(res.data.index)
          wx.setStorageSync(key, res)
        }
    })
  }

  /*
  *  请求上一期、下一期数据的api
  */
  getClassic(index, nextOrPrevious, sCallback) {  
  // getClassic(index, sCallback) {  
    // 在缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious === '-1' ? this._getKey(index) : this._getKey(index)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        // url: '/classic/'+index+'/'+nextOrPrevious,  // 普通写法
        // url: `/classic/${index}/${nextOrPrevious}`,  // ES6模板字符串写法
        url: '/classic/index/previous/' + index,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.data.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }   
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

  _getKey(index) {
    let key = 'classic' + index;
    return key;
  }

}

export { ClassicModel }