import { useState } from "react";
import {
  INITIAL_NODE_ID,
  NODE_TYPE_ACTION,
  NODE_TYPE_BRANCH,
  NODE_TYPE_END,
} from "../utils/contants";

import { useNodeContext } from "../context/NodesContext";
import { useCalculateConnectorPosition } from "../hooks/useCalculateConnectorPosition";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  createNodeId,
  getColorForNode,
  getConditionPathId,
} from "../utils/helper";
import AddNodeButton from "./AddNodeButton";
import ConditionBox from "./ConditionBox";
import Connector from "./Connector";
import styles from "./WorkflowNode.module.css";

function WorkflowNode({ node }) {
  const {
    title: nodeTitle,
    type: nodeType,
    id: nodeId,
    parentId,
    nodeCondition,
  } = node;

  const [isEditTitle, setIsEditTitle] = useState(false);
  const { refEl } = useClickOutside(() => setIsEditTitle(false));
  const { dispatch, nodes, handleAddRef, clearElementRefs } = useNodeContext();

  const { canvasHeight, position: connectorPosition } =
    useCalculateConnectorPosition({
      targetNodeId: nodeId,
      sourceNodeId: nodeCondition
        ? getConditionPathId(parentId, nodeCondition)
        : parentId,
    });

  const allChildNodes = nodes.filter((node) => node.parentId === nodeId);
  const isEndNode = nodeType === NODE_TYPE_END;
  const isBranchNode = nodeType === NODE_TYPE_BRANCH;

  function handleCreateNode({ nodeTitle, nodeType, conditions = [] }) {
    if (
      (nodeType === NODE_TYPE_ACTION && allChildNodes.length > 0) ||
      isEndNode
    )
      return;

    const currentNodeId = createNodeId();

    const payload = {
      title: nodeTitle,
      type: nodeType,
      parentId: nodeId,
      id: currentNodeId,
    };

    if (nodeType === NODE_TYPE_BRANCH) payload.conditions = conditions;

    dispatch({
      type: "addNewNode",
      payload,
    });
  }

  function handleUpdateTitle(newTitle) {
    dispatch({ type: "updateNodeTitle", payload: { id: nodeId, newTitle } });
  }

  function handleDeleteNode() {
    if (nodeId === INITIAL_NODE_ID) return;
    const childNodeIds = nodes
      .filter((node) => node.parentId === nodeId)
      .map((node) => node.id);

    // if there us any child node of that node then reconnect the nodes
    clearElementRefs();
    if (childNodeIds.length !== 0)
      dispatch({
        type: "reConnectNodes",
        payload: { ids: childNodeIds, newParentId: parentId },
      });

    // delete the noda
    dispatch({ type: "deleteNode", payload: nodeId });
  }

  return (
    <>
      <Connector canvasHeight={canvasHeight} position={connectorPosition} />
      <div
        className={styles.nodeContainer}
        ref={(el) => handleAddRef(el, nodeId)}
        style={{
          backgroundColor: getColorForNode(nodeType),
        }}
      >
        <div className={styles.node}>
          {isEditTitle ? (
            <input
              type="text"
              value={nodeTitle}
              className={styles.nodeTitleInput}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              ref={refEl}
            />
          ) : (
            <p
              className={styles.nodeTitle}
              onDoubleClick={() => setIsEditTitle(true)}
            >
              {nodeTitle}
            </p>
          )}
          <p className={styles.nodeType}>
            <span>Type: </span>
            <span>{nodeType}</span>
          </p>
        </div>

        {nodeId !== INITIAL_NODE_ID && (
          <button className={styles.delButton} onClick={handleDeleteNode}>
            Delete
          </button>
        )}
        {allChildNodes.length === 0 && !isEndNode && (
          <AddNodeButton onCreateNode={handleCreateNode} />
        )}
      </div>

      {/* DISPLAY ALL THE CHILD NODE */}

      {isBranchNode ? (
        <ConditionBox branchNode={node} />
      ) : (
        allChildNodes.map((childNode) => (
          <WorkflowNode key={childNode.id} node={childNode} />
        ))
      )}
    </>
  );
}

export default WorkflowNode;
