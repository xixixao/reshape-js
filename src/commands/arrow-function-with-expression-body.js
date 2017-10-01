/* @flow */

import {is} from '../parse/is';
import {arrowDeclaration, arrowExpression} from '../build/arrows';

export function reshape(
  fn: Node,
  unsafe: boolean = true,
): ?Array<[Node, Node | Nodes]> {
  if (is(fn, 'ArrowFunctionExpression')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn.body, result]];
    }
  }
  if (unsafe && is(fn, 'FunctionDeclaration')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn, arrowDeclaration(fn.id, fn.params, result)]];
    }
  }
  if (unsafe && is(fn, 'FunctionExpression')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn, arrowExpression(fn.params, result)]];
    }
  }
  return null;
}

const getResult = (fn, unsafe) => {
  const body = fn.body;
  if (is(body, 'BlockStatement')) {
    const statements = body.body;
    if (statements.length === 1) {
      const returnStmt = statements[0];
      if (is(returnStmt, 'ReturnStatement')) {
        const result = returnStmt.argument;
        return result;
      } else if (unsafe && is(returnStmt, 'ExpressionStatement')) {
        const result = returnStmt.expression;
        return result;
      }
    }
  }
  return null;
};
