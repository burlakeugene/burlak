import defaultSettings from './defaultSettings';
import Chart from '../chart';

import {
  generateRandomColor,
  getPointOnArc,
  intersectionPolygon,
  colorChangeTone,
} from '../../common';

export default class Example extends Chart {
  constructor(props) {
    props.defaultSettings = defaultSettings;
    super(props);
    this.generateData();
  }
  getCoords() {
    let { canvas, settings } = this,
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
      piPart = (Math.PI * 2) / settings.top.count;

    return {
      width,
      widthHalf: width / 2,
      x,
      y,
      piStart,
      piPart,
    };
  }
  drawTooltip() {}
  draw() {
    const { canvas, settings, state } = this;
    const { styles, count, top } = settings;
    const { context } = canvas;
    const coords = this.getCoords();
    context.strokeStyle = styles.color;
    context.lineWidth = styles.width;

    for (let i = 0; i <= this.data.length - 1; i++) {
      context.drawCurve(
        this.data[i].map((value, index) =>
          getPointOnArc(
            coords.x,
            coords.y,
            value * state.loading,
            coords.piStart + coords.piPart * index
          )
        ),
        {
          closePath: true,
        }
      );
    }
  }

  generateData() {
    this.data = [];
    const { canvas, settings } = this;
    const { styles, count, top } = settings;
    const coords = this.getCoords();

    const basePoints = new Array(top.count).fill(0).map(() => (coords.widthHalf * Math.min(1, Math.random() + 0.5)))

    for (let i = 0; i <= count - 1; i++) {
      const points = basePoints.map((point) => {
        return point - i * 10
      });

      this.data.push(points);
    }
  }

  morph() {
    const delta = 1 * (Math.random() >= 0.5 ? 1 : -1);
    this.data = this.data.map((circle) => circle.map((point, index) => {
      return point + Math.random() * delta;
    }))
    this.render();
  }

  render(info = {}) {
    let time = 300;
    if (this.renderTimeout) clearTimeout(this.renderTimeout);
    this.renderTimeout = setTimeout(() => {
      super.baseRender();
      this.draw();
      this.morph();
      this.drawTooltip();
    }, time / 60);
  }
}
