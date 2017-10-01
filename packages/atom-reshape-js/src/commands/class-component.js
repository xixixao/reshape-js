/* @flow */

import {is} from '../parse/is';
import {access} from '../build/objects';
import {block, ident, retrn} from '../build/core';
import {arrowDeclaration, arrowExpression} from '../build/arrows';

export function reshape(decl: Node): ?Array<[Node, Node | Nodes]> {
  const found = getFn(decl);
  if (found === null) {
    return null;
  }
  const [id, params, body] = found;
  return [[decl, component(id, body, getPropsType(params))]];
}

const getFn = decl => {
  if (is(decl, 'VariableDeclaration')) {
    const decls = decl.declarations;
    if (decls.length === 1) {
      const declarator = decls[0];
      if (is(declarator, 'VariableDeclarator')) {
        const id = declarator.id;
        const fn = declarator.init;
        if (is(fn, 'ArrowFunctionExpression') || is(fn, 'FunctionExpression')) {
          const body = fn.body;
          if (is(body, 'BlockStatement')) {
            return [id, fn.params, fn.body];
          } else {
            return [id, fn.params, block([retrn(fn.body)])];
          }
        }
      }
    }
  }
  if (is(decl, 'FunctionDeclaration')) {
    const id = decl.id;
    return [id, decl.params, decl.body];
  }
  return null;
};

const getPropsType = params => {
  if (params.length === 1) {
    const props = params[0];
    if (is(props, 'Identifier')) {
      const type = props.typeAnnotation;
      if (is(type, 'TypeAnnotation')) {
        return type.typeAnnotation;
      }
    }
  }
  return null;
};

const component = (id, body, propsType) => ({
  type: 'ClassDeclaration',
  id,
  superClass: access(ident('React'), ident('Component')),
  superTypeParameters: {
    type: 'TypeParameterInstantiation',
    params: [propsType || hamburger(), {type: 'VoidTypeAnnotation'}],
  },
  body: {
    type: 'ClassBody',
    body: [
      {
        type: 'ClassMethod',
        kind: 'method',
        key: ident('render'),
        params: [],
        body,
      },
    ],
  },
});

const hamburger = () => ({
  type: 'ObjectTypeAnnotation',
  exact: true,
  properties: [],
});
