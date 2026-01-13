import styles from "./App.module.css";
import { useNodeContext } from "./context/nodesContext";

import WorkflowNode from "./ui/WorkflowNode";
import { INITIAL_NODE_ID } from "./utils/contants";
function App() {
  const { nodes } = useNodeContext();
  console.log(nodes);

  const initialNode = nodes.find((node) => node.id === INITIAL_NODE_ID);

  return (
    <div className={styles.appBackground}>
      <div className={styles.nodes}>
        {initialNode && <WorkflowNode node={initialNode} />}
      </div>
    </div>
  );
}

export default App;
