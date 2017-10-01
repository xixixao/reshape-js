'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.applyReshape = applyReshape;

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babylon = require('../parse/babylon');

var _indexToAstPath = require('./indexToAstPath');

var _transformAst = require('./transformAst');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyReshape(source, index, reshape) {
  var ast = (0, _babylon.parse)(source);
  var nodePath = (0, _indexToAstPath.indexToAstPath)(ast, index);

  var subs = getSubstitutions(ast, nodePath, reshape);

  if (subs == null) {
    return null;
  }

  var newAst = applySubstitutions(ast, subs);
  return (0, _babelGenerator2.default)(newAst).code;
}

var getSubstitutions = function getSubstitutions(ast, nodePath, reshape) {
  var subs = null;
  for (var i = nodePath.length - 1; i >= 0; i--) {
    subs = reshape(nodePath[i]);
    if (subs != null) {
      break;
    }
  }
  return subs;
};

var applySubstitutions = function applySubstitutions(ast, subs) {
  return (0, _transformAst.transformAst)(ast, function (node) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = subs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var replaced = _ref2[0];
        var replacement = _ref2[1];

        if (node === replaced) {
          return replacement;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm0vYXBwbHlSZXNoYXBlLmpzIl0sIm5hbWVzIjpbImFwcGx5UmVzaGFwZSIsInNvdXJjZSIsImluZGV4IiwicmVzaGFwZSIsImFzdCIsIm5vZGVQYXRoIiwic3VicyIsImdldFN1YnN0aXR1dGlvbnMiLCJuZXdBc3QiLCJhcHBseVN1YnN0aXR1dGlvbnMiLCJjb2RlIiwiaSIsImxlbmd0aCIsInJlcGxhY2VkIiwicmVwbGFjZW1lbnQiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQU9nQkEsWSxHQUFBQSxZOztBQUxoQjs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRU8sU0FBU0EsWUFBVCxDQUNMQyxNQURLLEVBRUxDLEtBRkssRUFHTEMsT0FISyxFQUlJO0FBQ1QsTUFBTUMsTUFBTSxvQkFBTUgsTUFBTixDQUFaO0FBQ0EsTUFBTUksV0FBVyxvQ0FBZUQsR0FBZixFQUFvQkYsS0FBcEIsQ0FBakI7O0FBRUEsTUFBTUksT0FBT0MsaUJBQWlCSCxHQUFqQixFQUFzQkMsUUFBdEIsRUFBZ0NGLE9BQWhDLENBQWI7O0FBRUEsTUFBSUcsUUFBUSxJQUFaLEVBQWtCO0FBQ2hCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQU1FLFNBQVNDLG1CQUFtQkwsR0FBbkIsRUFBd0JFLElBQXhCLENBQWY7QUFDQSxTQUFPLDhCQUFTRSxNQUFULEVBQWlCRSxJQUF4QjtBQUNEOztBQUVELElBQU1ILG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQUNILEdBQUQsRUFBTUMsUUFBTixFQUFnQkYsT0FBaEIsRUFBNEI7QUFDbkQsTUFBSUcsT0FBTyxJQUFYO0FBQ0EsT0FBSyxJQUFJSyxJQUFJTixTQUFTTyxNQUFULEdBQWtCLENBQS9CLEVBQWtDRCxLQUFLLENBQXZDLEVBQTBDQSxHQUExQyxFQUErQztBQUM3Q0wsV0FBT0gsUUFBUUUsU0FBU00sQ0FBVCxDQUFSLENBQVA7QUFDQSxRQUFJTCxRQUFRLElBQVosRUFBa0I7QUFDaEI7QUFDRDtBQUNGO0FBQ0QsU0FBT0EsSUFBUDtBQUNELENBVEQ7O0FBV0EsSUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0wsR0FBRCxFQUFNRSxJQUFOO0FBQUEsU0FDekIsZ0NBQWFGLEdBQWIsRUFBa0IsZ0JBQVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDeEIsMkJBQXNDRSxJQUF0Qyw4SEFBNEM7QUFBQTs7QUFBQTs7QUFBQSxZQUFoQ08sUUFBZ0M7QUFBQSxZQUF0QkMsV0FBc0I7O0FBQzFDLFlBQUlDLFNBQVNGLFFBQWIsRUFBdUI7QUFDckIsaUJBQU9DLFdBQVA7QUFDRDtBQUNGO0FBTHVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTXhCLFdBQU8sSUFBUDtBQUNELEdBUEQsQ0FEeUI7QUFBQSxDQUEzQiIsImZpbGUiOiJhcHBseVJlc2hhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSAnYmFiZWwtZ2VuZXJhdG9yJztcbmltcG9ydCB7cGFyc2V9IGZyb20gJy4uL3BhcnNlL2JhYnlsb24nO1xuaW1wb3J0IHtpbmRleFRvQXN0UGF0aH0gZnJvbSAnLi9pbmRleFRvQXN0UGF0aCc7XG5pbXBvcnQge3RyYW5zZm9ybUFzdH0gZnJvbSAnLi90cmFuc2Zvcm1Bc3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlSZXNoYXBlKFxuICBzb3VyY2U6IHN0cmluZyxcbiAgaW5kZXg6IEluZGV4LFxuICByZXNoYXBlOiBSZXNoYXBlLFxuKTogP3N0cmluZyB7XG4gIGNvbnN0IGFzdCA9IHBhcnNlKHNvdXJjZSk7XG4gIGNvbnN0IG5vZGVQYXRoID0gaW5kZXhUb0FzdFBhdGgoYXN0LCBpbmRleCk7XG5cbiAgY29uc3Qgc3VicyA9IGdldFN1YnN0aXR1dGlvbnMoYXN0LCBub2RlUGF0aCwgcmVzaGFwZSk7XG5cbiAgaWYgKHN1YnMgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgbmV3QXN0ID0gYXBwbHlTdWJzdGl0dXRpb25zKGFzdCwgc3Vicyk7XG4gIHJldHVybiBnZW5lcmF0ZShuZXdBc3QpLmNvZGU7XG59XG5cbmNvbnN0IGdldFN1YnN0aXR1dGlvbnMgPSAoYXN0LCBub2RlUGF0aCwgcmVzaGFwZSkgPT4ge1xuICBsZXQgc3VicyA9IG51bGw7XG4gIGZvciAobGV0IGkgPSBub2RlUGF0aC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHN1YnMgPSByZXNoYXBlKG5vZGVQYXRoW2ldKTtcbiAgICBpZiAoc3VicyAhPSBudWxsKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN1YnM7XG59O1xuXG5jb25zdCBhcHBseVN1YnN0aXR1dGlvbnMgPSAoYXN0LCBzdWJzKSA9PlxuICB0cmFuc2Zvcm1Bc3QoYXN0LCBub2RlID0+IHtcbiAgICBmb3IgKGNvbnN0IFtyZXBsYWNlZCwgcmVwbGFjZW1lbnRdIG9mIHN1YnMpIHtcbiAgICAgIGlmIChub2RlID09PSByZXBsYWNlZCkge1xuICAgICAgICByZXR1cm4gcmVwbGFjZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9KTtcbiJdfQ==