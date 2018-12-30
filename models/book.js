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

  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }

  postComments(bid, comment) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export { BookModel }