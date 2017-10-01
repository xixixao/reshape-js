class App extends React.Component<{||}, void> {
  render() {
    const messaCURSORge = "Hello world";
    return <div>{message}</div>;
  }
}

----

const App = (props: {||}) => {
  const message = "Hello world";
  return <div>{message}</div>;
};
