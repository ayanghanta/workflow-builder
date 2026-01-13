import { useNodeContext } from "../context/NodesContext";
import { useCalculateConnectorPosition } from "../hooks/useCalculateConnectorPosition";
import { NODE_TYPE_BRANCH } from "../utils/contants";
import {
  createNodeId,
  getConditionBoxId,
  getConditionPathId,
} from "../utils/helper";
import AddNodeButton from "./AddNodeButton";
import Connector from "./Connector";
import styles from "./PathTag.module.css";
import WorkflowNode from "./WorkflowNode";

function PathTag({ parentNodeId, condition, childNodes = [] }) {
  const { dispatch, handleAddRef } = useNodeContext();
  const { canvasHeight, position } = useCalculateConnectorPosition({
    sourceNodeId: getConditionBoxId(parentNodeId),
    targetNodeId: getConditionPathId(parentNodeId, condition),
  });

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
    <>
      <Connector canvasHeight={canvasHeight} position={position} />
      <div className={styles.pathTagContainer}>
        <div
          className={styles.pathTag}
          ref={(el) =>
            handleAddRef(el, getConditionPathId(parentNodeId, condition))
          }
        >
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
    </>
  );
}

export default PathTag;
