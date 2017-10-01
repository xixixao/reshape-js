const App = (props: {||}) => {
  const message = "HelCURSORlo world";
  return <div>{message}</div>;
};

----

class App extends React.Component<{||}, void> {
  render() {
    const message = "Hello world";
    return <div>{message}</div>;
  }

}
