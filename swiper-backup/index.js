class Swiper {
  constructor(el, opts){
    this.el = el
    this.opts = opts
  }
  destroy(){ /* noop for shim */ }
}

module.exports = Swiper
module.exports.default = Swiper
