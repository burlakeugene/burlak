import './style.scss';

import * as Burlak from '../package';

const data = Burlak.Date.getMonth();

const calendar = document.createElement('div');
calendar.classList.add('calendar');

data.forEach((day) => {
  const html = document.createElement('div');
  html.classList.add('day');
  if (day.current) {
    html.classList.add('current');
  }

  if (day.today) {
    html.classList.add('today');
  }

  html.textContent = day.day;
  calendar.appendChild(html);
});

document.body.appendChild(calendar);
