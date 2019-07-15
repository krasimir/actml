const ENTER = 'ENTER';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

import sanitize from './helpers/sanitize';

const parseLogMeta = meta => {
  if (typeof meta === 'undefined') return '';
  if (typeof meta === 'string' || typeof meta === 'boolean' || typeof meta === 'number') {
    return `(${ JSON.stringify(meta) })`;
  }
  if (typeof meta === 'object') {
    if (Array.isArray(meta)) {
      return `([...${ meta.length }])`;
    }
    return '(object)';
  }
  return `(${ typeof meta })`;
};

function printSnapshotToConsole(snapshot) {
  const [ type, node, tree ] = snapshot;
  let str = `${ type } <${ node.element.name }>\n`;
  let addInd = ind => {
    let s = '', i = 0;

    for (;i < ind; i++) s += '  ';
    return s;
  };

  // console.clear();
  (function loop({ ind, name, used, children, logs }) {
    const logsStr = logs && logs.length > 0 ?
      logs.map(({ type, meta }) => {
        return `${ addInd(ind) }  ⤷ ${ type }${ parseLogMeta(meta) }`;
      }).join('\n') + '\n' :
      '';
    const elStr = `${ addInd(ind) }<${ name }> (${ used })\n${ logsStr }`;

    if (children.length === 0) {
      str += elStr;
      return;
    }
    str += elStr;
    if (children.length > 0) {
      children.forEach(child => loop(child));
    }
  })(tree);
  console.log(str);
}

export default function inspector(processor) {
  const snapshots = [];

  function snapshot(type, node) {
    snapshots.push([
      type,
      node,
      processor.system().tree.diagnose()
    ]);
    printSnapshotToConsole(snapshots[snapshots.length - 1]);
  }

  processor.onNodeEnter(node => snapshot(ENTER, node));
  processor.onNodeOut(node => snapshot(OUT, node));
  processor.onNodeRemove(node => snapshot(REMOVE, node));
};
