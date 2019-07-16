const IN = 'IN';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

import sanitize from './helpers/sanitize';

const isRunningInNode =
  (typeof process !== 'undefined') &&
  (typeof process.release !== 'undefined') &&
  (process.release.name === 'node');

const trim = (str, len, emp = '...') => str.length > len ? str.substr(0, len) + emp : str;
const getIndMargin = ind => {
  return `margin-left: ${ ind * 20 }px;`;
};
const getIndSpaces = ind => {
  return [...Array(ind * 2).keys()].map(x => ' ').join('');
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
    return `(${ trim(JSON.stringify(sanitize(meta)), 50) })`;
  }
  return `(${ typeof meta })`;
};

const print = {
  entrance: (what, ind) => {
    if (!isRunningInNode) {
      return [
        null,
        `%c${ what }`,
        'color: #b0b0b0;' + getIndMargin(ind)
      ];
    }
    return [ null, '\x1b[38m%s\x1b[0m', `${ getIndSpaces(ind) + what }`];
  },
  default: (what, ind) => {
    if (!isRunningInNode) {
      return [
        null,
        `%c${ what }`,
        getIndMargin(ind)
      ];
    }
    return [ null, `${ getIndSpaces(ind) + what }` ];
  },
  hook: (what, ind, time) => {
    if (!isRunningInNode) {
      return [
        time,
        `%c${ what }`,
        'color: #999;' + getIndMargin(ind)
      ];
    }
    return [ time, '\x1b[34m%s\x1b[0m', `${ getIndSpaces(ind) + what }` ];
  },
  current: (what, ind) => {
    if (!isRunningInNode) {
      return [
        null,
        `%c${ what }`,
        'font-weight: bold; border: solid 1px #999; border-radius: 2px; padding: 1px 0;' + getIndMargin(ind)
      ];
    }
    return [ null, getIndSpaces(ind) + `\x1b[100m${ what }\x1b[0m` ];
  }
};

function printSnapshotToConsole(snapshot) {
  const [ type, node, tree ] = snapshot;

  let printLines = [
    print.entrance('', 0)
  ];

  printLines = printLines.concat((function loop({ id, ind, name, used, children, logs }) {
    let lines = [];
    let elementOpenTag = `<${ name }${ used > 0 ? `(${ used })` : '' }>`;

    lines.push(
      id === node.element.id ? print.current(elementOpenTag, ind) : print.default(elementOpenTag, ind)
    );
    if (logs && logs.length > 0) {
      lines = lines.concat(logs.map(({ type, meta, time }) => {
        return print.hook(`⤷ ${ type }${ parseLogMeta(meta) }`, ind, time);
      }));
    }
    if (children.length > 0) {
      children.map(child => {
        lines = lines.concat(loop(child));
      });
      lines.push(
        id === node.element.id ? print.current(`</${ name }>`, ind) : print.default(`</${ name }>`, ind)
      );
    }
    return lines;
  })(tree));

  // console.clear();
  const sortedHookTimes = printLines
    .filter(([ time ]) => time !== null)
    .map(([ time ]) => time)
    .sort((a, b) => a > b ? 1 : -1);

  printLines.forEach(([ time, ...line ]) => {
    if (sortedHookTimes.length > 0 && time) {
      console.log(...line, sortedHookTimes.findIndex(t => t === time));
    } else {
      console.log(...line);
    }
  });
}

export default function inspector(processor, options = {}) {
  const snapshots = [];

  function snapshot(type, node) {
    snapshots.push([
      type,
      node,
      processor.system().tree.diagnose()
    ]);
    printSnapshotToConsole(snapshots[snapshots.length - 1], options);
  }

  // processor.onNodeIn(node => snapshot(IN, node));
  processor.onNodeOut(node => snapshot(OUT, node));
  // processor.onNodeRemove(node => snapshot(REMOVE, node));
};
