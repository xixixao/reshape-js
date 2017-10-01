'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.indexToAstPath = indexToAstPath;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function indexToAstPath(node, pos) {
  var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

  seen.add(node);

  var path = [];
  if (isInRange(nodeToRange(node), pos)) {
    path.push(node);
  } else {
    return [];
  }
  for (var prop in node) {
    var value = node[prop];
    if (prop !== 'loc' && value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !seen.has(value)) {
      var childPath = indexToAstPath(value, pos, seen);
      if (childPath.length > 0) {
        path.push.apply(path, _toConsumableArray(childPath));
        break;
      }
    }
  }
  return path;
}

var nodeToRange = function nodeToRange(node) {
  if (node.start != null) {
    return node;
  }
  if (node.length > 0) {
    // check first and last child
    var rangeFirst = node[0] && nodeToRange(node[0]);
    var rangeLast = node[node.length - 1] && nodeToRange(node[node.length - 1]);
    if (rangeFirst != null && rangeLast != null) {
      return { start: rangeFirst.start, end: rangeLast.end };
    }
  }
  return null;
};

var isInRange = function isInRange(range, pos) {
  return range != null && pos >= range.start && pos <= range.end;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm0vaW5kZXhUb0FzdFBhdGguanMiXSwibmFtZXMiOlsiaW5kZXhUb0FzdFBhdGgiLCJub2RlIiwicG9zIiwic2VlbiIsIlNldCIsImFkZCIsInBhdGgiLCJpc0luUmFuZ2UiLCJub2RlVG9SYW5nZSIsInB1c2giLCJwcm9wIiwidmFsdWUiLCJoYXMiLCJjaGlsZFBhdGgiLCJsZW5ndGgiLCJzdGFydCIsInJhbmdlRmlyc3QiLCJyYW5nZUxhc3QiLCJlbmQiLCJyYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFFZ0JBLGMsR0FBQUEsYzs7OztBQUFULFNBQVNBLGNBQVQsQ0FDTEMsSUFESyxFQUVMQyxHQUZLLEVBSUw7QUFBQSxNQURBQyxJQUNBLHVFQURrQixJQUFJQyxHQUFKLEVBQ2xCOztBQUNBRCxPQUFLRSxHQUFMLENBQVNKLElBQVQ7O0FBRUEsTUFBSUssT0FBTyxFQUFYO0FBQ0EsTUFBSUMsVUFBVUMsWUFBWVAsSUFBWixDQUFWLEVBQTZCQyxHQUE3QixDQUFKLEVBQXVDO0FBQ3JDSSxTQUFLRyxJQUFMLENBQVVSLElBQVY7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPLEVBQVA7QUFDRDtBQUNELE9BQUssSUFBSVMsSUFBVCxJQUFpQlQsSUFBakIsRUFBdUI7QUFDckIsUUFBTVUsUUFBUVYsS0FBS1MsSUFBTCxDQUFkO0FBQ0EsUUFDRUEsU0FBUyxLQUFULElBQ0FDLEtBREEsSUFFQSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBRmpCLElBR0EsQ0FBQ1IsS0FBS1MsR0FBTCxDQUFTRCxLQUFULENBSkgsRUFLRTtBQUNBLFVBQUlFLFlBQVliLGVBQWVXLEtBQWYsRUFBc0JULEdBQXRCLEVBQTJCQyxJQUEzQixDQUFoQjtBQUNBLFVBQUlVLFVBQVVDLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJSLGFBQUtHLElBQUwsZ0NBQWFJLFNBQWI7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU9QLElBQVA7QUFDRDs7QUFFRCxJQUFNRSxjQUFjLFNBQWRBLFdBQWMsT0FBUTtBQUMxQixNQUFJUCxLQUFLYyxLQUFMLElBQWMsSUFBbEIsRUFBd0I7QUFDdEIsV0FBT2QsSUFBUDtBQUNEO0FBQ0QsTUFBSUEsS0FBS2EsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25CO0FBQ0EsUUFBSUUsYUFBYWYsS0FBSyxDQUFMLEtBQVdPLFlBQVlQLEtBQUssQ0FBTCxDQUFaLENBQTVCO0FBQ0EsUUFBSWdCLFlBQVloQixLQUFLQSxLQUFLYSxNQUFMLEdBQWMsQ0FBbkIsS0FBeUJOLFlBQVlQLEtBQUtBLEtBQUthLE1BQUwsR0FBYyxDQUFuQixDQUFaLENBQXpDO0FBQ0EsUUFBSUUsY0FBYyxJQUFkLElBQXNCQyxhQUFhLElBQXZDLEVBQTZDO0FBQzNDLGFBQU8sRUFBQ0YsT0FBT0MsV0FBV0QsS0FBbkIsRUFBMEJHLEtBQUtELFVBQVVDLEdBQXpDLEVBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FiRDs7QUFlQSxJQUFNWCxZQUFZLFNBQVpBLFNBQVksQ0FBQ1ksS0FBRCxFQUFRakIsR0FBUjtBQUFBLFNBQ2hCaUIsU0FBUyxJQUFULElBQWlCakIsT0FBT2lCLE1BQU1KLEtBQTlCLElBQXVDYixPQUFPaUIsTUFBTUQsR0FEcEM7QUFBQSxDQUFsQiIsImZpbGUiOiJpbmRleFRvQXN0UGF0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleFRvQXN0UGF0aChcbiAgbm9kZTogTm9kZSxcbiAgcG9zOiBJbmRleCxcbiAgc2VlbjogU2V0PE5vZGU+ID0gbmV3IFNldCgpLFxuKSB7XG4gIHNlZW4uYWRkKG5vZGUpO1xuXG4gIGxldCBwYXRoID0gW107XG4gIGlmIChpc0luUmFuZ2Uobm9kZVRvUmFuZ2Uobm9kZSksIHBvcykpIHtcbiAgICBwYXRoLnB1c2gobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGZvciAobGV0IHByb3AgaW4gbm9kZSkge1xuICAgIGNvbnN0IHZhbHVlID0gbm9kZVtwcm9wXTtcbiAgICBpZiAoXG4gICAgICBwcm9wICE9PSAnbG9jJyAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICFzZWVuLmhhcyh2YWx1ZSlcbiAgICApIHtcbiAgICAgIGxldCBjaGlsZFBhdGggPSBpbmRleFRvQXN0UGF0aCh2YWx1ZSwgcG9zLCBzZWVuKTtcbiAgICAgIGlmIChjaGlsZFBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRoLnB1c2goLi4uY2hpbGRQYXRoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5jb25zdCBub2RlVG9SYW5nZSA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS5zdGFydCAhPSBudWxsKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgaWYgKG5vZGUubGVuZ3RoID4gMCkge1xuICAgIC8vIGNoZWNrIGZpcnN0IGFuZCBsYXN0IGNoaWxkXG4gICAgbGV0IHJhbmdlRmlyc3QgPSBub2RlWzBdICYmIG5vZGVUb1JhbmdlKG5vZGVbMF0pO1xuICAgIGxldCByYW5nZUxhc3QgPSBub2RlW25vZGUubGVuZ3RoIC0gMV0gJiYgbm9kZVRvUmFuZ2Uobm9kZVtub2RlLmxlbmd0aCAtIDFdKTtcbiAgICBpZiAocmFuZ2VGaXJzdCAhPSBudWxsICYmIHJhbmdlTGFzdCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4ge3N0YXJ0OiByYW5nZUZpcnN0LnN0YXJ0LCBlbmQ6IHJhbmdlTGFzdC5lbmR9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGlzSW5SYW5nZSA9IChyYW5nZSwgcG9zKSA9PlxuICByYW5nZSAhPSBudWxsICYmIHBvcyA+PSByYW5nZS5zdGFydCAmJiBwb3MgPD0gcmFuZ2UuZW5kO1xuIl19