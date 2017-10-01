type Node = any;
type Nodes = Array<Node>;
type Index = number;
type Reshape = Node => ?Array<[Node, Node | Nodes]>;
