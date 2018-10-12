const getIndent = level => [...Array(level)].join('  ');

const DEFAULT_OPTIONS = {
  log: (...args) => console.log(...args),
  severity: {
    IN: true,
    OUT: true,
    EXECUTE_IN: false,
    EXECUTE_OUT: false,
    EXPORTS_IN: false,
    EXPORTS_OUT: false,
    RESULTS_IN: false,
    RESULTS_OUT: false,
    CHILDREN_IN: false,
    CHILDREN_OUT: false
  }
};

export default customOptions => {
  const options = Object.assign({}, DEFAULT_OPTIONS, customOptions);
  const log = options.log;

  return (element, level) => type => {
    const indent = getIndent(level);

    if (options.severity[type]) {
      if (type === 'IN') {
        log(`<${ element.name }>`);
      } else if (type === 'OUT') {
        log(`</${ element.name }>`);
      } else {
        log(`<${ element.name }>(${ type })`);
      }
    }
  }
}