import {
  generateRandomColor,
  intersectionPolygon,
  colorChangeTone,
  hexAverage,
} from '../../common';
import defaultSettings from './defaultSettings';
import Chart from '../chart';

export default class Example extends Chart {
  constructor(props) {
    props.defaultSettings = defaultSettings;
    super(props);
  }
  prepareData(data = []) {
    data.forEach((item) => {
      item.color = item.color || generateRandomColor();
      item.state = item.state || 0;
    });
    return data;
  }
  drawTooltip() {
    let { data } = this,
      hovered = data.find((item) => {
        return item.hovered;
      });
    if (hovered) {
      super.drawTooltip({
        title: {
          text: hovered.label,
        },
        panels: [
          {
            colorPanel: {
              color: hovered.color,
            },
            texts: [
              {
                text: 'Value: ' + hovered.value,
              },
            ],
          },
        ],
        render: (obj) => {},
      });
    }
  }
  getDrawRect() {
    let { canvas, settings, data } = this,
      { element } = canvas,
      result = {
        xStart: settings.offset.left,
        xEnd: element.clientWidth - settings.offset.right,
        yStart: settings.offset.top,
        yEnd: element.clientHeight - settings.offset.bottom,
      };
    result.width = result.xEnd - result.xStart;
    result.height = result.yEnd - result.yStart;
    result.center = result.xStart + result.width / 2;
    result.partHeight = result.height / data.length;
    return result;
  }
  drawFunnel() {
    let { canvas, settings, data, cursor, type, state } = this,
      { context, element } = canvas,
      max = Math.max(...data.map((item) => item.value)),
      rect = this.getDrawRect();
    data = this.prepareData(data);
    let bezierLeft = [],
      bezierRight = [];
    for (let i = 0; i <= data.length - 1; i++) {
      let item = data[i],
        nextItem = data[i + 1],
        prevItem = data[i - 1],
        yStart = rect.yStart + rect.partHeight * i,
        yEnd = yStart + rect.partHeight,
        width = (item.value / max) * rect.width,
        nextWidth = nextItem ? (nextItem.value / max) * rect.width : width;
      width *= state.loading;
      nextWidth *= state.loading;
      context.beginPath();
      context.strokeStyle = 'transparent';
      let color = colorChangeTone(
        item.color,
        settings.hover.enable && item.state
          ? settings.hover.value * item.state
          : 1
      );
      if (settings.area?.gradient) {
        let nextColor = nextItem
            ? colorChangeTone(
                nextItem.color,
                settings.hover.enable && nextItem.state
                  ? settings.hover.value * nextItem.state
                  : 1
              )
            : color,
          prevColor = prevItem
            ? colorChangeTone(
                prevItem.color,
                settings.hover.enable && prevItem.state
                  ? settings.hover.value * prevItem.state
                  : 1
              )
            : color,
          gradient = context.createLinearGradient(0, yStart, 0, yEnd);
        gradient.addColorStop(0, hexAverage([prevColor, color]));
        gradient.addColorStop(0.3, color);
        gradient.addColorStop(0.7, color);
        gradient.addColorStop(1, hexAverage([color, nextColor]));
        color = gradient;
      }
      context.fillStyle = context.strokeStyle = color;
      let polygon = [
        {
          x: rect.center - width / 2,
          y: yStart,
        },
        {
          x: rect.center - nextWidth / 2,
          y: yEnd,
        },
        {
          x: rect.center + nextWidth / 2,
          y: yEnd,
        },
        {
          x: rect.center + width / 2,
          y: yStart,
        },
      ];
      if (!i) {
        bezierLeft.push([polygon[0].x, polygon[0].y]);
        bezierRight.push([polygon[3].x, polygon[3].y]);
      }
      bezierLeft.push([polygon[1].x, polygon[1].y]);
      bezierRight.push([polygon[2].x, polygon[2].y]);
      for (let p = 0; p <= polygon.length - 1; p++) {
        if (p === 0) context.moveTo(polygon[p].x, polygon[p].y);
        else context.lineTo(polygon[p].x, polygon[p].y);
      }
      context.fill();
      context.closePath();
      context.stroke();

      item.hovered = intersectionPolygon({
        polygon,
        x: cursor.x,
        y: cursor.y,
      });
      super.hover({
        item: item,
        isHovered: item.hovered,
      });

      context.save();

      let x = rect.center,
        y = yEnd - (yEnd - yStart) / 2;
      context.globalAlpha = 1 * state.loading;
      if (settings.label?.enable) {
        context.font =
          '100 ' + settings.label.styles.fontSize * state.loading + 'px arial';
        context.fillStyle = settings.label.styles.color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(
          item.label,
          x,
          yStart + settings.label.styles.fontSize + 5
        );
      }
      if (settings.value?.enable) {
        context.font =
          '100 ' + settings.value.styles.fontSize * state.loading + 'px arial';
        context.fillStyle = settings.value.styles.color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(item.value, x, y);
      }
      context.restore();
    }
    bezierRight.reverse();
  }
  render(info = {}) {
    let time = 300;
    if (this.renderTimeout) clearTimeout(this.renderTimeout);
    this.renderTimeout = setTimeout(() => {
      super.baseRender();
      this.drawFunnel();
      this.drawTooltip();
    }, time / 60);
  }
}
