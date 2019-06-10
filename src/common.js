import {InView} from './index.js';

var req = new InView('.spy', {
    onlyFirst: true,
    in: (item) => {
        item.classList.add('in')
    },
    out: (item) => {
        item.classList.remove('in')
    },
    activeList: (array) => {
        console.log(array)
    }
});