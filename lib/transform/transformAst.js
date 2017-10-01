'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.transformAst = transformAst;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function transformAst(node, cb) {
  var transformed = cb(node);
  if (transformed != null) {
    return transformed;
  }
  if (Array.isArray(node)) {
    var _newNode = [];
    for (var i = 0; i < node.length; i++) {
      var _transformed = transformAst(node[i], cb);
      if (Array.isArray(_transformed)) {
        _newNode.push.apply(_newNode, _toConsumableArray(_transformed));
      } else {
        _newNode.push(_transformed);
      }
    }
    return _newNode;
  }
  var newNode = {};
  for (var prop in node) {
    var value = node[prop];
    if (prop === 'loc' || prop === 'start' || prop === 'end') {
      continue;
    }
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      newNode[prop] = transformAst(value, cb);
    } else {
      newNode[prop] = value;
    }
  }
  newNode._source = node;
  return newNode;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm0vdHJhbnNmb3JtQXN0LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUFzdCIsIm5vZGUiLCJjYiIsInRyYW5zZm9ybWVkIiwiQXJyYXkiLCJpc0FycmF5IiwibmV3Tm9kZSIsImkiLCJsZW5ndGgiLCJwdXNoIiwicHJvcCIsInZhbHVlIiwiX3NvdXJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFFZ0JBLFksR0FBQUEsWTs7OztBQUFULFNBQVNBLFlBQVQsQ0FBc0JDLElBQXRCLEVBQWtDQyxFQUFsQyxFQUEyRDtBQUNoRSxNQUFNQyxjQUFjRCxHQUFHRCxJQUFILENBQXBCO0FBQ0EsTUFBSUUsZUFBZSxJQUFuQixFQUF5QjtBQUN2QixXQUFPQSxXQUFQO0FBQ0Q7QUFDRCxNQUFJQyxNQUFNQyxPQUFOLENBQWNKLElBQWQsQ0FBSixFQUF5QjtBQUN2QixRQUFNSyxXQUFVLEVBQWhCO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLEtBQUtPLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNwQyxVQUFNSixlQUFjSCxhQUFhQyxLQUFLTSxDQUFMLENBQWIsRUFBc0JMLEVBQXRCLENBQXBCO0FBQ0EsVUFBSUUsTUFBTUMsT0FBTixDQUFjRixZQUFkLENBQUosRUFBZ0M7QUFDOUJHLGlCQUFRRyxJQUFSLG9DQUFnQk4sWUFBaEI7QUFDRCxPQUZELE1BRU87QUFDTEcsaUJBQVFHLElBQVIsQ0FBYU4sWUFBYjtBQUNEO0FBQ0Y7QUFDRCxXQUFPRyxRQUFQO0FBQ0Q7QUFDRCxNQUFNQSxVQUFVLEVBQWhCO0FBQ0EsT0FBSyxJQUFJSSxJQUFULElBQWlCVCxJQUFqQixFQUF1QjtBQUNyQixRQUFNVSxRQUFRVixLQUFLUyxJQUFMLENBQWQ7QUFDQSxRQUFJQSxTQUFTLEtBQVQsSUFBa0JBLFNBQVMsT0FBM0IsSUFBc0NBLFNBQVMsS0FBbkQsRUFBMEQ7QUFDeEQ7QUFDRDtBQUNELFFBQUlDLFNBQVMsUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxPQUFpQixRQUE5QixFQUF3QztBQUN0Q0wsY0FBUUksSUFBUixJQUFnQlYsYUFBYVcsS0FBYixFQUFvQlQsRUFBcEIsQ0FBaEI7QUFDRCxLQUZELE1BRU87QUFDTEksY0FBUUksSUFBUixJQUFnQkMsS0FBaEI7QUFDRDtBQUNGO0FBQ0RMLFVBQVFNLE9BQVIsR0FBa0JYLElBQWxCO0FBQ0EsU0FBT0ssT0FBUDtBQUNEIiwiZmlsZSI6InRyYW5zZm9ybUFzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1Bc3Qobm9kZTogTm9kZSwgY2I6IE5vZGUgPT4gP05vZGUpOiBOb2RlIHtcbiAgY29uc3QgdHJhbnNmb3JtZWQgPSBjYihub2RlKTtcbiAgaWYgKHRyYW5zZm9ybWVkICE9IG51bGwpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBjb25zdCBuZXdOb2RlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybUFzdChub2RlW2ldLCBjYik7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmFuc2Zvcm1lZCkpIHtcbiAgICAgICAgbmV3Tm9kZS5wdXNoKC4uLnRyYW5zZm9ybWVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05vZGUucHVzaCh0cmFuc2Zvcm1lZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdOb2RlO1xuICB9XG4gIGNvbnN0IG5ld05vZGUgPSB7fTtcbiAgZm9yIChsZXQgcHJvcCBpbiBub2RlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBub2RlW3Byb3BdO1xuICAgIGlmIChwcm9wID09PSAnbG9jJyB8fCBwcm9wID09PSAnc3RhcnQnIHx8IHByb3AgPT09ICdlbmQnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5ld05vZGVbcHJvcF0gPSB0cmFuc2Zvcm1Bc3QodmFsdWUsIGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3Tm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBuZXdOb2RlLl9zb3VyY2UgPSBub2RlO1xuICByZXR1cm4gbmV3Tm9kZTtcbn1cbiJdfQ==