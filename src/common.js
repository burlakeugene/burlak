import { InView } from './index.js';

var elem = document.querySelectorAll('.spy');
var req = new InView('.spy', {
  offset: 40,
  in: item => {
    item.classList.add('in');
  },
  out: (item, dir) => {
    item.classList.remove('in');
  },
  activeList: array => {
  }
});
