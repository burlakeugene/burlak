import {AjaxNavigation} from './index.js';

var router = new AjaxNavigation({
    container: '#app',
    navItems: '.ajax, .ajax a',
    preloader: true,
    beforeInit: function(){},
    beforeRendered: function(){
    },
    afterRendered: function(appContainer){
        window.scrollTo(0, 0);
    },
    afterInit: function(){}
});