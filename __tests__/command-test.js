/* @flow */

import fs from 'fs';
import path from 'path';
import {applyReshape} from '../src/transform/applyReshape';

function readFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

describe('reshape', () => {
  const tests = fs.readdirSync(path.join(__dirname, 'fixtures'));
  tests.forEach(name => {
    it(`${name} should work`, async () => {
      const testPath = path.join(__dirname, 'fixtures/' + name);
      const [command] = name.split('_');

      const test = await readFile(testPath);
      const [source, expected] = test
        .replace(/[\s\n]*$/, '')
        .split(/[\s\n]*-{3,}[\s\n]*/);

      const cursorIndex = source.indexOf('CURSOR');
      const result = applyReshape(
        source.replace('CURSOR', ''),
        cursorIndex,
        // $FlowFixMe dynamic require is ok in Jest
        require(`../src/commands/${command}`).reshape,
      );

      expect(result).toBe(expected);
    });
  });
});
