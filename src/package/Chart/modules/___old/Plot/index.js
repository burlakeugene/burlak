import {
  generateRandomColor,
  generateDate,
  deepMerge,
  getPointOnArc,
  colorChangeTone,
  getContrastColor,
  prepareColor,
} from '../../common';
import defaultSettings from './defaultSettings';
import Chart from '../chart';

export default class Plot extends Chart {
  constructor(props) {
    props.defaultSettings = defaultSettings;
    super(props);
  }
  prepareData(data) {
    let maxLength = Math.max(
      ...data.datasets.map((datasets) => (datasets.values || []).length)
    );
    [...data.datasets.map((dataset) => dataset.values)].map(
      (current, index) => {
        if (current.length < maxLength) {
          let countDiff = maxLength - current.length - 1;
          for (let i = 0; i <= countDiff; i++) {
            current.push(index ? 0 : '');
          }
        }
      }
    );
    data.datasets.forEach((dataset) => {
      if (!dataset.color) dataset.color = generateRandomColor();
      dataset.color = prepareColor(dataset.color);
      dataset.values.forEach((value, index) => {
        dataset.values[index] = {
          name: dataset.name,
          color: prepareColor(dataset.color),
          index,
          value,
          state: 0,
        };
      });
    });
    data.labels?.forEach((label, index) => {
      data.labels[index] = {
        text: label,
      };
    });
    let bars = data.datasets.filter((dataset) => {
      return dataset.type === 'bar';
    });
    bars.forEach((bar, index) => {
      bar.count = bars.length;
      bar.index = index + 1;
    });
    if (bars.length) {
      this.settings.data.initialValue = 0;
      let drawRect = this.getDrawRect('bar'),
        drawStart = drawRect.left,
        partWidth = drawRect.width / maxLength;
      this.settings.data.line.offset.left = partWidth / 2;
      this.settings.data.line.offset.right = partWidth / 2;
    }
    return data;
  }
  getInterpolation(value, values) {
    let { canvas, settings } = this,
      { data, offset, grid } = settings,
      { element, context } = canvas,
      { line } = data,
      { lineWidth } = line.styles,
      max = Math.max(...values),
      min = Math.min(...values),
      top = offset.top + grid.offset.top + grid.styles.borderWidth,
      percent =
        ((value * this.state.loading -
          min * (min > 0 ? this.state.loading : 1)) *
          100) /
        (max - min) /
        100,
      height =
        element.clientHeight -
        offset.top -
        grid.offset.top -
        offset.bottom -
        grid.offset.bottom -
        grid.styles.borderWidth * 2,
      y = top + height - height * percent;
    return y;
  }
  drawGrid() {
    let { canvas, settings } = this,
      { grid, offset } = settings,
      { element, context } = canvas,
      { enable, horizontal, vertical, styles } = grid;
    if (!enable) return;
    context.save();
    let left = 0 + offset.left,
      right = element.clientWidth - offset.right - offset.left,
      top = 0 + offset.top,
      bottom = element.clientHeight - offset.bottom - offset.top;
    context.lineWidth = styles.borderWidth;
    context.strokeStyle = styles.borderColor;
    context.fillStyle = styles.background;
    if (styles.dash) context.setLineDash(styles.dash);
    context.beginPath();
    context.roundRect(left, top, right, bottom, styles.borderRadius);
    context.fill();
    context.closePath();
    context.stroke();
    context.restore();
    //horizontal lines
    if (horizontal && horizontal.enable) {
      context.save();
      let horizonalArray = [],
        horizontalStep =
          (element.clientHeight - offset.top - offset.bottom) /
          (horizontal.step + 1),
        horizontalStepPx =
          (element.clientHeight - offset.top - offset.bottom) / horizontal.step,
        yStart = offset.top,
        horizontalStyles = {
          ...styles,
          ...(horizontal.styles || {}),
        },
        horizontalType = horizontal.type || grid.type;
      if (horizontalType === 'px') {
        for (let i = 1; i < horizontalStepPx; i++) {
          let y = yStart + i * horizontal.step;
          horizonalArray.push(y);
        }
      } else {
        for (let i = 1; i < horizontal.step + 1; i++) {
          let y = yStart + i * horizontalStep;
          horizonalArray.push(y);
        }
      }
      context.lineWidth = horizontalStyles.borderWidth;
      context.strokeStyle = horizontalStyles.borderColor;
      if (horizontalStyles.dash) {
        context.setLineDash(horizontalStyles.dash);
      }
      for (let i = 0; i <= horizonalArray.length - 1; i++) {
        context.beginPath();
        context.lineTo(0 + offset.left, horizonalArray[i]);
        context.lineTo(element.clientWidth - offset.right, horizonalArray[i]);
        context.stroke();
      }
      context.restore();
    }

    //verical lines
    if (vertical && vertical.enable) {
      context.save();
      let verticalArray = [],
        verticalStep =
          (element.clientWidth - offset.right - offset.left) /
          (vertical.step + 1),
        verticalStepPx =
          (element.clientWidth - offset.right - offset.left) / vertical.step,
        xStart = offset.left,
        verticalStyles = {
          ...styles,
          ...(vertical.styles || {}),
        },
        verticalType = vertical.type || grid.type;

      if (verticalType === 'px') {
        for (let i = 1; i < verticalStepPx; i++) {
          let x = xStart + i * vertical.step;
          verticalArray.push(x);
        }
      } else {
        for (let i = 1; i < vertical.step + 1; i++) {
          let x = xStart + i * verticalStep;
          verticalArray.push(x);
        }
      }
      context.lineWidth = verticalStyles.borderWidth;
      context.strokeStyle = verticalStyles.borderColor;
      if (verticalStyles.dash) {
        context.setLineDash(verticalStyles.dash);
      }
      for (let i = 0; i <= verticalArray.length - 1; i++) {
        context.beginPath();
        context.lineTo(verticalArray[i], 0 + offset.top);
        context.lineTo(verticalArray[i], element.clientHeight - offset.bottom);
        context.stroke();
      }
      context.restore();
    }
    context.restore();
  }
  drawLabels() {
    let { canvas, settings, data } = this,
      { labels, offset, grid } = settings,
      { element, context } = canvas,
      { enable, styles } = labels;

    if (!enable || !data.labels?.length) {
      return;
    }

    const count = data.labels.length;

    let drawRect = this.getDrawRect('line'),
      viewRect = this.getDrawRect('view'),
      width = drawRect.width / (count - 1),
      start = drawRect.left,
      y = element.clientHeight - offset.bottom / 2;

    width = isFinite(width) ? width : drawRect.width;

    data.labels.forEach((label, index) => {
      let x = start + width * index;
      context.font = '100 ' + styles.fontSize + 'px arial';
      context.fillStyle = styles.color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

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
      context.fillText(label.text, x, y);
    });
  }
  getDatasets() {
    let { data } = this;
    return data.datasets;
  }
  getAllValues() {
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
  drawValues() {
    let { canvas, settings } = this,
      { values, offset, grid } = settings,
      { element, context } = canvas,
      { enable, styles, digits } = values;
    if (!enable) return;
    let x = offset.left / 2,
      allValues = this.getAllValues(),
      max = Math.max(...allValues),
      min = Math.min(...allValues);
    context.font = '100 ' + styles.fontSize + 'px arial';
    context.fillStyle = styles.color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    let { count } = values,
      texts = [],
      stepDiff = (max - min) / (count - 1);
    for (let i = 0; i <= count - 1; i++) {
      let value = max - stepDiff * i;
      texts.push({
        value: i === 0 ? max : i === count - 1 ? min : value,
        x,
        y: this.getInterpolation(value, allValues),
      });
    }
    texts.forEach((text) => {
      context.fillText(text.value.toFixed(digits), text.x, text.y);
    });
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
  getDrawRect(type) {
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
      drawRect = this.getDrawRect('line'),
      viewRect = this.getDrawRect('view'),
      drawStart = drawRect.left,
      partWidth =
        drawRect.width / (values.length === 1 ? 1 : values.length - 1);
    values.forEach((value, index) => {
      let x = drawStart + partWidth * index,
        y = this.getInterpolation(value.value, this.getAllValues());
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
      drawRect = this.getDrawRect('bar'),
      viewRect = this.getDrawRect('view'),
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
        y = this.getInterpolation(value.value, this.getAllValues()),
        y0 = this.getInterpolation(0, this.getAllValues());
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
  drawTooltip() {
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
    super.drawTooltip({
      title: {
        text: label?.text || '',
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
      render: (obj) => {},
    });
  }
  render(info = {}) {
    let time = 300;
    if (this.renderTimeout) clearTimeout(this.renderTimeout);
    this.renderTimeout = setTimeout(() => {
      super.baseRender();
      this.drawGrid();
      this.drawLabels();
      this.drawData();
      this.drawValues();
      this.drawTooltip();
    }, time / 60);
  }
}
