/* @flow */

import generate from 'babel-generator';
import {parse} from '../parse/babylon';
import {indexToAstPath} from './indexToAstPath';
import {transformAst} from './transformAst';

export function applyReshape(
  source: string,
  index: Index,
  reshape: Reshape,
): ?string {
  const ast = parse(source);
  const nodePath = indexToAstPath(ast, index);

  const subs = getSubstitutions(ast, nodePath, reshape);

  if (subs == null) {
    return null;
  }

  const newAst = applySubstitutions(ast, subs);
  return generate(newAst).code;
}

const getSubstitutions = (ast, nodePath, reshape) => {
  let subs = null;
  for (let i = nodePath.length - 1; i >= 0; i--) {
    subs = reshape(nodePath[i]);
    if (subs != null) {
      break;
    }
  }
  return subs;
};

const applySubstitutions = (ast, subs) =>
  transformAst(ast, node => {
    for (const [replaced, replacement] of subs) {
      if (node === replaced) {
        return replacement;
      }
    }
    return null;
  });
