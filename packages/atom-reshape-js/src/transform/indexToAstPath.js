/* @flow */

export function indexToAstPath(
  node: Node,
  pos: Index,
  seen: Set<Node> = new Set(),
) {
  seen.add(node);

  let path = [];
  if (isInRange(nodeToRange(node), pos)) {
    path.push(node);
  } else {
    return [];
  }
  for (let prop in node) {
    const value = node[prop];
    if (
      prop !== 'loc' &&
      value &&
      typeof value === 'object' &&
      !seen.has(value)
    ) {
      let childPath = indexToAstPath(value, pos, seen);
      if (childPath.length > 0) {
        path.push(...childPath);
        break;
      }
    }
  }
  return path;
}

const nodeToRange = node => {
  if (node.start != null) {
    return node;
  }
  if (node.length > 0) {
    // check first and last child
    let rangeFirst = node[0] && nodeToRange(node[0]);
    let rangeLast = node[node.length - 1] && nodeToRange(node[node.length - 1]);
    if (rangeFirst != null && rangeLast != null) {
      return {start: rangeFirst.start, end: rangeLast.end};
    }
  }
  return null;
};

const isInRange = (range, pos) =>
  range != null && pos >= range.start && pos <= range.end;
