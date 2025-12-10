import Chart from '../';
import { ERenderBy, EType, TProps } from '../types';
import {
  deepMerge,
  generateRandomColor,
  getPointOnArc,
  intersectionPolygon,
} from '../../common';

import settings from './settings';

type TData = {
  labels: string[];
  datasets: Array<{
    name: string;
    values: number[];
    color?: string;
  }>;
};

type TPreparedData = {
  labels: string[];
  datasets: Array<{
    name: string;
    color?: string;
    values: Array<{
      value: number;
      name: string;
      dataset: number;
      index: number;
      coords?: ReturnType<typeof getPointOnArc>;
      hovered?: boolean;
      state?: number;
    }>;
  }>;
};

export default class Radar extends Chart {
  constructor(props: TProps) {
    super({
      ...props,
      type: EType.RADAR,
      settings: deepMerge(structuredClone(settings), props.settings || {}),
    });
  }

  prepareData(data: TData): TPreparedData {
    return {
      labels: data.labels || [],
      datasets: data.datasets.reduce((acc, dataset, datasetIndex) => {
        const nextDataset = {
          ...dataset,
          color: dataset.color || generateRandomColor(),
          values: dataset.values || [],
        };

        if (nextDataset.values.length > data.labels.length) {
          nextDataset.values.length = data.labels.length;
        }

        if (nextDataset.values.length < data.labels.length) {
          for (let i = nextDataset.values.length; i < data.labels.length; i++) {
            nextDataset.values.push(0);
          }
        }

        acc.push({
          ...nextDataset,
          values: dataset.values.map((value, index) => ({
            value,
            dataset: datasetIndex,
            index,
          })),
        });

        return acc;
      }, []),
    };
  }

  getData = () => this.data as TPreparedData;

  getCoords() {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const data = this.getData();
    const width = Math.min(
      canvas.element.clientHeight -
        settings.offset.top -
        settings.offset.bottom,
      canvas.element.clientWidth - settings.offset.left - settings.offset.right
    );
    const x =
      canvas.element.clientWidth / 2 +
      settings.offset.left -
      settings.offset.right;
    const y =
      canvas.element.clientHeight / 2 +
      settings.offset.top -
      settings.offset.bottom;
    const piStart = -(Math.PI / 2);
    const piPart = (Math.PI * 2) / data.labels.length;

    return {
      width,
      widthHalf: width / 2,
      x,
      y,
      piStart,
      piPart,
    };
  }

  tooltip = () => {
    const data = this.getData();
    const values = data.datasets.reduce(
      (acc, item) => [...acc, ...item.values],
      []
    );

    const labels = data.labels;
    const hovered = values.filter((item) => item.hovered);

    if (hovered.length) {
      super.tooltip({
        title: {
          value: labels[hovered[0]['index']],
        },
        panels: hovered.map((item) => {
          return {
            colorPanel: {
              color: this.data.datasets[item['dataset']].color,
            },
            texts: [
              {
                value: 'Value: ' + item.value,
              },
            ],
            footer: {
              text: this.data.datasets[item['dataset']].name,
            },
          };
        }),
      });
    }
  };

  scheme() {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const data = this.getData();
    const coords = this.getCoords();

    for (let i = 0; i <= data.labels.length - 1; i++) {
      let point = getPointOnArc(
        coords.x,
        coords.y,
        coords.widthHalf,
        coords.piStart + coords.piPart * i
      );
      canvas.context.strokeStyle = settings.scheme.styles.color;
      canvas.context.lineWidth = settings.scheme.styles.width;
      canvas.context.beginPath();
      canvas.context.moveTo(coords.x, coords.y);
      canvas.context.lineTo(point.x, point.y);
      canvas.context.fill();
      canvas.context.stroke();

      for (let l = 0; l <= settings.scheme.count; l++) {
        const partSliceWidth = coords.widthHalf / settings.scheme.count;
        const currentPoint = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf - partSliceWidth * l,
          coords.piStart + coords.piPart * i
        );
        const prevPoint = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf - partSliceWidth * l,
          coords.piStart + coords.piPart * (i - 1)
        );
        canvas.context.beginPath();
        canvas.context.moveTo(currentPoint.x, currentPoint.y);
        canvas.context.lineTo(prevPoint.x, prevPoint.y);
        canvas.context.fill();
        canvas.context.stroke();
      }
    }
  }

  labels() {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const data = this.getData();
    const state = this.state;
    const coords = this.getCoords();

    for (let i = 0; i <= data.labels.length - 1; i++) {
      if (settings.labels.enabled) {
        canvas.context.save();

        const point = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf + settings.labels.offset,
          coords.piStart + coords.piPart * i
        );

        const label = data.labels[i] || '';
        canvas.context.globalAlpha = 1 * state.loading;
        canvas.context.font =
          '100 ' + settings.labels.styles.fontSize * state.loading + 'px arial';

        canvas.context.textAlign = 'center';

        if (point.x > coords.x) {
          canvas.context.textAlign = 'left';
        }

        if (point.x < coords.x) {
          canvas.context.textAlign = 'right';
        }

        canvas.context.textBaseline = 'middle';
        canvas.context.fillStyle = settings.labels.styles.color;
        canvas.context.fillText(label, point.x, point.y);
        canvas.context.restore();
      }
    }
  }

  datasets() {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const data = this.getData();
    const cursor = this.cursor;
    const state = this.state;
    const coords = this.getCoords();

    const flatValues = data.datasets
      .reduce((acc, item) => [...acc, ...item.values], [])
      .map((value) => value.value);
    const max = Math.max(...flatValues);

    for (let i = 0; i <= data.datasets.length - 1; i++) {
      const dataset = data.datasets[i];
      canvas.context.strokeStyle = dataset.color;
      canvas.context.fillStyle = dataset.color;
      canvas.context.lineWidth = settings.data.line.styles.width;
      canvas.context.beginPath();

      for (let j = 0; j <= dataset.values.length - 1; j++) {
        const value = dataset.values[j];
        const percent = value.value / max;
        const point = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf * percent * state.loading,
          coords.piStart + coords.piPart * j
        );

        value.coords = point;

        if (j === 0) {
          canvas.context.moveTo(point.x, point.y);
        } else {
          canvas.context.lineTo(point.x, point.y);
        }
      }

      canvas.context.globalAlpha = 0.5;
      canvas.context.fill();
      canvas.context.globalAlpha = 1;
      canvas.context.closePath();
      canvas.context.stroke();

      for (let j = 0; j <= dataset.values.length - 1; j++) {
        const value = dataset.values[j];
        const percent = value.value / max;
        const point = getPointOnArc(
          coords.x,
          coords.y,
          coords.widthHalf * percent * state.loading,
          coords.piStart + coords.piPart * j
        );
        const polygon = [
          {
            x: coords.x,
            y: coords.y,
          },
          getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf,
            coords.piStart + coords.piPart * j - coords.piPart / 2
          ),
          getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf,
            coords.piStart + coords.piPart * j
          ),
          getPointOnArc(
            coords.x,
            coords.y,
            coords.widthHalf,
            coords.piStart + coords.piPart * j + coords.piPart / 2
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

        if (settings.data.dots.enabled) {
          let dotSize = settings.data.dots.styles.width * state.loading;

          if (value.hasOwnProperty('state')) {
            dotSize +=
              (settings.data.dots.styles.hover.width -
                settings.data.dots.styles.width) *
              value.state;
          }

          canvas.context.beginPath();
          canvas.context.arc(point.x, point.y, dotSize, 0, 2 * Math.PI);
          canvas.context.fill();
          canvas.context.closePath();
          canvas.context.stroke();
        }
      }
    }
  }

  render = (props: { by: ERenderBy }) => {
    const time = 300;

    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = window.setTimeout(() => {
      super.baseRender(props);
      this.scheme();
      this.labels();
      this.datasets();
      this.tooltip();
    }, time / 60);
  };
}
