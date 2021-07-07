import Vue from 'vue'
import { Image } from 'element-ui'
const ImageViewerMain = Image.components.ImageViewer
const ImageViewerConstructor = Vue.extend(ImageViewerMain)
let instance

const ImageViewer = function(urlList) {
  instance = new ImageViewerConstructor({
    propsData: {
      urlList: urlList,
      onClose: ImageViewer.close
    }
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

ImageViewer.close = function() {
  document.body.removeChild(instance.$el)
  instance = null
}

export function previewImage(urlList) {
  return new ImageViewer(urlList)
}
