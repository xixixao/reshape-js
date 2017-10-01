/* @flow */

/* globals atom */

import {CompositeDisposable} from 'atom';

let subscriptions: ?CompositeDisposable = null;

export function activate(state: ?Object): void {
  subscriptions = new CompositeDisposable();
  const commands = ['arrow-function-with-expression-body'];
  commands.forEach(command => {
    (subscriptions: any).add(
      atom.commands.add('atom-text-editor', `atom-reshape-js:${command}`, () =>
        formatCode(command),
      ),
    );
  });
}

export function deactivate(): void {
  if (subscriptions != null) {
    subscriptions.dispose();
    subscriptions = null;
  }
}

// DEV only
export function consumeAutoreload(reloader: any): void {
  reloader({
    pkg: 'atom-reshape-js',
    files: ['package.json'],
    folders: ['lib/'],
  });
  console.log('atom-reshape-js reloaded');
  // atom.notifications.addSuccess('Reloaded atom-reshape-js', {
  //   detail: 'All is good',
  //   dismissable: true,
  // });
}

const formatCode = command => {
  const editor = atom.workspace.getActiveTextEditor();
  if (editor == null) {
    return;
  }
  const buffer = editor.getBuffer();
  const source = buffer.getText();
  const cursorIndex = buffer.characterIndexForPosition(
    editor.getCursorBufferPosition(),
  );
  // $FlowFixMe dynamic require is ok
  const {reshape} = require(`./commands/${command}`);
  const {applyReshape} = require('./transform/applyReshape');
  const output = applyReshape(source, cursorIndex, reshape);
  if (output == null) {
    atom.notifications.addInfo('atom-reshape-js', {
      detail:
        'No change to apply, make sure you have cursor ' +
        'inside code you want to reshape.',
      dismissable: true,
    });
  } else {
    buffer.setTextViaDiff(output);
  }
  // let selection = editor.getSelectedText();
  // editor.setCursorBufferPosition([cursor.row + 1, cursor.column]);
};

const fromLocToAtom = loc => ({row: loc.line - 1, column: loc.column - 1});
