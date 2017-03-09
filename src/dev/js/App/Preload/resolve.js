import $ from 'jquery'

const sortImgPath = (
  data, 
  urlPrefix = "", 
  crawlable = /^(object|array)$/, 
  re = /\.(jpe?g|png|svg)$/,
  imgs = []
  ) => {
  if ( crawlable.test(typeof data) ){
    $.each(data, (keys, _el) => {
      if ( crawlable.test(typeof _el) ){
        imgs = sortImgPath(_el, urlPrefix, crawlable, re, imgs)
      } else if ( typeof _el == "string" && re.test(_el) ) {
        imgs.push(urlPrefix + _el)
      }
    })
    return imgs
  } else {
    return false
  }
}

export default sortImgPath

