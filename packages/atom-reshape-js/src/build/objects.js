/* @flow */

export const access = (object: Node, property: Node): Node => ({
  type: 'MemberExpression',
  object,
  property,
});
