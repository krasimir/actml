const ind = (to) => {
  let str = '';

  for (let i = 0; i < to; i++) {
    str += ' ';
  }
  return str;
};

export const delay = (ms, func = () => {}) =>
  new Promise(resolve => setTimeout(() => resolve(func()), ms));

export const printTree = t => {
  if (Array.isArray(t)) {
    return t.map(printTree).join('\n');
  }
  return `${ ind(t.ind) }<${ t.name }> (${ t.used })`;
};

export const prettyTree = t => {
  if (Array.isArray(t)) {
    return t.map(prettyTree).join('\n');
  }
  return `${ t.name }(${ t.used })`;
};

export const exerciseTree = (processor, expected) => {
  const result = prettyTree(processor.system().tree.diagnose());
  const expectedStr = expected
    .split('\n').map(s => s.trim()).filter(s => s !== '').join('\n');

  expect(result).toEqual(expectedStr);
};
