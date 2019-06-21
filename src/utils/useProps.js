export default function (props) {
  const api = {
    exists(propName, func) {
      if (props && props[propName]) {
        func(props[propName]);
      }
    }
  };

  return api;
};
