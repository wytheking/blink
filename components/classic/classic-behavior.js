/**
 * Behavior 组件的行为  就是可复用的组件 公用的部分
 */

let classicBeh = Behavior({

  /**
   * 组件的属性列表
   */
  properties: {
    img: String,
    content: String,
    hidden:Boolean
  },

  /**
   * 生命周期函数
   */
  attached: function () {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }

})

export { classicBeh }