'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.reshape = reshape;

var _is = require('../parse/is');

var _objects = require('../build/objects');

var _core = require('../build/core');

var _arrows = require('../build/arrows');

function reshape(decl) {
  var found = getFn(decl);
  if (found === null) {
    return null;
  }

  var _found = _slicedToArray(found, 3),
      id = _found[0],
      params = _found[1],
      body = _found[2];

  return [[decl, component(id, body, getPropsType(params))]];
}

var getFn = function getFn(decl) {
  if ((0, _is.is)(decl, 'VariableDeclaration')) {
    var decls = decl.declarations;
    if (decls.length === 1) {
      var declarator = decls[0];
      if ((0, _is.is)(declarator, 'VariableDeclarator')) {
        var id = declarator.id;
        var fn = declarator.init;
        if ((0, _is.is)(fn, 'ArrowFunctionExpression') || (0, _is.is)(fn, 'FunctionExpression')) {
          var body = fn.body;
          if ((0, _is.is)(body, 'BlockStatement')) {
            return [id, fn.params, fn.body];
          } else {
            return [id, fn.params, (0, _core.block)([(0, _core.retrn)(fn.body)])];
          }
        }
      }
    }
  }
  if ((0, _is.is)(decl, 'FunctionDeclaration')) {
    var _id = decl.id;
    return [_id, decl.params, decl.body];
  }
  return null;
};

var getPropsType = function getPropsType(params) {
  if (params.length === 1) {
    var props = params[0];
    if ((0, _is.is)(props, 'Identifier')) {
      var type = props.typeAnnotation;
      if ((0, _is.is)(type, 'TypeAnnotation')) {
        return type.typeAnnotation;
      }
    }
  }
  return null;
};

var component = function component(id, body, propsType) {
  return {
    type: 'ClassDeclaration',
    id: id,
    superClass: (0, _objects.access)((0, _core.ident)('React'), (0, _core.ident)('Component')),
    superTypeParameters: {
      type: 'TypeParameterInstantiation',
      params: [propsType || hamburger(), { type: 'VoidTypeAnnotation' }]
    },
    body: {
      type: 'ClassBody',
      body: [{
        type: 'ClassMethod',
        kind: 'method',
        key: (0, _core.ident)('render'),
        params: [],
        body: body
      }]
    }
  };
};

var hamburger = function hamburger() {
  return {
    type: 'ObjectTypeAnnotation',
    exact: true,
    properties: []
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9jbGFzcy1jb21wb25lbnQuanMiXSwibmFtZXMiOlsicmVzaGFwZSIsImRlY2wiLCJmb3VuZCIsImdldEZuIiwiaWQiLCJwYXJhbXMiLCJib2R5IiwiY29tcG9uZW50IiwiZ2V0UHJvcHNUeXBlIiwiZGVjbHMiLCJkZWNsYXJhdGlvbnMiLCJsZW5ndGgiLCJkZWNsYXJhdG9yIiwiZm4iLCJpbml0IiwicHJvcHMiLCJ0eXBlIiwidHlwZUFubm90YXRpb24iLCJwcm9wc1R5cGUiLCJzdXBlckNsYXNzIiwic3VwZXJUeXBlUGFyYW1ldGVycyIsImhhbWJ1cmdlciIsImtpbmQiLCJrZXkiLCJleGFjdCIsInByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBT2dCQSxPLEdBQUFBLE87O0FBTGhCOztBQUNBOztBQUNBOztBQUNBOztBQUVPLFNBQVNBLE9BQVQsQ0FBaUJDLElBQWpCLEVBQTJEO0FBQ2hFLE1BQU1DLFFBQVFDLE1BQU1GLElBQU4sQ0FBZDtBQUNBLE1BQUlDLFVBQVUsSUFBZCxFQUFvQjtBQUNsQixXQUFPLElBQVA7QUFDRDs7QUFKK0QsOEJBS3JDQSxLQUxxQztBQUFBLE1BS3pERSxFQUx5RDtBQUFBLE1BS3JEQyxNQUxxRDtBQUFBLE1BSzdDQyxJQUw2Qzs7QUFNaEUsU0FBTyxDQUFDLENBQUNMLElBQUQsRUFBT00sVUFBVUgsRUFBVixFQUFjRSxJQUFkLEVBQW9CRSxhQUFhSCxNQUFiLENBQXBCLENBQVAsQ0FBRCxDQUFQO0FBQ0Q7O0FBRUQsSUFBTUYsUUFBUSxTQUFSQSxLQUFRLE9BQVE7QUFDcEIsTUFBSSxZQUFHRixJQUFILEVBQVMscUJBQVQsQ0FBSixFQUFxQztBQUNuQyxRQUFNUSxRQUFRUixLQUFLUyxZQUFuQjtBQUNBLFFBQUlELE1BQU1FLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsVUFBTUMsYUFBYUgsTUFBTSxDQUFOLENBQW5CO0FBQ0EsVUFBSSxZQUFHRyxVQUFILEVBQWUsb0JBQWYsQ0FBSixFQUEwQztBQUN4QyxZQUFNUixLQUFLUSxXQUFXUixFQUF0QjtBQUNBLFlBQU1TLEtBQUtELFdBQVdFLElBQXRCO0FBQ0EsWUFBSSxZQUFHRCxFQUFILEVBQU8seUJBQVAsS0FBcUMsWUFBR0EsRUFBSCxFQUFPLG9CQUFQLENBQXpDLEVBQXVFO0FBQ3JFLGNBQU1QLE9BQU9PLEdBQUdQLElBQWhCO0FBQ0EsY0FBSSxZQUFHQSxJQUFILEVBQVMsZ0JBQVQsQ0FBSixFQUFnQztBQUM5QixtQkFBTyxDQUFDRixFQUFELEVBQUtTLEdBQUdSLE1BQVIsRUFBZ0JRLEdBQUdQLElBQW5CLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBTyxDQUFDRixFQUFELEVBQUtTLEdBQUdSLE1BQVIsRUFBZ0IsaUJBQU0sQ0FBQyxpQkFBTVEsR0FBR1AsSUFBVCxDQUFELENBQU4sQ0FBaEIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRCxNQUFJLFlBQUdMLElBQUgsRUFBUyxxQkFBVCxDQUFKLEVBQXFDO0FBQ25DLFFBQU1HLE1BQUtILEtBQUtHLEVBQWhCO0FBQ0EsV0FBTyxDQUFDQSxHQUFELEVBQUtILEtBQUtJLE1BQVYsRUFBa0JKLEtBQUtLLElBQXZCLENBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNELENBeEJEOztBQTBCQSxJQUFNRSxlQUFlLFNBQWZBLFlBQWUsU0FBVTtBQUM3QixNQUFJSCxPQUFPTSxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLFFBQU1JLFFBQVFWLE9BQU8sQ0FBUCxDQUFkO0FBQ0EsUUFBSSxZQUFHVSxLQUFILEVBQVUsWUFBVixDQUFKLEVBQTZCO0FBQzNCLFVBQU1DLE9BQU9ELE1BQU1FLGNBQW5CO0FBQ0EsVUFBSSxZQUFHRCxJQUFILEVBQVMsZ0JBQVQsQ0FBSixFQUFnQztBQUM5QixlQUFPQSxLQUFLQyxjQUFaO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FYRDs7QUFhQSxJQUFNVixZQUFZLFNBQVpBLFNBQVksQ0FBQ0gsRUFBRCxFQUFLRSxJQUFMLEVBQVdZLFNBQVg7QUFBQSxTQUEwQjtBQUMxQ0YsVUFBTSxrQkFEb0M7QUFFMUNaLFVBRjBDO0FBRzFDZSxnQkFBWSxxQkFBTyxpQkFBTSxPQUFOLENBQVAsRUFBdUIsaUJBQU0sV0FBTixDQUF2QixDQUg4QjtBQUkxQ0MseUJBQXFCO0FBQ25CSixZQUFNLDRCQURhO0FBRW5CWCxjQUFRLENBQUNhLGFBQWFHLFdBQWQsRUFBMkIsRUFBQ0wsTUFBTSxvQkFBUCxFQUEzQjtBQUZXLEtBSnFCO0FBUTFDVixVQUFNO0FBQ0pVLFlBQU0sV0FERjtBQUVKVixZQUFNLENBQ0o7QUFDRVUsY0FBTSxhQURSO0FBRUVNLGNBQU0sUUFGUjtBQUdFQyxhQUFLLGlCQUFNLFFBQU4sQ0FIUDtBQUlFbEIsZ0JBQVEsRUFKVjtBQUtFQztBQUxGLE9BREk7QUFGRjtBQVJvQyxHQUExQjtBQUFBLENBQWxCOztBQXNCQSxJQUFNZSxZQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUFPO0FBQ3ZCTCxVQUFNLHNCQURpQjtBQUV2QlEsV0FBTyxJQUZnQjtBQUd2QkMsZ0JBQVk7QUFIVyxHQUFQO0FBQUEsQ0FBbEIiLCJmaWxlIjoiY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IHtpc30gZnJvbSAnLi4vcGFyc2UvaXMnO1xuaW1wb3J0IHthY2Nlc3N9IGZyb20gJy4uL2J1aWxkL29iamVjdHMnO1xuaW1wb3J0IHtibG9jaywgaWRlbnQsIHJldHJufSBmcm9tICcuLi9idWlsZC9jb3JlJztcbmltcG9ydCB7YXJyb3dEZWNsYXJhdGlvbiwgYXJyb3dFeHByZXNzaW9ufSBmcm9tICcuLi9idWlsZC9hcnJvd3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzaGFwZShkZWNsOiBOb2RlKTogP0FycmF5PFtOb2RlLCBOb2RlIHwgTm9kZXNdPiB7XG4gIGNvbnN0IGZvdW5kID0gZ2V0Rm4oZGVjbCk7XG4gIGlmIChmb3VuZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IFtpZCwgcGFyYW1zLCBib2R5XSA9IGZvdW5kO1xuICByZXR1cm4gW1tkZWNsLCBjb21wb25lbnQoaWQsIGJvZHksIGdldFByb3BzVHlwZShwYXJhbXMpKV1dO1xufVxuXG5jb25zdCBnZXRGbiA9IGRlY2wgPT4ge1xuICBpZiAoaXMoZGVjbCwgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSkge1xuICAgIGNvbnN0IGRlY2xzID0gZGVjbC5kZWNsYXJhdGlvbnM7XG4gICAgaWYgKGRlY2xzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZGVjbGFyYXRvciA9IGRlY2xzWzBdO1xuICAgICAgaWYgKGlzKGRlY2xhcmF0b3IsICdWYXJpYWJsZURlY2xhcmF0b3InKSkge1xuICAgICAgICBjb25zdCBpZCA9IGRlY2xhcmF0b3IuaWQ7XG4gICAgICAgIGNvbnN0IGZuID0gZGVjbGFyYXRvci5pbml0O1xuICAgICAgICBpZiAoaXMoZm4sICdBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbicpIHx8IGlzKGZuLCAnRnVuY3Rpb25FeHByZXNzaW9uJykpIHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gZm4uYm9keTtcbiAgICAgICAgICBpZiAoaXMoYm9keSwgJ0Jsb2NrU3RhdGVtZW50JykpIHtcbiAgICAgICAgICAgIHJldHVybiBbaWQsIGZuLnBhcmFtcywgZm4uYm9keV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbaWQsIGZuLnBhcmFtcywgYmxvY2soW3JldHJuKGZuLmJvZHkpXSldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoaXMoZGVjbCwgJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKSkge1xuICAgIGNvbnN0IGlkID0gZGVjbC5pZDtcbiAgICByZXR1cm4gW2lkLCBkZWNsLnBhcmFtcywgZGVjbC5ib2R5XTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IGdldFByb3BzVHlwZSA9IHBhcmFtcyA9PiB7XG4gIGlmIChwYXJhbXMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgcHJvcHMgPSBwYXJhbXNbMF07XG4gICAgaWYgKGlzKHByb3BzLCAnSWRlbnRpZmllcicpKSB7XG4gICAgICBjb25zdCB0eXBlID0gcHJvcHMudHlwZUFubm90YXRpb247XG4gICAgICBpZiAoaXModHlwZSwgJ1R5cGVBbm5vdGF0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUudHlwZUFubm90YXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgY29tcG9uZW50ID0gKGlkLCBib2R5LCBwcm9wc1R5cGUpID0+ICh7XG4gIHR5cGU6ICdDbGFzc0RlY2xhcmF0aW9uJyxcbiAgaWQsXG4gIHN1cGVyQ2xhc3M6IGFjY2VzcyhpZGVudCgnUmVhY3QnKSwgaWRlbnQoJ0NvbXBvbmVudCcpKSxcbiAgc3VwZXJUeXBlUGFyYW1ldGVyczoge1xuICAgIHR5cGU6ICdUeXBlUGFyYW1ldGVySW5zdGFudGlhdGlvbicsXG4gICAgcGFyYW1zOiBbcHJvcHNUeXBlIHx8IGhhbWJ1cmdlcigpLCB7dHlwZTogJ1ZvaWRUeXBlQW5ub3RhdGlvbid9XSxcbiAgfSxcbiAgYm9keToge1xuICAgIHR5cGU6ICdDbGFzc0JvZHknLFxuICAgIGJvZHk6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ0NsYXNzTWV0aG9kJyxcbiAgICAgICAga2luZDogJ21ldGhvZCcsXG4gICAgICAgIGtleTogaWRlbnQoJ3JlbmRlcicpLFxuICAgICAgICBwYXJhbXM6IFtdLFxuICAgICAgICBib2R5LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxufSk7XG5cbmNvbnN0IGhhbWJ1cmdlciA9ICgpID0+ICh7XG4gIHR5cGU6ICdPYmplY3RUeXBlQW5ub3RhdGlvbicsXG4gIGV4YWN0OiB0cnVlLFxuICBwcm9wZXJ0aWVzOiBbXSxcbn0pO1xuIl19