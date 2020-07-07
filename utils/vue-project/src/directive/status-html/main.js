import { renderSatusHTML } from '@/config/type-config'
export default {
  bind: function(el, binding, vnode) {
    el.innerHTML = renderSatusHTML(binding.value)
  },
  update: function(el, binding, vnode) {
    el.innerHTML = renderSatusHTML(binding.value)
  }
}
