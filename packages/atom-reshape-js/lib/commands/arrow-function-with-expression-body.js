'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reshape = reshape;

var _is = require('../parse/is');

var _arrows = require('../build/arrows');

function reshape(fn) {
  var unsafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if ((0, _is.is)(fn, 'ArrowFunctionExpression')) {
    var result = getResult(fn, unsafe);
    if (result !== null) {
      return [[fn.body, result]];
    }
  }
  if (unsafe && (0, _is.is)(fn, 'FunctionDeclaration')) {
    var _result = getResult(fn, unsafe);
    if (_result !== null) {
      return [[fn, (0, _arrows.arrowDeclaration)(fn.id, fn.params, _result)]];
    }
  }
  if (unsafe && (0, _is.is)(fn, 'FunctionExpression')) {
    var _result2 = getResult(fn, unsafe);
    if (_result2 !== null) {
      return [[fn, (0, _arrows.arrowExpression)(fn.params, _result2)]];
    }
  }
  return null;
}

var getResult = function getResult(fn, unsafe) {
  var body = fn.body;
  if ((0, _is.is)(body, 'BlockStatement')) {
    var statements = body.body;
    if (statements.length === 1) {
      var returnStmt = statements[0];
      if ((0, _is.is)(returnStmt, 'ReturnStatement')) {
        var result = returnStmt.argument;
        return result;
      } else if (unsafe && (0, _is.is)(returnStmt, 'ExpressionStatement')) {
        var _result3 = returnStmt.expression;
        return _result3;
      }
    }
  }
  return null;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9hcnJvdy1mdW5jdGlvbi13aXRoLWV4cHJlc3Npb24tYm9keS5qcyJdLCJuYW1lcyI6WyJyZXNoYXBlIiwiZm4iLCJ1bnNhZmUiLCJyZXN1bHQiLCJnZXRSZXN1bHQiLCJib2R5IiwiaWQiLCJwYXJhbXMiLCJzdGF0ZW1lbnRzIiwibGVuZ3RoIiwicmV0dXJuU3RtdCIsImFyZ3VtZW50IiwiZXhwcmVzc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFLZ0JBLE8sR0FBQUEsTzs7QUFIaEI7O0FBQ0E7O0FBRU8sU0FBU0EsT0FBVCxDQUNMQyxFQURLLEVBR3lCO0FBQUEsTUFEOUJDLE1BQzhCLHVFQURaLElBQ1k7O0FBQzlCLE1BQUksWUFBR0QsRUFBSCxFQUFPLHlCQUFQLENBQUosRUFBdUM7QUFDckMsUUFBTUUsU0FBU0MsVUFBVUgsRUFBVixFQUFjQyxNQUFkLENBQWY7QUFDQSxRQUFJQyxXQUFXLElBQWYsRUFBcUI7QUFDbkIsYUFBTyxDQUFDLENBQUNGLEdBQUdJLElBQUosRUFBVUYsTUFBVixDQUFELENBQVA7QUFDRDtBQUNGO0FBQ0QsTUFBSUQsVUFBVSxZQUFHRCxFQUFILEVBQU8scUJBQVAsQ0FBZCxFQUE2QztBQUMzQyxRQUFNRSxVQUFTQyxVQUFVSCxFQUFWLEVBQWNDLE1BQWQsQ0FBZjtBQUNBLFFBQUlDLFlBQVcsSUFBZixFQUFxQjtBQUNuQixhQUFPLENBQUMsQ0FBQ0YsRUFBRCxFQUFLLDhCQUFpQkEsR0FBR0ssRUFBcEIsRUFBd0JMLEdBQUdNLE1BQTNCLEVBQW1DSixPQUFuQyxDQUFMLENBQUQsQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxNQUFJRCxVQUFVLFlBQUdELEVBQUgsRUFBTyxvQkFBUCxDQUFkLEVBQTRDO0FBQzFDLFFBQU1FLFdBQVNDLFVBQVVILEVBQVYsRUFBY0MsTUFBZCxDQUFmO0FBQ0EsUUFBSUMsYUFBVyxJQUFmLEVBQXFCO0FBQ25CLGFBQU8sQ0FBQyxDQUFDRixFQUFELEVBQUssNkJBQWdCQSxHQUFHTSxNQUFuQixFQUEyQkosUUFBM0IsQ0FBTCxDQUFELENBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNILEVBQUQsRUFBS0MsTUFBTCxFQUFnQjtBQUNoQyxNQUFNRyxPQUFPSixHQUFHSSxJQUFoQjtBQUNBLE1BQUksWUFBR0EsSUFBSCxFQUFTLGdCQUFULENBQUosRUFBZ0M7QUFDOUIsUUFBTUcsYUFBYUgsS0FBS0EsSUFBeEI7QUFDQSxRQUFJRyxXQUFXQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCLFVBQU1DLGFBQWFGLFdBQVcsQ0FBWCxDQUFuQjtBQUNBLFVBQUksWUFBR0UsVUFBSCxFQUFlLGlCQUFmLENBQUosRUFBdUM7QUFDckMsWUFBTVAsU0FBU08sV0FBV0MsUUFBMUI7QUFDQSxlQUFPUixNQUFQO0FBQ0QsT0FIRCxNQUdPLElBQUlELFVBQVUsWUFBR1EsVUFBSCxFQUFlLHFCQUFmLENBQWQsRUFBcUQ7QUFDMUQsWUFBTVAsV0FBU08sV0FBV0UsVUFBMUI7QUFDQSxlQUFPVCxRQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FoQkQiLCJmaWxlIjoiYXJyb3ctZnVuY3Rpb24td2l0aC1leHByZXNzaW9uLWJvZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQge2lzfSBmcm9tICcuLi9wYXJzZS9pcyc7XG5pbXBvcnQge2Fycm93RGVjbGFyYXRpb24sIGFycm93RXhwcmVzc2lvbn0gZnJvbSAnLi4vYnVpbGQvYXJyb3dzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2hhcGUoXG4gIGZuOiBOb2RlLFxuICB1bnNhZmU6IGJvb2xlYW4gPSB0cnVlLFxuKTogP0FycmF5PFtOb2RlLCBOb2RlIHwgTm9kZXNdPiB7XG4gIGlmIChpcyhmbiwgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRSZXN1bHQoZm4sIHVuc2FmZSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtbZm4uYm9keSwgcmVzdWx0XV07XG4gICAgfVxuICB9XG4gIGlmICh1bnNhZmUgJiYgaXMoZm4sICdGdW5jdGlvbkRlY2xhcmF0aW9uJykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRSZXN1bHQoZm4sIHVuc2FmZSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtbZm4sIGFycm93RGVjbGFyYXRpb24oZm4uaWQsIGZuLnBhcmFtcywgcmVzdWx0KV1dO1xuICAgIH1cbiAgfVxuICBpZiAodW5zYWZlICYmIGlzKGZuLCAnRnVuY3Rpb25FeHByZXNzaW9uJykpIHtcbiAgICBjb25zdCByZXN1bHQgPSBnZXRSZXN1bHQoZm4sIHVuc2FmZSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtbZm4sIGFycm93RXhwcmVzc2lvbihmbi5wYXJhbXMsIHJlc3VsdCldXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IGdldFJlc3VsdCA9IChmbiwgdW5zYWZlKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBmbi5ib2R5O1xuICBpZiAoaXMoYm9keSwgJ0Jsb2NrU3RhdGVtZW50JykpIHtcbiAgICBjb25zdCBzdGF0ZW1lbnRzID0gYm9keS5ib2R5O1xuICAgIGlmIChzdGF0ZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgcmV0dXJuU3RtdCA9IHN0YXRlbWVudHNbMF07XG4gICAgICBpZiAoaXMocmV0dXJuU3RtdCwgJ1JldHVyblN0YXRlbWVudCcpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJldHVyblN0bXQuYXJndW1lbnQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9IGVsc2UgaWYgKHVuc2FmZSAmJiBpcyhyZXR1cm5TdG10LCAnRXhwcmVzc2lvblN0YXRlbWVudCcpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJldHVyblN0bXQuZXhwcmVzc2lvbjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuIl19