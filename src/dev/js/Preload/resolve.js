import $ from 'jquery'

const sortImgPath = (
  data, 
  urlPrefix = "", 
  crawlable = /^object|array$/, 
  re = /\.(jpe?g|png|svg)$/,
  imgs = []
  ) => {
  if ( crawlable.test(data) ){
    $.each(data, (keys, _el) => {
      if ( crawlable.test(_el) ){
        imgs = sortImgPath(_el, urlPrefix, crawlable, re, imgs)
      } else if ( typeof str == "string" && re.test(_el) ) {
        imgs.push(urlPrefix + _el)
      }
    })
    return imgs
  } else {
    return false
  }
}

export default sortImgPath

