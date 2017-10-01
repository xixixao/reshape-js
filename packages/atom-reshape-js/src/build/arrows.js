/* @flow */

import {constDeclaration} from './vars';

export const arrowDeclaration = (id: Node, params: Nodes, body: Node): Node =>
  constDeclaration(id, arrowExpression(params, body));

export const arrowExpression = (params: Nodes, body: Node): Node => ({
  type: 'ArrowFunctionExpression',
  expression: true,
  params,
  body,
});
