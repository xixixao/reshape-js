class App extends React.Component<{|width?: number|}, void> {
  static defaultProps = {
    width: 42,
  };

  static info(x) {
    return x + 1;
  }

  render() {
    return <div>HelloCURSOR world</div>;
  }
}

----

const App = (props: {|
  width?: number
|}) => <div>Hello world</div>;

App.defaultProps = {
  width: 42
};

App.info = x => {
  return x + 1;
};
