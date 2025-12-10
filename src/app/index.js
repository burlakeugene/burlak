import './style.scss';

import * as Burlak from '../package';

const data = Burlak.Date.getMonth();

document.body.append(
  Burlak.DOM.create(
    'div',
    {
      class: 'calendar',
    },
    null,
    data.map((day) =>
      Burlak.DOM.create(
        'div',
        {
          class: `day ${day.current ? 'current' : ''} ${
            day.today ? 'today' : ''
          }`,
        },
        day.day
      )
    )
  )
);

window.addEventListener('load', () => {
  let donutCharts = document.querySelectorAll('.chart-donut');
  donutCharts.forEach((item, index) => {
    let canvas = item.querySelector('canvas'),
      chart = new Burlak.Chart.Donut({
        element: canvas,
        data: new Array(Math.round(Math.random() * 10) || 1)
          .fill(null)
          .map((_, index) => ({
            value: Math.random().toFixed(2),
            label: 'Label ' + index,
          })),
        settings: {
          hover: {
            enabled: false,
          },
          texts: {
            slicePercent: {
              enabled: false,
            },
          },
        },
      });
  });

  let pieCharts = document.querySelectorAll('.chart-pie');
  pieCharts.forEach((item, index) => {
    let canvas = item.querySelector('canvas'),
      chart = new Burlak.Chart.Pie({
        element: canvas,
        data: new Array(Math.round(Math.random() * 10) || 1)
          .fill(null)
          .map((_, index) => ({
            value: Math.random().toFixed(2),
            label: 'Label ' + index,
          })),
        settings: {
          texts: {
            slicePercent: {
              enabled: true,
            },
          },
        },
      });
  });

  let radarCharts = document.querySelectorAll('.chart-radar');
  radarCharts.forEach((item, index) => {
    let canvas = item.querySelector('canvas'),
      dataCount = 6,
      data = {
        labels: new Array(dataCount).fill().map((item, index) => {
          return 'Label ' + index;
        }),
        datasets: new Array(2).fill().map((item, index) => {
          return {
            name: 'Dataset ' + index,
            values: new Array(dataCount).fill().map((item, index) => {
              return Math.ceil(Math.random() * 10);
            }),
          };
        }),
      },
      chart = new Burlak.Chart.Radar({
        element: canvas,
        data,
      });
  });
});
