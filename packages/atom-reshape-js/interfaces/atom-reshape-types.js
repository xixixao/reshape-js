type Node = any;
type NewNode = any;
type ResultNode = Node | NewNode;
type Index = number;
type Reshape = Node => ?Array<[Node, ResultNode]>;
