import { deepMerge, colorChangeTone } from '../common';
import { lineHeightCoefficient } from './constants';
import settings from './settings';
import { ERenderBy, EType, TProps, TTooltip } from './types';

export default class Chart {
  settings: TProps['settings'];
  type: EType;
  canvas: {
    element: TProps['element'];
    context: CanvasRenderingContext2D;
    valid: boolean;
  };
  cursor: { x: number; y: number };
  state: { loading: number };
  data: TProps['data'];

  renderTimeout: number;

  constructor(props: TProps) {
    this.settings = deepMerge(structuredClone(settings), props.settings || {});

    this.type = props.type || EType.UNKNOWN;

    this.canvas = {
      element: props.element,
      context: props.element.getContext('2d'),
      valid:
        props.element instanceof Element &&
        props.element.tagName.toLowerCase() === 'canvas',
    };

    this.cursor = { x: 0, y: 0 };

    this.state = {
      loading: this.settings.animated ? 0 : 1,
    };

    this.data = this.prepareData(props.data);

    this.init();
  }

  prepareData(data) {
    return data;
  }

  setSettings(value: TProps['settings'] = {}) {
    deepMerge(this.settings, value);

    this.render({
      by: ERenderBy.SET_SETTINGS,
    });
  }
  getSettings() {
    return this.settings;
  }

  setData(data: TProps['data']) {
    this.data = this.prepareData(data);

    this.render({
      by: ERenderBy.SET_DATA,
    });
  }
  getData() {
    return this.data;
  }

  ratio() {
    const canvas = this.canvas;
    const ratio = window.devicePixelRatio || 1;

    canvas.element.width = canvas.element.clientWidth * ratio;
    canvas.element.height = canvas.element.clientHeight * ratio;
    canvas.context.scale(ratio, ratio);
  }

  clear() {
    const canvas = this.canvas;

    canvas.context.clearRect(0, 0, canvas.element.width, canvas.element.height);
  }

  loading() {
    if (this.state.loading >= 1) {
      return;
    }

    setTimeout(() => {
      this.state.loading += 60 / 2000;
      this.state.loading = this.state.loading > 1 ? 1 : this.state.loading;

      this.render({
        by: ERenderBy.LOADING,
      });

      this.loading();
    }, 1000 / 60);
  }

  listeners() {
    const canvas = this.canvas;

    window.addEventListener('resize', () => {
      this.render({
        by: ERenderBy.RESIZE,
      });
    });

    canvas.element.addEventListener('mousemove', (event) => {
      const position = canvas.element.getBoundingClientRect();
      const x = event.clientX - position.left;
      const y = event.clientY - position.top;

      this.cursor = {
        x,
        y,
      };

      this.render({
        by: ERenderBy.MOUSEMOVE,
      });
    });

    canvas.element.addEventListener('mouseout', () => {
      this.cursor = {
        x: 0,
        y: 0,
      };

      this.render({
        by: ERenderBy.MOUSEOUT,
      });
    });
  }

  init() {
    this.render({
      by: ERenderBy.INIT,
    });
    this.loading();
    this.listeners();
  }

  tooltip(data: TTooltip = {}) {
    const canvas = this.canvas;
    const settings = this.getSettings();
    const cursor = this.cursor;

    if (!settings?.tooltip?.enabled) {
      return;
    }

    const x = data.x || cursor.x;
    const y = data.y || cursor.y;

    canvas.context.font =
      '100 ' + settings.tooltip.styles.fontSize + 'px arial';
    canvas.context.textAlign = 'left';
    canvas.context.textAlign = 'left';
    canvas.context.textBaseline = 'middle';

    const calculateSize = () => {
      data.title = {
        ...data.title,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      };

      if (!!data.title?.value) {
        data.title.width =
          canvas.context.measureText(data.title.value).width +
          settings.tooltip.styles.padding.left +
          settings.tooltip.styles.padding.right +
          settings.tooltip.styles.borderWidth;

        data.title.height =
          settings.tooltip.styles.padding.top * 2 +
          settings.tooltip.styles.fontSize * lineHeightCoefficient +
          settings.tooltip.styles.borderWidth / 2;

        data.title.x =
          settings.tooltip.styles.padding.left +
          settings.tooltip.styles.borderWidth / 2;

        data.title.y =
          data.title.height / 2 + settings.tooltip.styles.borderWidth / 2;
      }

      data.panels?.forEach((panel, index) => {
        panel = {
          ...panel,
          width: 0,
          height: 0,
          x: (() => {
            let result = 0;
            for (let i = index - 1; i >= 0; i--) {
              result += data.panels[i].width;
            }

            return result;
          })(),
          y: data.title.height,
        };

        if (panel.colorPanel?.color) {
          panel.colorPanel.height = 3;
          panel.colorPanel.x = settings.tooltip.styles.borderWidth / 2;
          panel.colorPanel.y = 0;
          panel.height += panel.colorPanel.height;
        }

        panel.texts?.forEach((text, index) => {
          if (!text?.value) {
            return;
          }

          let width =
            canvas.context.measureText(text.value).width +
            settings.tooltip.styles.borderWidth;

          if (panel.width < width) {
            panel.width = width;
          }

          text.height = settings.tooltip.styles.fontSize * lineHeightCoefficient;
          text.x =
            settings.tooltip.styles.padding.left +
            settings.tooltip.styles.borderWidth / 2;
          text.y = panel.height + text.height / 2;

          if (!index) {
            text.height += settings.tooltip.styles.padding.top;
            text.y += settings.tooltip.styles.padding.top;
          }

          if (index === panel.texts.length - 1) {
            text.height += settings.tooltip.styles.padding.bottom;
          }

          panel.height += text.height;
        });

        if (panel.footer?.text) {
          let width =
            canvas.context.measureText(panel.footer.text).width +
            settings.tooltip.styles.borderWidth;

          if (panel.width < width) {
            panel.width = width;
          }

          panel.footer.height =
            settings.tooltip.styles.padding.bottom +
            settings.tooltip.styles.fontSize * lineHeightCoefficient;
          panel.footer.x =
            settings.tooltip.styles.padding.left +
            settings.tooltip.styles.borderWidth / 2;
          panel.footer.y =
            panel.height +
            panel.footer.height / 2 -
            settings.tooltip.styles.padding.bottom / 2;
          panel.height +=
            panel.footer.height + settings.tooltip.styles.borderWidth / 2;
        }

        panel.width +=
          settings.tooltip.styles.padding.left +
          settings.tooltip.styles.padding.right;

        data.panels[index] = panel;
      });

      const panelsWidth = data.panels.reduce(
        (acc, panel) => acc + panel.width,
        0
      );

      if (data.title.width > panelsWidth) {
        const nextPanelWidth = data.title.width / data.panels.length;
        let minCount = 0;
        let oversizeWidth = 0;

        for (let i = 0; i <= data.panels.length - 1; i++) {
          if (data.panels[i].width >= nextPanelWidth) {
            oversizeWidth += data.panels[i].width - nextPanelWidth;
          } else {
            minCount++;
          }
        }

        for (let i = 0; i <= data.panels.length - 1; i++) {
          data.panels[i].width =
            data.panels[i].width < nextPanelWidth
              ? nextPanelWidth - oversizeWidth / minCount
              : data.panels[i].width;

          data.panels[i].x = (() => {
            let result = 0;

            for (let j = i - 1; j >= 0; j--) {
              result += data.panels[j].width;
            }

            return result;
          })();
        }
      }

      return {
        width: Math.max(data.title.width, panelsWidth),
        height:
          data.title.height +
          Math.max(...(data.panels || []).map((panel) => panel.height)),
      };
    };

    const { width, height } = calculateSize();

    const center = x;
    let left = x - width / 2;
    let top = y - height - 10;
    let invert = false;

    if (top < settings.tooltip.styles.borderWidth) {
      invert = true;
      top = y + 10;
    }

    if (
      left + width + settings.tooltip.styles.borderWidth / 2 >
      canvas.element.clientWidth
    ) {
      left =
        canvas.element.clientWidth -
        width -
        settings.tooltip.styles.borderWidth / 2;
    }

    if (left < settings.tooltip.styles.borderWidth / 2) {
      left = settings.tooltip.styles.borderWidth / 2;
    }

    canvas.context.fillStyle = settings.tooltip.styles.background;
    canvas.context.strokeStyle =
      settings.tooltip.styles.borderWidth > 0
        ? settings.tooltip.styles.borderColor
        : 'transparent';
    canvas.context.lineWidth = settings.tooltip.styles.borderWidth;

    canvas.context.beginPath();
    canvas.context.roundRect(
      left,
      top,
      width,
      height,
      settings.tooltip.styles.borderRadius
    );
    canvas.context.closePath();
    canvas.context.fill();
    canvas.context.stroke();

    if (invert) {
      canvas.context.beginPath();
      canvas.context.moveTo(center - 5, top);
      canvas.context.lineTo(center, top - 5);
      canvas.context.lineTo(center + 5, top);
      canvas.context.fill();
      canvas.context.stroke();
      canvas.context.beginPath();
      canvas.context.moveTo(
        center - 5 + settings.tooltip.styles.borderWidth / 4,
        top + settings.tooltip.styles.borderWidth / 2
      );
      canvas.context.lineTo(
        center,
        top - 5 + settings.tooltip.styles.borderWidth / 1.5
      );
      canvas.context.lineTo(
        center + 5 - settings.tooltip.styles.borderWidth / 4,
        top + settings.tooltip.styles.borderWidth / 2
      );
      canvas.context.fill();
    } else {
      canvas.context.beginPath();
      canvas.context.moveTo(center - 5, top + height);
      canvas.context.lineTo(center, top + height + 5);
      canvas.context.lineTo(center + 5, top + height);
      canvas.context.fill();
      canvas.context.stroke();
      canvas.context.beginPath();
      canvas.context.moveTo(
        center - 5 + settings.tooltip.styles.borderWidth / 4,
        top + height - settings.tooltip.styles.borderWidth / 2
      );
      canvas.context.lineTo(
        center,
        top + height + 5 - settings.tooltip.styles.borderWidth / 1.5
      );
      canvas.context.lineTo(
        center + 5 - settings.tooltip.styles.borderWidth / 4,
        top + height - settings.tooltip.styles.borderWidth / 2
      );
      canvas.context.fill();
    }

    canvas.context.fillStyle = settings.tooltip.styles.color;
    if (data.title?.value) {
      canvas.context.fillText(
        data.title.value,
        left + data.title.x,
        top + data.title.y
      );
    }

    data.panels.forEach((panel) => {
      canvas.context.fillStyle = settings.tooltip.styles.color;

      if (panel.colorPanel && panel.colorPanel.color) {
        canvas.context.save();
        canvas.context.fillStyle = panel.colorPanel.color;
        canvas.context.beginPath();
        canvas.context.rect(
          left + panel.x + panel.colorPanel.x,
          top + panel.y + panel.colorPanel.y,
          panel.width - settings.tooltip.styles.borderWidth,
          panel.colorPanel.height
        );
        canvas.context.fill();
        canvas.context.restore();
      }

      if (panel.texts) {
        panel.texts.forEach((text) => {
          if (text.value) {
            canvas.context.fillText(
              text.value,
              left + panel.x + text.x,
              top + panel.y + text.y
            );
          }
        });
      }

      if (panel.footer && panel.footer.text) {
        canvas.context.fillStyle = colorChangeTone(
          settings.tooltip.styles.color,
          -50
        );
        canvas.context.fillText(
          panel.footer.text,
          left + panel.x + panel.footer.x,
          top + panel.y + panel.footer.y
        );
      }
    });
  }

  background() {
    const canvas = this.canvas;
    const settings = this.getSettings();

    canvas.context.fillStyle = settings.view.styles.background;
    canvas.context.fillRect(0, 0, canvas.element.width, canvas.element.height);
  }

  hover({ item, isHovered }) {
    const settings = this.getSettings();
    const step = 1 / 20;

    if (!settings?.data?.hover?.enabled) {
      return;
    }

    if (isHovered) {
      if (!item.hasOwnProperty('state')) {
        item.state = 0;
      }

      if (settings.animated) {
        if (item.state < 1) {
          item.state += step;

          if (item.state > 1) {
            item.state = 1;
          }

          this.render({
            by: ERenderBy.HOVER,
          });
        }
      } else {
        item.state = 1;

        this.render({
          by: ERenderBy.HOVER,
        });
      }
    } else {
      if (settings.animated) {
        if (item.state > 0) {
          item.state -= step;

          if (item.state < 0) {
            item.state = 0;
          }

          this.render({
            by: ERenderBy.HOVER,
          });
        }
      } else {
        item.state = 0;

        this.render({
          by: ERenderBy.HOVER,
        });
      }
    }
  }

  baseRender(props) {
    this.ratio();
    this.clear();
    this.background();
  }

  render(props: { by: ERenderBy }) {
    this.baseRender(props);
  }
}
