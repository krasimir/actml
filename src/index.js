const DIALECTICA_TYPE = '__dialectica';

export default function dialectica(func, params, ...children) {
  return {
    func,
    params,
    children,
    [DIALECTICA_TYPE]: true
  }
}

function speak({ func, params, children }) {
  if (typeof func === 'function') {
    const result = func.call(this, params);

    if (children) {
      if (children.length === 1 && !children[0][DIALECTICA_TYPE]) {
        speak(children[0](result));
      } else {
        children.forEach(c => {
          speak({
            func: c.func,
            params: Object.assign({}, c.params, { parent: result }),
            children: c.children
          });
        });
      }
    }
  }
}

dialectica.speak = speak;

export function Dialect() {}