declare global {
  interface CanvasRenderingContext2D {
    drawCurve(
      points: Array<{ x: number; y: number }>,
      config?: { closePath?: boolean }
    ): void;
    drawLineCurve(points: Array<{ x: number; y: number }>): void;
  }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

CanvasRenderingContext2D.prototype.drawCurve = function (points, config = {}) {
  points = structuredClone(points);
  const { closePath } = config;

  if (!points.length) {
    return;
  }

  if (closePath) {
    points[0] = {
      x: (points[points.length - 1].x + points[1].x) / 2,
      y: (points[points.length - 1].y + points[1].y) / 2,
    };
    points.push(points[0]);
  }

  this.beginPath();

  this.moveTo(points[0].x, points[0].y);

  let x, y;

  for (let i = 0; i < points.length - 1; i++) {
    x = (points[i].x + points[i + 1].x) / 2;
    y = (points[i].y + points[i + 1].y) / 2;
    this.quadraticCurveTo(points[i].x, points[i].y, x, y);
  }

  const lastPoint = points[points.length - 1];

  this.quadraticCurveTo(lastPoint.x, lastPoint.y, lastPoint.x, lastPoint.y);
  this.stroke();

  return this;
};

CanvasRenderingContext2D.prototype.drawLineCurve = function (points) {
  function diff(a, b) {
    return (b.y - a.y) / (b.x - a.x);
  }

  const f = 0.3;
  const t = 0.9;

  points = structuredClone(points);

  this.beginPath();

  this.moveTo(points[0].x, points[0].y);

  let dx1 = 0;
  let dy1 = 0;
  let dx2 = 0;
  let dy2 = 0;

  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1];
    const currentPoint = points[i];
    const nextPoint = points[i + 1];

    if (nextPoint) {
      dx2 = (nextPoint.x - currentPoint.x) * -f;
      dy2 = dx2 * diff(prevPoint, nextPoint) * t;
    }

    this.bezierCurveTo(
      prevPoint.x - dx1,
      prevPoint.y - dy1,
      currentPoint.x + dx2,
      currentPoint.y + dy2,
      currentPoint.x,
      currentPoint.y
    );
    dx1 = dx2;
    dy1 = dy2;
  }

  this.stroke();

  return this;
};

export {};
