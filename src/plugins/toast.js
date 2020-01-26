import Vue from 'vue'
import Toast from '@/components/Toast.vue'

const ToastPlugin = {}
ToastPlugin.install = function(Vue, options) {
  Vue.prototype.$toast = {
    info(text, callBack) {
      if (!text) return
      showToast('info', text, callBack)
    },
    success(text, callBack) {
      if (!text) return
      showToast('success', text, callBack)
    },
    error(text, callBack) {
      if (!text) return
      showToast('error', text, callBack)
    },
    warning(text, callBack) {
      if (!text) return
      showToast('warning', text, callBack)
    }
  }
}

function showToast(type, text, icon = 'info', duration = 4000, callBack) {
  const ToastConstructor = Vue.extend(Toast)
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        type,
        icon,
        text,
        isShow: true
      }
    }
  })
  document.body.appendChild(toastDom.$el)
  setTimeout(() => {
    toastDom.isShow = false
    callBack && (typeof callBack === 'function') && callBack()
  }, duration)
  setTimeout(() => {
    document.body.removeChild(toastDom.$el)
  }, duration + 1000)
}

export default ToastPlugin
