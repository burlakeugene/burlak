export const InView = function(target, options) {
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
      offset = this.offset,
      windowHeight = window.innerHeight;
    if (
      elem.top + offset + windowHeight <= windowHeight * 2 &&
      elem.top - offset + elem.height >= 0
    ) {
      return {
        bool: true
      };
    }
    else{
      if( elem.top + offset + windowHeight > windowHeight * 2){
        return{
          bool: false,
          direction: 'bottom'
        }
      }
      else{
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
