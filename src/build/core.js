/* @flow */

export const ident = (name: string, typeAnnotation?: Node = null): Node => ({
  type: 'Identifier',
  name,
  typeAnnotation:
    typeAnnotation != null
      ? {type: 'TypeAnnotation', typeAnnotation}
      : undefined,
});

export const block = (body: Nodes): Node => ({
  type: 'BlockStatement',
  body,
});

export const retrn = (argument: Node): Node => ({
  type: 'ReturnStatement',
  argument,
});
