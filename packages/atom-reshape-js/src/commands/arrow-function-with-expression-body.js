/* @flow */

export function reshape(
  fn: Node,
  unsafe: boolean = true,
): ?Array<[Node, ResultNode]> {
  if (is(fn, 'ArrowFunctionExpression')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn.body, result]];
    }
  }
  if (unsafe && is(fn, 'FunctionDeclaration')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn, arrowDeclaration(fn, result)]];
    }
  }
  if (unsafe && is(fn, 'FunctionExpression')) {
    const result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn, arrowExpression(fn, result)]];
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

const arrowDeclaration = (fn, result) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: fn.id,
      init: arrowExpression(fn, result),
    },
  ],
});

const arrowExpression = (fn, result) => ({
  type: 'ArrowFunctionExpression',
  expression: true,
  params: fn.params,
  body: result,
});

const is = (node, type) => node.type === type;
