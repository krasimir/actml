const ENTER = 'ENTER';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

import sanitize from './helpers/sanitize';

const addInd = ind => {
  return `margin-left: ${ ind * 20 }px;`;
};
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

const STYLES = {
  default: (ind) => 'display: inline-block;' + addInd(ind),
  hook: (ind) => 'color: #999;' + addInd(ind),
  current: (ind) => 'font-weight: bold; border: solid 1px #999; border-radius: 2px; padding: 1px 0;' + addInd(ind),
  entrance: (ind) => 'color: #FFF;background: #4d4d4d;' + addInd(ind)
};

function printSnapshotToConsole(snapshot) {
  const [ type, node, tree ] = snapshot;

  let printLines = [
    [ `→ ${ type } <${ node.element.name }>`, STYLES.entrance(0) ]
  ];

  printLines = printLines.concat((function loop({ id, ind, name, used, children, logs }) {
    let lines = [];

    lines.push(
      [
        `<${ name }${ children.length === 0 ? ' /' : ''}> (${ used })`,
        id === node.element.id ? STYLES.current(ind) : STYLES.default(ind)
      ],
    );
    if (logs && logs.length > 0) {
      lines = lines.concat(logs.map(({ type, meta }) => {
        return [ `⤷ ${ type }${ parseLogMeta(meta) }`, STYLES.hook(ind) ];
      }));
    }
    if (children.length > 0) {
      children.map(child => {
        lines = lines.concat(loop(child));
      });
      lines.push(
        [
          `</${ name }>`,
          id === node.element.id ? STYLES.current(ind) : STYLES.default(ind)
        ],
      );
    }
    return lines;
  })(tree));

  console.clear();
  printLines.forEach(line => {
    console.log(`%c${ line[0] }`, line[1]);
  });
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
