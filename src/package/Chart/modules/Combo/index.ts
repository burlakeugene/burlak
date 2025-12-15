import Chart from '../';
import {
  generateRandomColor,
  colorChangeTone,
  getHex,
  deepMerge,
} from '../../common';
import settings from './settings';
import { ERenderBy, EType, TProps } from '../types';

type TData = {
  labels: string[];
  datasets: Array<{
    name: string;
    type: 'line' | 'dot' | 'bar';
    values: number[];
    color?: string;
  }>;
};

type TPreparedData = {
  labels: Array<{
    value: string;
    xStart?: number;
    xEnd?: number;
  }>;
  datasets: Array<{
    name: string;
    type: 'line' | 'dot' | 'bar';
    values: Array<{
      value: number;
      index?: number;
      state?: number;
    }>;
    color?: string;
  }>;
};

export default class Combo extends Chart {
  constructor(props: TProps) {
    super({
      ...props,
      type: EType.COMBO,
      settings: deepMerge(structuredClone(settings), props.settings || {}),
    });
  }

  prepareData(data: TData): TPreparedData {
    const maxCount = Math.max(
      ...data.datasets.map((datasets) => (datasets.values || []).length)
    );

    const bars = data.datasets.filter((dataset) => dataset.type === 'bar');

    if (bars.length) {
      this.settings.data.initialValue = 0;
      const drawRect = this.getRect('bar');
      const partWidth = drawRect.width / maxCount;

      this.settings.data.line.offset.left = partWidth / 2;
      this.settings.data.line.offset.right = partWidth / 2;
    }

    return {
      labels: data.labels.map((label) => ({
        value: label,
      })),
      datasets: data.datasets.map((dataset, index) => {
        const color = getHex(dataset.color) || generateRandomColor();

        const sameCount = data.datasets.filter(
          (datasetInner) => datasetInner.type === dataset.type
        ).length;

        return {
          ...dataset,
          color,
          sameCount,
          index,
          values: [
            ...dataset.values,
            ...new Array(
              maxCount > dataset.values.length
                ? maxCount - dataset.values.length
                : 0
            ).fill(0),
          ].map((value, index) => ({
            name: dataset.name,
            index,
            color,
            value,
            state: 0,
          })),
        };
      }),
    };
  }

  getData = () => this.data as TPreparedData;

  grid() {
    const canvas = this.canvas;
    const settings = this.getSettings();

    if (!settings.grid.enabled) {
      return;
    }

    canvas.context.save();
    const left = 0 + settings.offset.left;
    const right =
      canvas.element.clientWidth - settings.offset.right - settings.offset.left;
    const top = 0 + settings.offset.top;
    const bottom =
      canvas.element.clientHeight -
      settings.offset.bottom -
      settings.offset.top;

    canvas.context.lineWidth = settings.grid.styles.borderWidth;
    canvas.context.strokeStyle = settings.grid.styles.borderColor;
    canvas.context.fillStyle = settings.grid.styles.background;

    if (settings.grid.styles.dash) {
      canvas.context.setLineDash(settings.grid.styles.dash);
    }

    canvas.context.beginPath();
    canvas.context.roundRect(
      left,
      top,
      right,
      bottom,
      settings.grid.styles.borderRadius
    );
    canvas.context.fill();
    canvas.context.closePath();
    canvas.context.stroke();
    canvas.context.restore();

    if (settings.grid.horizontal?.enabled) {
      canvas.context.save();
      const array = [];
      const step =
        (canvas.element.clientHeight -
          settings.offset.top -
          settings.offset.bottom) /
        (settings.grid.horizontal.step + 1);
      const stepPx =
        (canvas.element.clientHeight -
          settings.offset.top -
          settings.offset.bottom) /
        settings.grid.horizontal.step;
      const yStart = settings.offset.top;

      const styles = {
        ...settings.grid.styles,
        ...(settings.grid.horizontal.styles || {}),
      };

      const type = settings.grid.horizontal.type || settings.grid.type;

      if (type === 'px') {
        for (let i = 1; i < stepPx; i++) {
          let y = yStart + i * settings.grid.horizontal.step;
          array.push(y);
        }
      } else {
        for (let i = 1; i < settings.grid.horizontal.step + 1; i++) {
          let y = yStart + i * step;
          array.push(y);
        }
      }

      canvas.context.lineWidth = styles.borderWidth;
      canvas.context.strokeStyle = styles.borderColor;

      if (styles.dash) {
        canvas.context.setLineDash(styles.dash);
      }

      for (let i = 0; i <= array.length - 1; i++) {
        canvas.context.beginPath();
        canvas.context.lineTo(0 + settings.offset.left, array[i]);
        canvas.context.lineTo(
          canvas.element.clientWidth - settings.offset.right,
          array[i]
        );
        canvas.context.stroke();
      }
      canvas.context.restore();
    }

    if (settings.grid.vertical?.enabled) {
      canvas.context.save();
      const array = [];
      const step =
        (canvas.element.clientWidth -
          settings.offset.right -
          settings.offset.left) /
        (settings.grid.vertical.step + 1);
      const stepPx =
        (canvas.element.clientWidth -
          settings.offset.right -
          settings.offset.left) /
        settings.grid.vertical.step;
      const xStart = settings.offset.left;
      const styles = {
        ...settings.grid.styles,
        ...(settings.grid.vertical.styles || {}),
      };
      const type = settings.grid.vertical.type || settings.grid.type;

      if (type === 'px') {
        for (let i = 1; i < stepPx; i++) {
          let x = xStart + i * settings.grid.vertical.step;
          array.push(x);
        }
      } else {
        for (let i = 1; i < settings.grid.vertical.step + 1; i++) {
          let x = xStart + i * step;
          array.push(x);
        }
      }

      canvas.context.lineWidth = styles.borderWidth;
      canvas.context.strokeStyle = styles.borderColor;
      if (styles.dash) {
        canvas.context.setLineDash(styles.dash);
      }
      for (let i = 0; i <= array.length - 1; i++) {
        canvas.context.beginPath();
        canvas.context.lineTo(array[i], 0 + settings.offset.top);
        canvas.context.lineTo(
          array[i],
          canvas.element.clientHeight - settings.offset.bottom
        );
        canvas.context.stroke();
      }
      canvas.context.restore();
    }
    canvas.context.restore();
  }

  labels() {
    const canvas = this.canvas;
    const data = this.getData();
    const settings = this.getSettings();
    const count = data.labels.length;

    if (!settings.labels?.enabled || !count) {
      return;
    }

    const viewRect = this.getRect('view');
    const width = viewRect.width / (count - 1);
    const start = viewRect.left;
    const y = canvas.element.clientHeight - settings.offset.bottom / 2;

    data.labels.forEach((label, index) => {
      const x = start + width * index;
      canvas.context.font =
        '100 ' + settings.labels.styles.fontSize + 'px arial';
      canvas.context.fillStyle = settings.labels.styles.color;
      canvas.context.textAlign = 'center';
      canvas.context.textBaseline = 'middle';

      if (!index) {
        label.xStart = viewRect.left;
        label.xEnd = x + width / 2;
      } else if (index === count - 1) {
        label.xStart = x - width / 2;
        label.xEnd = viewRect.width + viewRect.left;
      } else {
        label.xStart = x - width / 2;
        label.xEnd = x + width / 2;
      }
      canvas.context.fillText(label.value, x, y);
    });
  }

  values() {
    const canvas = this.canvas;
    const settings = this.getSettings();

    if (!settings.values?.enabled) {
      return;
    }

    const x = settings.offset.left / 2;
    const values = this.getValues();
    const max = Math.max(...values);
    const min = Math.min(...values);

    canvas.context.font = '100 ' + settings.values.styles.fontSize + 'px arial';
    canvas.context.fillStyle = settings.values.styles.color;
    canvas.context.textAlign = 'center';
    canvas.context.textBaseline = 'middle';

    const texts = [];
    const step = (max - min) / (settings.values.count - 1);

    for (let i = 0; i <= settings.values.count - 1; i++) {
      const value = max - step * i;

      texts.push({
        value: i === 0 ? max : i === settings.values.count - 1 ? min : value,
        x,
        y: this.getInterpolation(value, values),
      });
    }

    texts.forEach((text) => {
      canvas.context.fillText(
        text.value.toFixed(settings.values.digits),
        text.x,
        text.y
      );
    });
  }

  getInterpolation(value: number, values: number[]) {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const max = Math.max(...values);
    const min = Math.min(...values);
    const top =
      settings.offset.top +
      settings.grid.offset.top +
      settings.grid.styles.borderWidth;
    const percent =
      ((value * this.state.loading - min * (min > 0 ? this.state.loading : 1)) *
        100) /
      (max - min) /
      100;
    const height =
      canvas.element.clientHeight -
      settings.offset.top -
      settings.grid.offset.top -
      settings.offset.bottom -
      settings.grid.offset.bottom -
      settings.grid.styles.borderWidth * 2;

    return top + height - height * percent;
  }

  getDatasets() {
    let { data } = this;
    return data.datasets;
  }
  getValues(): number[] {
    let { data } = this.settings,
      acc = [];
    if (data.initialValue || data.initialValue === 0)
      acc.push(data.initialValue);
    let datasets = this.getDatasets(),
      result = datasets.reduce((acc, dataset) => {
        return [...acc, ...dataset.values.map((value) => value.value)];
      }, acc);

    return result;
  }

  drawData() {
    let { settings } = this,
      { data } = settings,
      { enable } = data,
      datasets = this.getDatasets();
    if (!enable) return;
    let bars = datasets.filter((dataset) => {
      return dataset.type === 'bar';
    });
    bars.forEach((dataset) => {
      let { type } = dataset;
      type = type.toUpperCase();
      this['draw' + type] && this['draw' + type](dataset);
    });
    let lines = datasets.filter((dataset) => {
      return dataset.type === 'line' || dataset.type === 'dot';
    });
    lines.forEach((dataset) => {
      let { type } = dataset;
      type = type.toUpperCase();
      this.drawLINE(dataset);
    });
  }

  getRect(type) {
    let { canvas, settings } = this,
      { offset, grid, data } = settings,
      { element, context } = canvas,
      viewRect = {
        top: offset.top + grid.styles.borderWidth,
        left: offset.left + grid.styles.borderWidth,
        right: offset.right + grid.styles.borderWidth,
        bottom: offset.bottom - grid.styles.borderWidth,
        width:
          element.clientWidth -
          offset.left -
          offset.right -
          grid.styles.borderWidth * 2,
        height:
          element.clientHeight -
          offset.top -
          offset.bottom -
          grid.styles.borderWidth * 2,
      },
      gridRect = {
        top: viewRect.top + grid.offset.top,
        left: viewRect.left + grid.offset.left,
        right: viewRect.right + grid.offset.right,
        bottom: viewRect.bottom - grid.offset.bottom,
        width: viewRect.width - grid.offset.left - grid.offset.right,
        height: viewRect.height - grid.offset.top - grid.offset.bottom,
      },
      barRect = gridRect,
      lineRect = {
        ...gridRect,
        left: gridRect.left + data.line.offset.left,
        right: gridRect.right + data.line.offset.right,
        width: gridRect.width - data.line.offset.left - data.line.offset.right,
      },
      obj = {
        view: viewRect,
        grid: gridRect,
        bar: barRect,
        line: lineRect,
      };

    return type && obj[type] ? obj[type] : obj;
  }
  drawLINE(dataset) {
    let { canvas, settings } = this,
      { data, offset, grid } = settings,
      { element, context } = canvas,
      { line } = data,
      { lineWidth } = line.styles,
      { values, color, smooth } = dataset,
      drawRect = this.getRect('line'),
      viewRect = this.getRect('view'),
      drawStart = drawRect.left,
      partWidth =
        drawRect.width / (values.length === 1 ? 1 : values.length - 1);
    values.forEach((value, index) => {
      let x = drawStart + partWidth * index,
        y = this.getInterpolation(value.value, this.getValues());
      value.x = x;
      value.y = y;
      value.isFirst = !index;
      value.isLast = index === values.length - 1;
      value.area = {
        xStart: value.isFirst ? viewRect.left : x - partWidth / 2,
        yStart: drawRect.top,
        xEnd: value.isLast
          ? element.clientWidth - viewRect.right
          : x + partWidth / 2,
        yEnd: drawRect.top + drawRect.height,
      };
      this.checkIsHovered(value);
    });
    if (dataset.type === 'line') {
      context.strokeStyle = dataset.color;
      context.lineWidth = lineWidth;
      context.lineJoin = 'round';
      if (smooth) {
        context.drawLineCurve(values);
      } else {
        context.beginPath();
        values.forEach((value, index) => {
          if (!index) {
            context.moveTo(value.x, value.y);
          } else {
            context.lineTo(value.x, value.y);
          }
        });
        context.stroke();
      }
    }
    if (dataset.type === 'dot' || line?.dots?.enable) {
      context.fillStyle = dataset.color;
      context.strokeStyle = colorChangeTone(dataset.color, -50);
      values.forEach((value, index) => {
        context.beginPath();
        context.arc(
          value.x,
          value.y,
          line.dots.width +
            (line.dots.hover.enable ? line.dots.hover.width * value.state : 0),
          0,
          2 * Math.PI
        );
        context.fill();
        context.closePath();
        context.stroke();
      });
    }
  }
  drawBAR(dataset) {
    let { canvas, settings, cursor } = this,
      { data } = settings,
      { element, context } = canvas,
      { bar } = data,
      { values } = dataset,
      drawRect = this.getRect('bar'),
      viewRect = this.getRect('view'),
      drawStart = drawRect.left,
      partWidth = drawRect.width / values.length;
    data.line.offset.left = partWidth / 2;
    data.line.offset.right = partWidth / 2;
    values.forEach((value, index) => {
      value.isFirst = !index;
      value.isLast = index === values.length - 1;
      context.beginPath();
      let color = colorChangeTone(
        dataset.color,
        bar?.hover?.enable ? bar.hover.value * value.state : 1
      );
      context.strokeStyle = color;
      context.fillStyle = color;
      let barWidth = partWidth / dataset.count - bar.offset / dataset.count,
        x =
          drawStart +
          bar.offset / 2 +
          partWidth * index +
          barWidth * (dataset.index - 1),
        xStart = x,
        xEnd = x + barWidth,
        y = this.getInterpolation(value.value, this.getValues()),
        y0 = this.getInterpolation(0, this.getValues());
      value.area = {
        xStart: value.isFirst ? viewRect.left : drawStart + partWidth * index,
        yStart: drawRect.top,
        xEnd: value.isLast
          ? element.clientWidth - viewRect.right
          : drawStart +
            partWidth * index +
            barWidth * dataset.count +
            bar.offset,
        yEnd: drawRect.top + drawRect.height,
      };
      this.checkIsHovered(value);
      context.moveTo(xStart, y0);
      context.lineTo(xStart, y);
      context.lineTo(xEnd, y);
      context.lineTo(xEnd, y0);
      context.fill();
    });
  }
  checkIsHovered(item) {
    let { cursor } = this,
      { area } = item,
      bool =
        cursor.x >= area.xStart &&
        cursor.x < area.xEnd &&
        cursor.y >= area.yStart &&
        cursor.y < area.yEnd;
    item.isHovered = bool;
    super.hover({
      item,
      isHovered: bool,
    });
    return bool;
  }
  tooltip() {
    let { settings, data, cursor } = this,
      hovered = data.datasets.map((dataset) => {
        return dataset.values.filter((value) => value.isHovered);
      });
    hovered = hovered.reduce((acc, panel) => {
      return [...acc, ...panel];
    }, []);
    if (!hovered.length) return;
    let labels = data.labels.filter((label) => {
        return label.xStart <= cursor.x && label.xEnd >= cursor.x;
      }),
      label = labels[labels.length - 1];
    super.tooltip({
      title: {
        value: label?.text || '',
      },
      panels: hovered.map((panel) => ({
        colorPanel: {
          color: panel.color,
        },
        texts: [
          {
            text: 'Value: ' + panel.value.toFixed(settings.data.digits),
          },
        ],
        footer: {
          text: panel.name,
        },
      })),
    });
  }
  render = (props: { by: ERenderBy }) => {
    let time = 300;

    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = window.setTimeout(() => {
      super.baseRender(props);
      this.grid();
      this.labels();
      // this.data();
      this.values();
      // this.drawTooltip();
    }, time / 60);
  };
}
