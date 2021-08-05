const InView = function(target, options) {
  this.getItems = function(target) {
    if (target instanceof NodeList) {
      return target;
    } else if (target instanceof Node) {
      return [target];
    } else {
      return document.querySelectorAll(target);
    }
  };
  this.items = this.getItems(target);
  this.in = options.in ? options.in : false;
  this.out = options.out ? options.out : false;
  this.activeList = options.activeList ? options.activeList : false;
  this.scrollTop = 0;
  this.offset = options.offset ? options.offset : 0;
  this.dynamicDom = options.dynamicDom ? options.dynamicDom : false;

  this.setScrollTop = function(top) {
    this.scrollTop = top;
  };

  this.checkItem = function(e) {
    let elem = e.getBoundingClientRect(),
      offsetTop = parseFloat(this.offset) || 0,
      offsetBottom = parseFloat(this.offset) || 0,
      windowHeight = window.innerHeight;
    if(this.offset && this.offset.top && parseFloat(this.offset.top)) offsetTop = parseFloat(this.offset.top);
    if(this.offset && this.offset.bottom && parseFloat(this.offset.bottom)) offsetBottom = parseFloat(this.offset.bottom);
    if (
      elem.top - offsetTop + elem.height >= 0 &&
      elem.top + offsetBottom + windowHeight <= windowHeight * 2
    ) {
      return {
        bool: true
      };
    }
    else{
      if( elem.top + offsetBottom + windowHeight > windowHeight * 2){
        return{
          bool: false,
          direction: 'bottom'
        }
      }
      if(elem.top - offsetTop + elem.height < 0){
        return{
          bool: false,
          direction: 'top'
        }
      }
    }
  };

  this.checkItems = function() {
    this.items = this.dynamicDom ? this.getItems(target) : this.items;
    if (!this.items) return false;
    let array = [];
    this.items.forEach((e, i) => {
      let boolCheck = this.checkItem(e);
      if (boolCheck.bool && this.in) this.in(e);
      if (boolCheck.bool && this.activeList) array.push(e);
      if (!boolCheck.bool && this.out) this.out(e, boolCheck.direction);
    });
    this.activeList && this.activeList(array);
  };

  this.watch = function() {
    this.setScrollTop(window.pageYOffset);
    this.checkItems();
    window.addEventListener('scroll', () => {
      this.setScrollTop(window.pageYOffset);
      this.checkItems();
    });
    window.addEventListener('resize', () => {
      this.setScrollTop(window.pageYOffset);
      this.checkItems();
    });
  };

  this.watch();
};

export default InView;
