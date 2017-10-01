# atom-reshape-js

Use this [Atom](https://atom.io/) plugin to easily transform and reshape your JavaScript code.

## Usage

Place your cursor in desired location, open the command palette and type `reshape`. You will see the list of all available commands and their default shortcuts (these can also be found in `keymaps/atom-reshape-js.json`).

You should really be using [Prettier](https://prettier.io/), the output of this plugin is not guaranteed to be perfectly formatted.

## Example

Let's say you have a file:

```jsx
const List = props => {
  return (
    <div className="list">
      {props.items.map((item, i) => {
        return (
          <div className="item" key={i}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
```

All those pesky `return` statements are making this more complicated than needed. Place your cursor anywhere inside of the inner closure, and press `Cmd+Shift+E`. The arrow function has been converted to use an expression result. Pressing the shortcut again produces the final code:

```jsx
const List = props => (
  <div className="list">
    {props.items.map((item, i) => (
      <div className="item" key={i}>
        {item}
      </div>
    ))}
  </div>
);
```

## Details

Think of it as .NET Resharper for JS, or basic Eclipse reformatting tools, applicable to a single file.

## Scope

The ambition is not to provide whole-code-base refactoring tools. [LSP](http://langserver.org/) is better suited to eventually accomplish this.

## Developing

Clone the repo (or your fork) and run:

```sh
# Install dependencies and start the transpiler watcher
lerna bootstrap --npm-client yarn
cd packages/atom-reshape-js
# To automatically compile on change to sources
yarn run watch
# To use the local compiled version in Atom
apm link
# To run tests while developing
jest --watch
```

If you're working on the Atom integration, there is also live-reload for Atom. Just open a window in Dev Mode (`Cmd+Shift+P` and use `Application: Open Dev`) and you're all set (you can check by opening dev tools, there's a log message every time the plugin is reactivated).

## Releasing

* Make sure that `master` is up-to-date.

```sh
# Bump the version number
yarn version --no-git-tag-version

# Commit the version bump
git add package.json
git commit -m "$(node -p 'require("./package.json").version')"

# Run the release script
./tools/release.sh

# Follow the printed instructions if everything looks good
```
