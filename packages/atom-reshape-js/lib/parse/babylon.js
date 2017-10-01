'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parse = parse;
function parse(text) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var babylon = require('babylon');

  var babylonOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport', 'numericSeparator', 'importMeta', 'optionalCatchBinding', 'optionalChaining', 'classPrivateProperties']
  };

  var strictMode = true;
  var lastError = null;
  var ast = null;
  while (true) {
    try {
      ast = babylon.parse(text, _extends({}, babylonOptions, { strictMode: strictMode }));
      break;
    } catch (error) {
      if (strictMode) {
        strictMode = false;
        continue;
      }
      lastError = error;
      break;
    }
  }
  if (lastError != null) {
    var _lastError = lastError,
        loc = _lastError.loc,
        message = _lastError.message;

    throw {
      message: message.replace(/ \(.*\)/, ''),
      loc: {
        line: loc.line,
        column: loc.column + 1
      }
    };
  }
  delete ast.tokens;
  return ast;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZS9iYWJ5bG9uLmpzIl0sIm5hbWVzIjpbInBhcnNlIiwidGV4dCIsIm9wdHMiLCJiYWJ5bG9uIiwicmVxdWlyZSIsImJhYnlsb25PcHRpb25zIiwic291cmNlVHlwZSIsImFsbG93SW1wb3J0RXhwb3J0RXZlcnl3aGVyZSIsImFsbG93UmV0dXJuT3V0c2lkZUZ1bmN0aW9uIiwicGx1Z2lucyIsInN0cmljdE1vZGUiLCJsYXN0RXJyb3IiLCJhc3QiLCJlcnJvciIsImxvYyIsIm1lc3NhZ2UiLCJyZXBsYWNlIiwibGluZSIsImNvbHVtbiIsInRva2VucyJdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7Ozs7O1FBSWdCQSxLLEdBQUFBLEs7QUFBVCxTQUFTQSxLQUFULENBQWVDLElBQWYsRUFBd0Q7QUFBQSxNQUEzQkMsSUFBMkIsdUVBQVgsSUFBVzs7QUFDN0QsTUFBTUMsVUFBVUMsUUFBUSxTQUFSLENBQWhCOztBQUVBLE1BQU1DLGlCQUFpQjtBQUNyQkMsZ0JBQVksUUFEUztBQUVyQkMsaUNBQTZCLElBRlI7QUFHckJDLGdDQUE0QixJQUhQO0FBSXJCQyxhQUFTLENBQ1AsS0FETyxFQUVQLE1BRk8sRUFHUCxlQUhPLEVBSVAsa0JBSk8sRUFLUCxZQUxPLEVBTVAsaUJBTk8sRUFPUCxrQkFQTyxFQVFQLGlCQVJPLEVBU1AsY0FUTyxFQVVQLGNBVk8sRUFXUCxlQVhPLEVBWVAsa0JBWk8sRUFhUCxZQWJPLEVBY1Asc0JBZE8sRUFlUCxrQkFmTyxFQWdCUCx3QkFoQk87QUFKWSxHQUF2Qjs7QUF3QkEsTUFBSUMsYUFBYSxJQUFqQjtBQUNBLE1BQUlDLFlBQVksSUFBaEI7QUFDQSxNQUFJQyxNQUFNLElBQVY7QUFDQSxTQUFPLElBQVAsRUFBYTtBQUNYLFFBQUk7QUFDRkEsWUFBTVQsUUFBUUgsS0FBUixDQUFjQyxJQUFkLGVBQXdCSSxjQUF4QixJQUF3Q0ssc0JBQXhDLElBQU47QUFDQTtBQUNELEtBSEQsQ0FHRSxPQUFPRyxLQUFQLEVBQWM7QUFDZCxVQUFJSCxVQUFKLEVBQWdCO0FBQ2RBLHFCQUFhLEtBQWI7QUFDQTtBQUNEO0FBQ0RDLGtCQUFZRSxLQUFaO0FBQ0E7QUFDRDtBQUNGO0FBQ0QsTUFBSUYsYUFBYSxJQUFqQixFQUF1QjtBQUFBLHFCQUNFQSxTQURGO0FBQUEsUUFDZEcsR0FEYyxjQUNkQSxHQURjO0FBQUEsUUFDVEMsT0FEUyxjQUNUQSxPQURTOztBQUVyQixVQUFNO0FBQ0pBLGVBQVNBLFFBQVFDLE9BQVIsQ0FBZ0IsU0FBaEIsRUFBMkIsRUFBM0IsQ0FETDtBQUVKRixXQUFLO0FBQ0hHLGNBQU1ILElBQUlHLElBRFA7QUFFSEMsZ0JBQVFKLElBQUlJLE1BQUosR0FBYTtBQUZsQjtBQUZELEtBQU47QUFPRDtBQUNELFNBQVFOLEdBQUQsQ0FBV08sTUFBbEI7QUFDQSxTQUFPUCxHQUFQO0FBQ0QiLCJmaWxlIjoiYmFieWxvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbid1c2Ugc3RyaWN0JztcblxudHlwZSBBc3QgPSBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSh0ZXh0OiBzdHJpbmcsIG9wdHM6ID9PYmplY3QgPSBudWxsKTogQXN0IHtcbiAgY29uc3QgYmFieWxvbiA9IHJlcXVpcmUoJ2JhYnlsb24nKTtcblxuICBjb25zdCBiYWJ5bG9uT3B0aW9ucyA9IHtcbiAgICBzb3VyY2VUeXBlOiAnbW9kdWxlJyxcbiAgICBhbGxvd0ltcG9ydEV4cG9ydEV2ZXJ5d2hlcmU6IHRydWUsXG4gICAgYWxsb3dSZXR1cm5PdXRzaWRlRnVuY3Rpb246IHRydWUsXG4gICAgcGx1Z2luczogW1xuICAgICAgJ2pzeCcsXG4gICAgICAnZmxvdycsXG4gICAgICAnZG9FeHByZXNzaW9ucycsXG4gICAgICAnb2JqZWN0UmVzdFNwcmVhZCcsXG4gICAgICAnZGVjb3JhdG9ycycsXG4gICAgICAnY2xhc3NQcm9wZXJ0aWVzJyxcbiAgICAgICdleHBvcnRFeHRlbnNpb25zJyxcbiAgICAgICdhc3luY0dlbmVyYXRvcnMnLFxuICAgICAgJ2Z1bmN0aW9uQmluZCcsXG4gICAgICAnZnVuY3Rpb25TZW50JyxcbiAgICAgICdkeW5hbWljSW1wb3J0JyxcbiAgICAgICdudW1lcmljU2VwYXJhdG9yJyxcbiAgICAgICdpbXBvcnRNZXRhJyxcbiAgICAgICdvcHRpb25hbENhdGNoQmluZGluZycsXG4gICAgICAnb3B0aW9uYWxDaGFpbmluZycsXG4gICAgICAnY2xhc3NQcml2YXRlUHJvcGVydGllcycsXG4gICAgXSxcbiAgfTtcblxuICBsZXQgc3RyaWN0TW9kZSA9IHRydWU7XG4gIGxldCBsYXN0RXJyb3IgPSBudWxsO1xuICBsZXQgYXN0ID0gbnVsbDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB0cnkge1xuICAgICAgYXN0ID0gYmFieWxvbi5wYXJzZSh0ZXh0LCB7Li4uYmFieWxvbk9wdGlvbnMsIHN0cmljdE1vZGV9KTtcbiAgICAgIGJyZWFrO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoc3RyaWN0TW9kZSkge1xuICAgICAgICBzdHJpY3RNb2RlID0gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbGFzdEVycm9yID0gZXJyb3I7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGxhc3RFcnJvciAhPSBudWxsKSB7XG4gICAgY29uc3Qge2xvYywgbWVzc2FnZX0gPSBsYXN0RXJyb3I7XG4gICAgdGhyb3cge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZS5yZXBsYWNlKC8gXFwoLipcXCkvLCAnJyksXG4gICAgICBsb2M6IHtcbiAgICAgICAgbGluZTogbG9jLmxpbmUsXG4gICAgICAgIGNvbHVtbjogbG9jLmNvbHVtbiArIDEsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgZGVsZXRlIChhc3Q6IGFueSkudG9rZW5zO1xuICByZXR1cm4gYXN0O1xufVxuIl19