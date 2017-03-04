export default class Prelaod {
	constructor(img, onSuccess, onFailure = null, percentage = null, limitTime = 6000){
    this.onSuccess = onSuccess
    this.onFailure = onFailure
    this.percentage = percentage
    this.imgToDownload = img

    this.imgDone = []
    this.timeout = this.safetyTimeout(limitTime)
    this.loadImages(img)
  }

  loadImages(imgArray){
    let images = []
    for (var i=0; i < this.imgToDownload.length; i++){
        images[i] = new Image()
        images[i].src = imgArray[i]
        images[i].addEventListener('load', this.updateStatus(this, images[i]))
    }
  }

  safetyTimeout(time){
    let self = this
    return setTimeout(function() {
      self.onFailure ? self.onFailure : self.onSuccess
    }, time)
  }

  updateStatus(self, img){
    self.imgDone.push(img)
    let status = ( self.imgDone.length / self.imgToDownload.length )

    if ( self.percentage ){
      self.percentage(status)
    }

    if ( status === 1 ){
      clearTimeout(self.timeout)
      self.onSuccess
    }
  }
}
