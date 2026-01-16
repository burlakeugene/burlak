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
    smooth?: boolean;
  }>;
};

type TPreparedData = {
  labels: Array<{
    value: string;
    xStart?: number;
    xEnd?: number;
  }>;
  datasets: Array<{
    index: number;
    name: string;
    sameCount: number;
    smooth?: boolean;
    type: 'line' | 'dot' | 'bar';
    values: Array<{
      name: string;
      value: number;
      index?: number;
      state?: number;
      first?: boolean;
      last?: boolean;
      hovered?: boolean;
      color?: string;
      x?: number;
      y?: number;
      area?: {
        xStart: number;
        yStart: number;
        xEnd: number;
        yEnd: number;
      };
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

    const lineRect = this.getRect('line');
    const viewRect = this.getRect('view');
    const width = lineRect.width / (count - 1);
    const start = lineRect.left;
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

  getValues(): number[] {
    const data = this.getData();
    const settings = this.getSettings();
    const acc = [];

    if (settings.data.initialValue || settings.data.initialValue === 0) {
      acc.push(settings.data.initialValue);
    }

    return data.datasets.reduce(
      (acc, dataset) => [...acc, ...dataset.values.map((value) => value.value)],
      acc
    );
  }

  datasets() {
    const data = this.getData();
    const settings = this.getSettings();

    if (!settings.data.enabled) {
      return;
    }

    data.datasets.forEach((dataset) => {
      this.draw?.[dataset.type]?.(dataset);
    });
  }

  draw = {
    bar: (dataset: TPreparedData['datasets'][number]) => {
      const canvas = this.canvas;
      const settings = this.getSettings();
      const barRect = this.getRect('bar');
      const viewRect = this.getRect('view');
      const drawStart = barRect.left;
      const partWidth = barRect.width / dataset.values.length;

      settings.data.line.offset.left = settings.data.line.offset.right =
        partWidth / 2;

      dataset.values.forEach((value, index) => {
        value.first = !index;
        value.last = index === dataset.values.length - 1;

        canvas.context.beginPath();

        const color = colorChangeTone(
          dataset.color,
          settings.data.bar?.hover?.enabled
            ? settings.data.bar.hover.value * value.state
            : 1
        );

        canvas.context.strokeStyle = color;
        canvas.context.fillStyle = color;

        const barWidth =
          partWidth / dataset.sameCount -
          settings.data.bar.offset / dataset.sameCount;
        const x =
          drawStart +
          settings.data.bar.offset / 2 +
          partWidth * index +
          barWidth * dataset.index;

        const xStart = x;
        const xEnd = x + barWidth;
        const y = this.getInterpolation(value.value, this.getValues());
        const y0 = this.getInterpolation(0, this.getValues());

        value.area = {
          xStart: value.first ? viewRect.left : drawStart + partWidth * index,
          yStart: barRect.top,
          xEnd: value.last
            ? canvas.element.clientWidth - viewRect.right
            : drawStart +
              partWidth * index +
              barWidth * dataset.sameCount +
              settings.data.bar.offset,
          yEnd: barRect.top + barRect.height,
        };

        this.checkIsHovered(value);

        canvas.context.moveTo(xStart, y0);
        canvas.context.lineTo(xStart, y);
        canvas.context.lineTo(xEnd, y);
        canvas.context.lineTo(xEnd, y0);
        canvas.context.fill();
      });
    },
    line: (dataset: TPreparedData['datasets'][number]) => {
      const canvas = this.canvas;
      const settings = this.getSettings();
      const drawRect = this.getRect('line');
      const viewRect = this.getRect('view');
      const drawStart = drawRect.left;
      const partWidth =
        drawRect.width /
        (dataset.values.length === 1 ? 1 : dataset.values.length - 1);

      // let { canvas, settings } = this,
      //   { data, offset, grid } = settings,
      //   { element, context } = canvas,
      //   { line } = data,
      //   { lineWidth } = line.styles,
      //   { values, color, smooth } = dataset,
      //   drawRect = this.getRect('line'),
      //   viewRect = this.getRect('view'),
      //   drawStart = drawRect.left,
      //   partWidth =
      //     drawRect.width / (values.length === 1 ? 1 : values.length - 1);
      dataset.values.forEach((value, index) => {
        let x = drawStart + partWidth * index,
          y = this.getInterpolation(value.value, this.getValues());
        value.x = x;
        value.y = y;
        value.first = !index;
        value.last = index === dataset.values.length - 1;
        value.area = {
          xStart: value.first ? viewRect.left : x - partWidth / 2,
          yStart: drawRect.top,
          xEnd: value.last
            ? canvas.element.clientWidth - viewRect.right
            : x + partWidth / 2,
          yEnd: drawRect.top + drawRect.height,
        };
        this.checkIsHovered(value);
      });

      if (dataset.type === 'line') {
        canvas.context.strokeStyle = dataset.color;
        canvas.context.lineWidth = settings.data.line.styles.lineWidth;
        canvas.context.lineJoin = 'round';

        if (dataset.smooth) {
          canvas.context.drawLineCurve(
            dataset.values.map((item) => ({ x: item.x, y: item.y }))
          );
        } else {
          canvas.context.beginPath();

          dataset.values.forEach((value, index) => {
            if (!index) {
              canvas.context.moveTo(value.x, value.y);
            } else {
              canvas.context.lineTo(value.x, value.y);
            }
          });

          canvas.context.stroke();
        }
      }
      if (dataset.type === 'dot' || settings.data.line?.dots?.enabled) {
        canvas.context.fillStyle = dataset.color;
        canvas.context.strokeStyle = colorChangeTone(dataset.color, -50);
        dataset.values.forEach((value, index) => {
          canvas.context.beginPath();
          canvas.context.arc(
            value.x,
            value.y,
            settings.data.line.dots.width +
              (settings.data.line.dots.hover.enabled
                ? settings.data.line.dots.hover.width * value.state
                : 0),
            0,
            2 * Math.PI
          );
          canvas.context.fill();
          canvas.context.closePath();
          canvas.context.stroke();
        });
      }
    },
    dot: (dataset) => this.draw.line(dataset),
  };

  getRect(type) {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const { offset, grid, data } = settings;
    const { element } = canvas;

    const viewRect = {
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
    };
    const gridRect = {
      top: viewRect.top + grid.offset.top,
      left: viewRect.left + grid.offset.left,
      right: viewRect.right + grid.offset.right,
      bottom: viewRect.bottom - grid.offset.bottom,
      width: viewRect.width - grid.offset.left - grid.offset.right,
      height: viewRect.height - grid.offset.top - grid.offset.bottom,
    };
    const barRect = gridRect;
    const lineRect = {
      ...gridRect,
      left: gridRect.left + data.line.offset.left,
      right: gridRect.right + data.line.offset.right,
      width: gridRect.width - data.line.offset.left - data.line.offset.right,
    };
    const obj = {
      view: viewRect,
      grid: gridRect,
      bar: barRect,
      line: lineRect,
    };

    return type && obj[type] ? obj[type] : obj;
  }

  checkIsHovered(item) {
    const cursor = this.cursor;

    item.hovered =
      cursor.x >= item.area.xStart &&
      cursor.x < item.area.xEnd &&
      cursor.y >= item.area.yStart &&
      cursor.y < item.area.yEnd;

    super.hover({
      item,
      isHovered: item.hovered,
    });

    return item.hovered;
  }

  tooltip() {
    const settings = this.getSettings();
    const data = this.getData();

    const hovered = data.datasets.reduce((acc, dataset) => {
      const items = dataset.values.filter((value) => value.hovered);

      return [...acc, ...items];
    }, []);

    if (!hovered.length) {
      return;
    }

    const index = hovered[hovered.length - 1].index;

    const label = data.labels[index];

    super.tooltip({
      title: {
        value: label?.value || '',
      },
      panels: hovered.map((panel) => ({
        colorPanel: {
          color: panel.color,
        },
        texts: [
          {
            value: 'Value: ' + panel.value.toFixed(settings.data.digits),
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
      this.datasets();
      this.values();
      this.tooltip();
    }, time / 60);
  };
}
