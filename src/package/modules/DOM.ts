export const create = (tag, props, html, children) => {
  const element = document.createElement(tag);

  for (let prop in props) {
    element.setAttribute(prop, props[prop]);
  }

  if (html) element.innerHTML = html;

  if (children) {
    if (children instanceof Element) {
      element.appendChild(children);
    }
    if (children instanceof Array) {
      children.forEach((elem) => {
        elem instanceof Element && element.appendChild(elem);
      });
    }
  }

  return element;
};

export const remove = (element) => {
  const parent = element.parentNode;
  parent.removeChild(element);
};
