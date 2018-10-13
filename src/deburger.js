const log = (...args) => console.log(...args);

export default (element, type) => {
  if (type === 'IN') {
    log(`<${ element.name }>`);
  } else if (type === 'OUT') {
    log(`</${ element.name }>`);
  } else {
    log(`<${ element.name }>(${ type })`);
  }
}