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
            }
        })
    }

  getPrevious(index, sCallback) {
      this.request({
        // url: '/classic/'+ index +'/previous',
        url: '/classic/index/previous/' + index,
        success: (res) => {
          sCallback(res)
        }
      })
    }
}

export { ClassicModel }