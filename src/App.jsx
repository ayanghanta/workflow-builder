import styles from "./App.module.css";
import { useNodeContext } from "./context/NodesContext";

import WorkflowNode from "./ui/WorkflowNode";
import { INITIAL_NODE_ID } from "./utils/contants";
function App() {
  const { nodes } = useNodeContext();
  console.log(nodes);
  function buildFlowTree(nodes, parentId) {
    return nodes.filter((node) => node.parentId === parentId);

    /*

    function returnChildren(parentID)=>nodes.filter(node=>node.parentId===parenrID)

    initialNode.children= 

    */
  }
  function handleSave() {
    const tree = nodes.map((parentNode) => {
      return {
        ...parentNode,
        childrens: nodes.filter((node) => node.parentId === parentNode.id),
      };
    });
    console.log(tree);
  }

  const initialNode = nodes.find((node) => node.id === INITIAL_NODE_ID);

  return (
    <div className={styles.appBackground}>
      <div className={styles.appHeader}>
        <p className={styles.appTitle}>Workflow Builder</p>
        <div>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <div className={styles.nodes}>
        {initialNode && <WorkflowNode node={initialNode} />}
      </div>
    </div>
  );
}

export default App;
