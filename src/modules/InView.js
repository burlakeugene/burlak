export const InView = function(selector, options){
    this.items = document.querySelectorAll(selector);
    this.in = options.in ? options.in : false;
    this.out = options.out ? options.out : false;
    this.scrollTop = 0;
    this.offset = options.offset ? options.offset : 0;

    this.setScrollTop = function(top){
        this.scrollTop = top;
    };

    this.checkItem = function(e){
        let elem = e.getBoundingClientRect(),
            offset = this.offset,
            windowHeight = window.innerHeight;
        if( ((elem.top + offset) + windowHeight <= windowHeight * 2) &&
            ((elem.top - offset) + elem.height >= 0)){
            return true;
        }
        return false;
    };

    this.checkItems = function(){
        if(!this.items) return false;
        this.items.forEach((e, i) => {
            let boolCheck = this.checkItem(e);
            if(boolCheck && this.in) this.in(e);
            if(!boolCheck && this.out) this.out(e);
        })
    };

    this.watch = function(){
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