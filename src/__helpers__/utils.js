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
  let str = `${ t.name }(${ t.used })\n`;

  if (t.children.length > 0) {
    str += t.children.map(prettyTree).join('');
  }
  return str;
};

export const exerciseTree = (processor, expected) => {
  const filter = str => str.split('\n').map(s => s.trim()).filter(s => s !== '' && s !== ' ').join('\n');
  const result = prettyTree(processor.system().tree.diagnose());

  expect(filter(result)).toEqual(filter(expected));
};

export const getPrettyTree = processor => prettyTree(processor.system().tree.diagnose());
