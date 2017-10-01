const List = (props: {||}) => (
  <div className="list">
    {props.items.map((item, i) => {
      return (
        <div className="item" key={i}>
          {item}
        </div>
      );
    })}
  </div>
);
