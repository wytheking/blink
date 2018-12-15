import { HTTP } from '../util/http-p.js'

/**
 * extends  就是让 ClassicModel 类 去继承 HTTP 类
 */
class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: '/book/hot_list'
    })
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
}

export { BookModel }