import { InView } from './index.js';
var buttons = document.querySelectorAll('.list__toggle');
buttons.length &&
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.target
        .closest('.list')
        .querySelector('.list__inner')
        .classList.toggle('active');
    });
  });

new InView('[data-animate]', {
  offset: 40,
  intervalChecking: 50,
  in: (item) => {
    if (!item.hasAttribute('data-animated')) {
      item.setAttribute('data-animated', '');
    }
  },
  out: (item, dir) => {
    item.removeAttribute('data-animated');
  },
  activeList: (array) => {},
});
