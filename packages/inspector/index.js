const ENTER = 'ENTER';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

import sanitize from './helpers/sanitize';

function printSnapshotToConsole(snapshot) {
  let str = '';
  let addInd = ind => {
    let s = '', i = 0;

    for (;i < ind; i++) s += '  ';
    return s;
  };

  (function loop({ ind, name, used, children }) {
    if (children.length === 0) {
      str += `${ addInd(ind) }<${ name } /> (${ used })\n`;
      return;
    }
    str += addInd(ind);
    str += `<${ name }> (${ used })\n`;
    if (children.length > 0) {
      children.forEach(child => loop(child));
    }
    str += addInd(ind);
    str += `</${ name }>\n`;
  })(snapshot.tree);

  console.clear();
  console.log(str);
}

export default function inspector(processor) {
  const snapshots = [];

  function snapshot(type, node) {
    const { children, ...rest } = node.element.props ? node.element.props : {}; // eslint-disable-line no-unused-vars

    snapshots.push(sanitize({
      type,
      element: {
        name: node.element.name,
        props: {
          children: '<function children>',
          ...rest
        },
        used: node.element.used(),
        id: node.element.id
      },
      tree: processor.system().tree.diagnose()
    }));
    printSnapshotToConsole(snapshots[snapshots.length - 1]);
  }

  processor.onNodeEnter(node => snapshot(ENTER, node));
  processor.onNodeOut(node => snapshot(OUT, node));
  processor.onNodeRemove(node => snapshot(REMOVE, node));
};
