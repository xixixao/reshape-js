/* @flow */

export const constDeclaration = (id: Node, init: Node): Node => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{type: 'VariableDeclarator', id, init}],
});
