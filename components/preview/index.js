// components/preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classics: {
      type: Object,
      observer: function(newVal) {
        var typeText;
        if (newVal) {
          typeText = {
            100: "电影",
            200: "音乐",
            300: "句子"
          }[newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText:String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(event){
      // 注意catchtap与bindtap的区别
      this.triggerEvent('tap',{
        cid: this.properties.classics.id,
        type: this.properties.classics.type
      },{})
    }
  }
})