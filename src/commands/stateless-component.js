/* @flow */

import {is} from '../parse/is';
import {arrowDeclaration, arrowExpression} from '../build/arrows';
import {ident} from '../build/core';
import {access} from '../build/objects';
import {constDeclaration} from '../build/vars';
import {reshape as arrowWithExpressionBody} from '../commands/arrow-function-with-expression-body';

export function reshape(cls: Node): ?Array<[Node, Node | Nodes]> {
  if (is(cls, 'ClassDeclaration')) {
    const body = cls.body;
    if (is(body, 'ClassBody')) {
      const fields = body.body;
      let renderBody = null;
      const instancees = [];
      const statics = [];
      for (const field of fields) {
        if (is(field, 'ClassMethod')) {
          const methodID = field.key;
          const methodBody = field.body;
          if (is(methodID, 'Identifier')) {
            const methodName = methodID.name;
            if (methodName === 'render') {
              renderBody = methodBody;
            } else {
              if (field.static) {
                const staticMethod = arrowExpression(field.params, field.body);
                statics.push(
                  assignment(access(cls.id, field.key), staticMethod),
                );
              } else {
                // TODO: instancees.push(field)
              }
            }
          }
        } else if (is(field, 'ClassProperty')) {
          if (field.static) {
            statics.push(assignment(access(cls.id, field.key), field.value));
          } else {
            // TODO: instancees.push(field)
          }
        }
      }
      if (is(renderBody, 'BlockStatement')) {
        const render = getRender(cls, renderBody);
        return [[cls, [constDeclaration(cls.id, render), ...statics]]];
      }
    }
  }
}

const getPropsType = cls => {
  const types = cls.superTypeParameters;
  if (is(types, 'TypeParameterInstantiation')) {
    const params = types.params;
    if (params.length > 0) {
      const propsType = params[0];
      return propsType;
    }
  }
  return null;
};

const getRender = (cls, renderBody) => {
  const propsType = getPropsType(cls);
  const propParam = ident('props', propsType);
  const render = arrowExpression([propParam], renderBody);
  const simplerFn = arrowWithExpressionBody(render);
  if (simplerFn != null) {
    const [[_, renderBody]] = simplerFn;
    return arrowExpression([propParam], renderBody);
  } else {
    return render;
  }
};

const assignment = (left, right) => ({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    operator: '=',
    left,
    right,
  },
});
