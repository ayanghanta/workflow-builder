import React, { useState } from "react";
import { useNodeContext } from "../context/nodesContext";
import {
  INITIAL_NODE_ID,
  NODE_TYPE_BRANCH,
  NODE_TYPE_END,
} from "../utils/contants";

import { useClickOutside } from "../hooks/useClickOutside";
import AddNodeButton from "./AddNodeButton";
import styles from "./WorkflowNode.module.css";
import ConditionBox from "./ConditionBox";
import { createNodeId } from "../utils/hepler";

function WorkflowNode({ node }) {
  const { title: nodeTitle, type: nodeType, id: nodeId, parentId } = node;

  const [isEditTitle, setIsEditTitle] = useState(false);
  const { refEl } = useClickOutside(() => setIsEditTitle(false));
  const { dispatch, nodes } = useNodeContext();

  function handleCreateNode({ nodeTitle, nodeType, conditions = [] }) {
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
    if (childNodeIds.length !== 0)
      dispatch({
        type: "reConnectNodes",
        payload: { ids: childNodeIds, newParentId: parentId },
      });

    // delete the noda
    dispatch({ type: "deleteNode", payload: nodeId });
  }

  const allChildNodes = nodes.filter((node) => node.parentId === nodeId);
  const isEndNode = nodeType === NODE_TYPE_END;
  const isBranchNode = nodeType === NODE_TYPE_BRANCH;

  return (
    <>
      <div className={styles.nodeContainer}>
        <div className={styles.node}>
          <p>{nodeId}</p>
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
            <span>Type</span>
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
