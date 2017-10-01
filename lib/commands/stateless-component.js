'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.reshape = reshape;

var _is = require('../parse/is');

var _arrows = require('../build/arrows');

var _core = require('../build/core');

var _objects = require('../build/objects');

var _vars = require('../build/vars');

var _arrowFunctionWithExpressionBody = require('../commands/arrow-function-with-expression-body');

function reshape(cls) {
  if ((0, _is.is)(cls, 'ClassDeclaration')) {
    var body = cls.body;
    if ((0, _is.is)(body, 'ClassBody')) {
      var fields = body.body;
      var renderBody = null;
      var instancees = [];
      var statics = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          if ((0, _is.is)(field, 'ClassMethod')) {
            var methodID = field.key;
            var methodBody = field.body;
            if ((0, _is.is)(methodID, 'Identifier')) {
              var methodName = methodID.name;
              if (methodName === 'render') {
                renderBody = methodBody;
              } else {
                if (field.static) {
                  var staticMethod = (0, _arrows.arrowExpression)(field.params, field.body);
                  statics.push(assignment((0, _objects.access)(cls.id, field.key), staticMethod));
                } else {
                  // TODO: instancees.push(field)
                }
              }
            }
          } else if ((0, _is.is)(field, 'ClassProperty')) {
            if (field.static) {
              statics.push(assignment((0, _objects.access)(cls.id, field.key), field.value));
            } else {
              // TODO: instancees.push(field)
            }
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

      if ((0, _is.is)(renderBody, 'BlockStatement')) {
        var render = getRender(cls, renderBody);
        return [[cls, [(0, _vars.constDeclaration)(cls.id, render)].concat(statics)]];
      }
    }
  }
}

var getPropsType = function getPropsType(cls) {
  var types = cls.superTypeParameters;
  if ((0, _is.is)(types, 'TypeParameterInstantiation')) {
    var params = types.params;
    if (params.length > 0) {
      var propsType = params[0];
      return propsType;
    }
  }
  return null;
};

var getRender = function getRender(cls, renderBody) {
  var propsType = getPropsType(cls);
  var propParam = (0, _core.ident)('props', propsType);
  var render = (0, _arrows.arrowExpression)([propParam], renderBody);
  var simplerFn = (0, _arrowFunctionWithExpressionBody.reshape)(render);
  if (simplerFn != null) {
    var _simplerFn = _slicedToArray(simplerFn, 1),
        _simplerFn$ = _slicedToArray(_simplerFn[0], 2),
        _ = _simplerFn$[0],
        _renderBody = _simplerFn$[1];

    return (0, _arrows.arrowExpression)([propParam], _renderBody);
  } else {
    return render;
  }
};

var assignment = function assignment(left, right) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: left,
      right: right
    }
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zdGF0ZWxlc3MtY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbInJlc2hhcGUiLCJjbHMiLCJib2R5IiwiZmllbGRzIiwicmVuZGVyQm9keSIsImluc3RhbmNlZXMiLCJzdGF0aWNzIiwiZmllbGQiLCJtZXRob2RJRCIsImtleSIsIm1ldGhvZEJvZHkiLCJtZXRob2ROYW1lIiwibmFtZSIsInN0YXRpYyIsInN0YXRpY01ldGhvZCIsInBhcmFtcyIsInB1c2giLCJhc3NpZ25tZW50IiwiaWQiLCJ2YWx1ZSIsInJlbmRlciIsImdldFJlbmRlciIsImdldFByb3BzVHlwZSIsInR5cGVzIiwic3VwZXJUeXBlUGFyYW1ldGVycyIsImxlbmd0aCIsInByb3BzVHlwZSIsInByb3BQYXJhbSIsInNpbXBsZXJGbiIsIl8iLCJsZWZ0IiwicmlnaHQiLCJ0eXBlIiwiZXhwcmVzc2lvbiIsIm9wZXJhdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQVNnQkEsTyxHQUFBQSxPOztBQVBoQjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUEwRDtBQUMvRCxNQUFJLFlBQUdBLEdBQUgsRUFBUSxrQkFBUixDQUFKLEVBQWlDO0FBQy9CLFFBQU1DLE9BQU9ELElBQUlDLElBQWpCO0FBQ0EsUUFBSSxZQUFHQSxJQUFILEVBQVMsV0FBVCxDQUFKLEVBQTJCO0FBQ3pCLFVBQU1DLFNBQVNELEtBQUtBLElBQXBCO0FBQ0EsVUFBSUUsYUFBYSxJQUFqQjtBQUNBLFVBQU1DLGFBQWEsRUFBbkI7QUFDQSxVQUFNQyxVQUFVLEVBQWhCO0FBSnlCO0FBQUE7QUFBQTs7QUFBQTtBQUt6Qiw2QkFBb0JILE1BQXBCLDhIQUE0QjtBQUFBLGNBQWpCSSxLQUFpQjs7QUFDMUIsY0FBSSxZQUFHQSxLQUFILEVBQVUsYUFBVixDQUFKLEVBQThCO0FBQzVCLGdCQUFNQyxXQUFXRCxNQUFNRSxHQUF2QjtBQUNB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bmltcG9ydCB7aXN9IGZyb20gJy4uL3BhcnNlL2lzJztcbmltcG9ydCB7YXJyb3dEZWNsYXJhdGlvbiwgYXJyb3dFeHByZXNzaW9ufSBmcm9tICcuLi9idWlsZC9hcnJvd3MnO1xuaW1wb3J0IHtpZGVudH0gZnJvbSAnLi4vYnVpbGQvY29yZSc7XG5pbXBvcnQge2FjY2Vzc30gZnJvbSAnLi4vYnVpbGQvb2JqZWN0cyc7XG5pbXBvcnQge2NvbnN0RGVjbGFyYXRpb259IGZyb20gJy4uL2J1aWxkL3ZhcnMnO1xuaW1wb3J0IHtyZXNoYXBlIGFzIGFycm93V2l0aEV4cHJlc3Npb25Cb2R5fSBmcm9tICcuLi9jb21tYW5kcy9hcnJvdy1mdW5jdGlvbi13aXRoLWV4cHJlc3Npb24tYm9keSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNoYXBlKGNsczogTm9kZSk6ID9BcnJheTxbTm9kZSwgTm9kZSB8IE5vZGVzXT4ge1xuICBpZiAoaXMoY2xzLCAnQ2xhc3NEZWNsYXJhdGlvbicpKSB7XG4gICAgY29uc3QgYm9keSA9IGNscy5ib2R5O1xuICAgIGlmIChpcyhib2R5LCAnQ2xhc3NCb2R5JykpIHtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IGJvZHkuYm9keTtcbiAgICAgIGxldCByZW5kZXJCb2R5ID0gbnVsbDtcbiAgICAgIGNvbnN0IGluc3RhbmNlZXMgPSBbXTtcbiAgICAgIGNvbnN0IHN0YXRpY3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgIGlmIChpcyhmaWVsZCwgJ0NsYXNzTWV0aG9kJykpIHtcbiAgICAgICAgICBjb25zdCBtZXRob2RJRCA9IGZpZWxkLmtleTtcbiAgICAgICAgICBjb25zdCBtZXRob2RCb2R5ID0gZmllbGQuYm9keTtcbiAgICAgICAgICBpZiAoaXMobWV0aG9kSUQsICdJZGVudGlmaWVyJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBtZXRob2RJRC5uYW1lO1xuICAgICAgICAgICAgaWYgKG1ldGhvZE5hbWUgPT09ICdyZW5kZXInKSB7XG4gICAgICAgICAgICAgIHJlbmRlckJvZHkgPSBtZXRob2RCb2R5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGZpZWxkLnN0YXRpYykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRpY01ldGhvZCA9IGFycm93RXhwcmVzc2lvbihmaWVsZC5wYXJhbXMsIGZpZWxkLmJvZHkpO1xuICAgICAgICAgICAgICAgIHN0YXRpY3MucHVzaChcbiAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQoYWNjZXNzKGNscy5pZCwgZmllbGQua2V5KSwgc3RhdGljTWV0aG9kKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGluc3RhbmNlZXMucHVzaChmaWVsZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpcyhmaWVsZCwgJ0NsYXNzUHJvcGVydHknKSkge1xuICAgICAgICAgIGlmIChmaWVsZC5zdGF0aWMpIHtcbiAgICAgICAgICAgIHN0YXRpY3MucHVzaChhc3NpZ25tZW50KGFjY2VzcyhjbHMuaWQsIGZpZWxkLmtleSksIGZpZWxkLnZhbHVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IGluc3RhbmNlZXMucHVzaChmaWVsZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpcyhyZW5kZXJCb2R5LCAnQmxvY2tTdGF0ZW1lbnQnKSkge1xuICAgICAgICBjb25zdCByZW5kZXIgPSBnZXRSZW5kZXIoY2xzLCByZW5kZXJCb2R5KTtcbiAgICAgICAgcmV0dXJuIFtbY2xzLCBbY29uc3REZWNsYXJhdGlvbihjbHMuaWQsIHJlbmRlciksIC4uLnN0YXRpY3NdXV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGdldFByb3BzVHlwZSA9IGNscyA9PiB7XG4gIGNvbnN0IHR5cGVzID0gY2xzLnN1cGVyVHlwZVBhcmFtZXRlcnM7XG4gIGlmIChpcyh0eXBlcywgJ1R5cGVQYXJhbWV0ZXJJbnN0YW50aWF0aW9uJykpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0eXBlcy5wYXJhbXM7XG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwcm9wc1R5cGUgPSBwYXJhbXNbMF07XG4gICAgICByZXR1cm4gcHJvcHNUeXBlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGdldFJlbmRlciA9IChjbHMsIHJlbmRlckJvZHkpID0+IHtcbiAgY29uc3QgcHJvcHNUeXBlID0gZ2V0UHJvcHNUeXBlKGNscyk7XG4gIGNvbnN0IHByb3BQYXJhbSA9IGlkZW50KCdwcm9wcycsIHByb3BzVHlwZSk7XG4gIGNvbnN0IHJlbmRlciA9IGFycm93RXhwcmVzc2lvbihbcHJvcFBhcmFtXSwgcmVuZGVyQm9keSk7XG4gIGNvbnN0IHNpbXBsZXJGbiA9IGFycm93V2l0aEV4cHJlc3Npb25Cb2R5KHJlbmRlcik7XG4gIGlmIChzaW1wbGVyRm4gIT0gbnVsbCkge1xuICAgIGNvbnN0IFtbXywgcmVuZGVyQm9keV1dID0gc2ltcGxlckZuO1xuICAgIHJldHVybiBhcnJvd0V4cHJlc3Npb24oW3Byb3BQYXJhbV0sIHJlbmRlckJvZHkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZW5kZXI7XG4gIH1cbn07XG5cbmNvbnN0IGFzc2lnbm1lbnQgPSAobGVmdCwgcmlnaHQpID0+ICh7XG4gIHR5cGU6ICdFeHByZXNzaW9uU3RhdGVtZW50JyxcbiAgZXhwcmVzc2lvbjoge1xuICAgIHR5cGU6ICdBc3NpZ25tZW50RXhwcmVzc2lvbicsXG4gICAgb3BlcmF0b3I6ICc9JyxcbiAgICBsZWZ0LFxuICAgIHJpZ2h0LFxuICB9LFxufSk7XG4iXX0=