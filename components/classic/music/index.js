// components/classic/music/index.js

import { classicBeh } from '../classic-behavior.js'

const mMgr = wx.getBackgroundAudioManager();

Component({

  behaviors: [classicBeh],
  
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   * 播放音乐API   老版API  新版API
   */
  data: {
      playing: false,
      playSrc: 'images/player@play.png',
      pauseSrc: 'images/player@pause.png',
  },

  /**
  * 组件生命周期函数 attached 在组件进入的时候触发
  */
  attached: function (event) {
    this._recoverStatus();
  },

  /**
   * 组件生命周期函数 detached 在组件移除的时候触发
   */
  detached:function(event) {
    // wx:if  hidden
    // mMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      mMgr.title = this.properties.title
      // 图片切换
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause();
      }     
    },

    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch:function(){
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
