export const hexAverage = (colors) => {
  const padToTwo = (numberString) => {
    if (numberString.length < 2) {
      numberString = '0' + numberString;
    }
    return numberString;
  };

  return colors
    .reduce(
      function (previousValue, currentValue) {
        return currentValue
          .replace(/^#/, '')
          .match(/.{2}/g)
          .map(function (value, index) {
            return previousValue[index] + parseInt(value, 16);
          });
      },
      [0, 0, 0]
    )
    .reduce(function (previousValue, currentValue) {
      return (
        previousValue +
        padToTwo(Math.floor(currentValue / colors.length).toString(16))
      );
    }, '#');
};

export const deepMerge = (obj1, obj2) => {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = deepMerge(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
};

export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getPointOnArc = (
  x,
  y,
  radius,
  angle
): { x: number; y: number } => ({
  x: x + Math.cos(angle) * radius,
  y: y + Math.sin(angle) * radius,
});

export const colorChangeTone = (color, amount) => {
  amount = parseInt(amount);

  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

export const calcCenterOfPolygon = (points) => {
  let polygon = points.map((point) => {
      return [point.x, point.y];
    }),
    xs = polygon.map((x) => x[0]),
    ys = polygon.map((y) => y[1]),
    cx = (Math.min(...xs) + Math.max(...xs)) / 2,
    cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return {
    x: cx,
    y: cy,
  };
};

export const getIntersection = ({ A, B, C, D }) => {
  let result = {
    x: 0,
    y: 0,
    intersected: false,
  };
  if (!A || !B || !C || !D) return result;
  let d =
    ((C.x - A.x) * (B.y - A.y) - (B.x - A.x) * (C.y - A.y)) /
    ((B.x - A.x) * (D.y - C.y) - (D.x - C.x) * (B.y - A.y));
  result.x = C.x + (D.x - C.x) * d;
  result.y = C.y + (D.y - C.y) * d;
  result.intersected = (() => {
    let v1 = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x),
      v2 = (D.x - C.x) * (B.y - C.y) - (D.y - C.y) * (B.x - C.x),
      v3 = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x),
      v4 = (B.x - A.x) * (D.y - A.y) - (B.y - A.y) * (D.x - A.x);
    return v1 * v2 < 0 && v3 * v4 < 0;
  })();

  return result;
};

export const isFunction = (func) => {
  return {}.toString.call(func) === '[object Function]';
};

export const getHex = (color) => {
  let result = color;

  if (result.length === 4 && result[0] === '#') {
    result = '#';

    for (let i = 1; i <= color.length - 1; i++) {
      result += color[i] + color[i];
    }
  }

  return result;
};

export const intersectionPolygon = ({ x, y, polygon }) => {
  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i].x,
      yi = polygon[i].y;
    var xj = polygon[j].x,
      yj = polygon[j].y;
    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};
