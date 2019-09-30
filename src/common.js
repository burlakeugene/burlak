import { InView } from './index.js';

var elem = document.querySelectorAll('.spy');
var req = new InView('.spy', {
  in: item => {
    item.classList.add('in');
  },
  out: item => {
    item.classList.remove('in');
  },
  activeList: array => {
    console.log(array);
  }
});
