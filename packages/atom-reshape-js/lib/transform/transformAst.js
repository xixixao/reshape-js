'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.transformAst = transformAst;
function transformAst(node, cb) {
  var transformed = cb(node);
  if (transformed != null) {
    return transformed;
  }
  if (Array.isArray(node)) {
    var _newNode = [];
    for (var i = 0; i < node.length; i++) {
      _newNode[i] = transformAst(node[i], cb);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm0vdHJhbnNmb3JtQXN0LmpzIl0sIm5hbWVzIjpbInRyYW5zZm9ybUFzdCIsIm5vZGUiLCJjYiIsInRyYW5zZm9ybWVkIiwiQXJyYXkiLCJpc0FycmF5IiwibmV3Tm9kZSIsImkiLCJsZW5ndGgiLCJwcm9wIiwidmFsdWUiLCJfc291cmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUlnQkEsWSxHQUFBQSxZO0FBQVQsU0FBU0EsWUFBVCxDQUFzQkMsSUFBdEIsRUFBa0NDLEVBQWxDLEVBQTJEO0FBQ2hFLE1BQU1DLGNBQWNELEdBQUdELElBQUgsQ0FBcEI7QUFDQSxNQUFJRSxlQUFlLElBQW5CLEVBQXlCO0FBQ3ZCLFdBQU9BLFdBQVA7QUFDRDtBQUNELE1BQUlDLE1BQU1DLE9BQU4sQ0FBY0osSUFBZCxDQUFKLEVBQXlCO0FBQ3ZCLFFBQU1LLFdBQVUsRUFBaEI7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sS0FBS08sTUFBekIsRUFBaUNELEdBQWpDLEVBQXNDO0FBQ3BDRCxlQUFRQyxDQUFSLElBQWFQLGFBQWFDLEtBQUtNLENBQUwsQ0FBYixFQUFzQkwsRUFBdEIsQ0FBYjtBQUNEO0FBQ0QsV0FBT0ksUUFBUDtBQUNEO0FBQ0QsTUFBTUEsVUFBVSxFQUFoQjtBQUNBLE9BQUssSUFBSUcsSUFBVCxJQUFpQlIsSUFBakIsRUFBdUI7QUFDckIsUUFBTVMsUUFBUVQsS0FBS1EsSUFBTCxDQUFkO0FBQ0EsUUFBSUEsU0FBUyxLQUFULElBQWtCQSxTQUFTLE9BQTNCLElBQXNDQSxTQUFTLEtBQW5ELEVBQTBEO0FBQ3hEO0FBQ0Q7QUFDRCxRQUFJQyxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBOUIsRUFBd0M7QUFDdENKLGNBQVFHLElBQVIsSUFBZ0JULGFBQWFVLEtBQWIsRUFBb0JSLEVBQXBCLENBQWhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xJLGNBQVFHLElBQVIsSUFBZ0JDLEtBQWhCO0FBQ0Q7QUFDRjtBQUNESixVQUFRSyxPQUFSLEdBQWtCVixJQUFsQjtBQUNBLFNBQU9LLE9BQVA7QUFDRCIsImZpbGUiOiJ0cmFuc2Zvcm1Bc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG50eXBlIE5vZGUgPSBhbnk7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1Bc3Qobm9kZTogTm9kZSwgY2I6IE5vZGUgPT4gP05vZGUpOiBOb2RlIHtcbiAgY29uc3QgdHJhbnNmb3JtZWQgPSBjYihub2RlKTtcbiAgaWYgKHRyYW5zZm9ybWVkICE9IG51bGwpIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBjb25zdCBuZXdOb2RlID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdOb2RlW2ldID0gdHJhbnNmb3JtQXN0KG5vZGVbaV0sIGNiKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld05vZGU7XG4gIH1cbiAgY29uc3QgbmV3Tm9kZSA9IHt9O1xuICBmb3IgKGxldCBwcm9wIGluIG5vZGUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5vZGVbcHJvcF07XG4gICAgaWYgKHByb3AgPT09ICdsb2MnIHx8IHByb3AgPT09ICdzdGFydCcgfHwgcHJvcCA9PT0gJ2VuZCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3Tm9kZVtwcm9wXSA9IHRyYW5zZm9ybUFzdCh2YWx1ZSwgY2IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdOb2RlW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIG5ld05vZGUuX3NvdXJjZSA9IG5vZGU7XG4gIHJldHVybiBuZXdOb2RlO1xufVxuIl19