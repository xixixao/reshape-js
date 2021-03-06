/* @flow */

export function transformAst(node: Node, cb: Node => ?Node): Node {
  const transformed = cb(node);
  if (transformed != null) {
    return transformed;
  }
  if (Array.isArray(node)) {
    const newNode = [];
    for (let i = 0; i < node.length; i++) {
      const transformed = transformAst(node[i], cb);
      if (Array.isArray(transformed)) {
        newNode.push(...transformed);
      } else {
        newNode.push(transformed);
      }
    }
    return newNode;
  }
  const newNode = {};
  for (let prop in node) {
    const value = node[prop];
    if (prop === 'loc' || prop === 'start' || prop === 'end') {
      continue;
    }
    if (value && typeof value === 'object') {
      newNode[prop] = transformAst(value, cb);
    } else {
      newNode[prop] = value;
    }
  }
  newNode._source = node;
  return newNode;
}
