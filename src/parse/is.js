/* @flow */

export function is(node: Node, type: string) {
  return node != null && node.type === type;
}
