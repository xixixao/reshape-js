'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ident = exports.ident = function ident(name) {
  var typeAnnotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: 'Identifier',
    name: name,
    typeAnnotation: typeAnnotation != null ? { type: 'TypeAnnotation', typeAnnotation: typeAnnotation } : undefined
  };
};

var block = exports.block = function block(body) {
  return {
    type: 'BlockStatement',
    body: body
  };
};

var retrn = exports.retrn = function retrn(argument) {
  return {
    type: 'ReturnStatement',
    argument: argument
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZC9jb3JlLmpzIl0sIm5hbWVzIjpbImlkZW50IiwibmFtZSIsInR5cGVBbm5vdGF0aW9uIiwidHlwZSIsInVuZGVmaW5lZCIsImJsb2NrIiwiYm9keSIsInJldHJuIiwiYXJndW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRU8sSUFBTUEsd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxJQUFEO0FBQUEsTUFBZUMsY0FBZix1RUFBdUMsSUFBdkM7QUFBQSxTQUF1RDtBQUMxRUMsVUFBTSxZQURvRTtBQUUxRUYsY0FGMEU7QUFHMUVDLG9CQUNFQSxrQkFBa0IsSUFBbEIsR0FDSSxFQUFDQyxNQUFNLGdCQUFQLEVBQXlCRCw4QkFBekIsRUFESixHQUVJRTtBQU5vRSxHQUF2RDtBQUFBLENBQWQ7O0FBU0EsSUFBTUMsd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxJQUFEO0FBQUEsU0FBd0I7QUFDM0NILFVBQU0sZ0JBRHFDO0FBRTNDRztBQUYyQyxHQUF4QjtBQUFBLENBQWQ7O0FBS0EsSUFBTUMsd0JBQVEsU0FBUkEsS0FBUSxDQUFDQyxRQUFEO0FBQUEsU0FBMkI7QUFDOUNMLFVBQU0saUJBRHdDO0FBRTlDSztBQUY4QyxHQUEzQjtBQUFBLENBQWQiLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmV4cG9ydCBjb25zdCBpZGVudCA9IChuYW1lOiBzdHJpbmcsIHR5cGVBbm5vdGF0aW9uPzogTm9kZSA9IG51bGwpOiBOb2RlID0+ICh7XG4gIHR5cGU6ICdJZGVudGlmaWVyJyxcbiAgbmFtZSxcbiAgdHlwZUFubm90YXRpb246XG4gICAgdHlwZUFubm90YXRpb24gIT0gbnVsbFxuICAgICAgPyB7dHlwZTogJ1R5cGVBbm5vdGF0aW9uJywgdHlwZUFubm90YXRpb259XG4gICAgICA6IHVuZGVmaW5lZCxcbn0pO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSAoYm9keTogTm9kZXMpOiBOb2RlID0+ICh7XG4gIHR5cGU6ICdCbG9ja1N0YXRlbWVudCcsXG4gIGJvZHksXG59KTtcblxuZXhwb3J0IGNvbnN0IHJldHJuID0gKGFyZ3VtZW50OiBOb2RlKTogTm9kZSA9PiAoe1xuICB0eXBlOiAnUmV0dXJuU3RhdGVtZW50JyxcbiAgYXJndW1lbnQsXG59KTtcbiJdfQ==