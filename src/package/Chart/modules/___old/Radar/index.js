import {
  generateRandomColor,
  getPointOnArc,
  intersectionPolygon,
  colorChangeTone,
} from '../../common';
import defaultSettings from './defaultSettings';
import Chart from '../chart';

export default class Example extends Chart {
  constructor(props) {
    props.defaultSettings = defaultSettings;
    super(props);
  }
  prepareData(data = {}) {
    let labels = data.labels;
    data.datasets.forEach((item, parentIndex) => {
      item.color = item.color || generateRandomColor();
      item.state = item.state || 0;
      if (item.values.length > labels.length)
        item.values.length = labels.length;
      if (item.values.length < labels.length) {
        for (let i = item.values.length; i < labels.length; i++) {
          item.values.push(0);
        }
      }
      item.values = item.values.map((value, index) => {
        return {
          value,
          parentIndex,
          index,
        };
      });
    });
    return data;
  }
  getCoords() {
    let { canvas, settings, data } = this,
      { context, element } = canvas,
      width = Math.min(
        element.clientHeight - settings.offset.top - settings.offset.bottom,
        element.clientWidth - settings.offset.left - settings.offset.right
      ),
      x =
        element.clientWidth / 2 + settings.offset.left - settings.offset.right,
      y =
        element.clientHeight / 2 + settings.offset.top - settings.offset.bottom,
      piStart = -(Math.PI / 2),
      piPart = (Math.PI * 2) / data.labels.length;
    return {
      width,
      widthHalf: width / 2,
      x,
      y,
      piStart,
      piPart,
    };
  }
  drawTooltip() {
    let data = this.data.datasets
        .map((dataset) => {
          return dataset.values;
        })
        .flat(),
      { labels } = this.data,
      hovered = data.filter((item) => {
        return item.hovered;
      });
    if (hovered.length) {
      super.drawTooltip({
        title: {
          text: labels[hovered[0]['index']],
        },
        panels: hovered.map((item) => {
          return {
            colorPanel: {
              color: this.data.datasets[item['parentIndex']].color,
            },
            texts: [
              {
                text: 'Value: ' + item.value,
              },
            ],
            footer: {
              text: this.data.datasets[item['parentIndex']].name,
            },
          };
        }),
        render: (obj) => {},
      });
    }
  }
  drawScheme() {
    let { canvas, settings, data, cursor, type, state } = this,
      { context, element } = canvas,
      { scheme } = settings,
      coords = this.getCoords();
    for (let i = 0; i <= data.labels.length - 1; i++) {
      let point = getPointOnArc(
        coords.x,
        coords.y,
        coords.widthHalf,
        coords.piStart + coords.piPart * i
      );
      context.strokeStyle = scheme.styles.color;
      context.lineWidth = scheme.styles.width;
      context.beginPath();
      context.moveTo(coords.x, coords.y);
      context.lineTo(point.x, point.y);
      context.fill();
      context.stroke();
      for (let l = 0; l <= scheme.count; l++) {
        let partSliceWidth = coords.widthHalf / scheme.count;
        let currentPoint = getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf - partSliceWidth * l,
            coords.piStart + coords.piPart * i
          ),
          prevPoint = getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf - partSliceWidth * l,
            coords.piStart + coords.piPart * (i - 1)
          );
        context.beginPath();
        context.moveTo(currentPoint.x, currentPoint.y);
        context.lineTo(prevPoint.x, prevPoint.y);
        context.fill();
        context.stroke();
      }
    }
  }
  drawLabels() {
    let { canvas, settings, data, cursor, type, state } = this,
      { context, element } = canvas,
      { labels } = settings,
      coords = this.getCoords();
    for (let i = 0; i <= data.labels.length - 1; i++) {
      if (labels.enable) {
        context.save();
        let point = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf + labels.offset,
          coords.piStart + coords.piPart * i
        );
        let label = data.labels[i] || '';
        context.globalAlpha = 1 * state.loading;
        context.font =
          '100 ' + labels.styles.fontSize * state.loading + 'px arial';
        context.textAlign = (() => {
          if (point.x > coords.x) return 'left';
          if (point.x < coords.x) return 'right';
          return 'center';
        })();
        context.textBaseline = 'middle';
        context.fillStyle = labels.styles.color;
        context.fillText(label, point.x, point.y);
        context.restore();
      }
    }
  }
  drawData() {
    let { canvas, settings, data, cursor, type, state } = this,
      { context, element } = canvas,
      coords = this.getCoords(),
      flatList = data.datasets
        .map((data) => {
          return data.values;
        })
        .flat()
        .map((value) => {
          return value.value;
        }),
      max = Math.max(...flatList);

    for (let i = 0; i <= data.datasets.length - 1; i++) {
      let dataset = data.datasets[i];
      context.strokeStyle = dataset.color;
      context.fillStyle = dataset.color;
      context.lineWidth = settings.data.line.styles.width;
      context.beginPath();
      for (let d = 0; d <= dataset.values.length - 1; d++) {
        let value = dataset.values[d],
          percent = value.value / max,
          point = getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf * percent * state.loading,
            coords.piStart + coords.piPart * d
          );
        value.coords = point;
        d === 0
          ? context.moveTo(point.x, point.y)
          : context.lineTo(point.x, point.y);
      }
      context.globalAlpha = 0.5;
      context.fill();
      context.globalAlpha = 1;
      context.closePath();
      context.stroke();
      for (let d = 0; d <= dataset.values.length - 1; d++) {
        let value = dataset.values[d],
          percent = value.value / max,
          point = getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf * percent * state.loading,
            coords.piStart + coords.piPart * d
          ),
          polygon = [
            {
              x: coords.x,
              y: coords.y,
            },
            getPointOnArc(
              coords.x,
              coords.y,
              coords.widthHalf,
              coords.piStart + coords.piPart * d - coords.piPart / 2
            ),
            getPointOnArc(
              coords.x,
              coords.y,
              coords.widthHalf,
              coords.piStart + coords.piPart * d
            ),
            getPointOnArc(
              coords.x,
              coords.y,
              coords.widthHalf,
              coords.piStart + coords.piPart * d + coords.piPart / 2
            ),
          ];
        value.hovered = intersectionPolygon({
          polygon,
          x: cursor.x,
          y: cursor.y,
        });
        super.hover({
          item: value,
          isHovered: value.hovered,
        });

        if (settings.data.dots.enable) {
          let dotSize = settings.data.dots.styles.width * state.loading;
          if(value.hasOwnProperty('state')) dotSize += (settings.data.dots.styles.hover.width - settings.data.dots.styles.width) * value.state;
          context.beginPath();
          context.arc(
            point.x,
            point.y,
            dotSize,
            0,
            2 * Math.PI
          );
          context.fill();
          context.closePath();
          context.stroke();
        }
      }
    }
  }
  render(info = {}) {
    let time = 300;
    if (this.renderTimeout) clearTimeout(this.renderTimeout);
    this.renderTimeout = setTimeout(() => {
      super.baseRender();
      this.drawScheme();
      this.drawLabels();
      this.drawData();
      this.drawTooltip();
    }, time / 60);
  }
}
