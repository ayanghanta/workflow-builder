import { useNodeContext } from "../context/nodesContext";
import { NODE_TYPE_BRANCH } from "../utils/contants";
import { createNodeId } from "../utils/hepler";
import AddNodeButton from "./AddNodeButton";
import styles from "./PathTag.module.css";
import WorkflowNode from "./WorkflowNode";

function PathTag({ parentNodeId, condition, childNodes = [] }) {
  const { dispatch } = useNodeContext();

  function handleCreateNode({ nodeTitle, nodeType, conditions = [] }) {
    const currentNodeId = createNodeId();

    const payload = {
      title: nodeTitle,
      type: nodeType,
      parentId: parentNodeId,
      id: currentNodeId,
      nodeCondition: condition,
    };

    if (nodeType === NODE_TYPE_BRANCH) payload.conditions = conditions;

    dispatch({
      type: "addNewNode",
      payload,
    });
  }
  return (
    <div className={styles.pathTagContainer}>
      <p>{parentNodeId}</p>
      <div className={styles.pathTag}>
        <p>{condition}</p>
        {childNodes.length === 0 && (
          <AddNodeButton onCreateNode={handleCreateNode} />
        )}
      </div>
      <div className={styles.nodes}>
        {childNodes.map((node) => (
          <WorkflowNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}

export default PathTag;
