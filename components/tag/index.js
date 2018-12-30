// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots:true  // 使用插槽 写上这个才会显示
  },
  externalClasses: ['tag-class'], // 设置外部样式 (自定义外部样式类名) tag-class 在wxml中使用 
  properties: {
    text:String
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
    onTap(event) {
      this.triggerEvent('tapping',{
        text:this.properties.text
      })
    }
  }
})
