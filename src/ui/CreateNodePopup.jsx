import { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  DEFAULT_NODE_TITLE,
  NODE_TYPE_ACTION,
  NODE_TYPE_BRANCH,
  NODE_TYPE_END,
} from "../utils/contants";
import styles from "./CreateNodePopup.module.css";

function CreateNodePopup({ onClose, onCreateNode }) {
  const [nodeTitle, setNodeTitle] = useState(DEFAULT_NODE_TITLE);
  const [nodeType, setNodeType] = useState(NODE_TYPE_BRANCH);

  const NODE_BRANCHES = ["Authenticaed", "Not Authenticated"];

  const { refEl } = useClickOutside(onClose);

  function handleCreate() {
    onCreateNode({ nodeTitle, nodeType, conditions: NODE_BRANCHES });
  }

  return (
    <>
      {/* <div className={styles.overLay}></div> */}
      <div className={styles.popupContainer}>
        <div className={styles.popup} ref={refEl}>
          <button className={styles.close} onClick={onClose}>
            X
          </button>
          <p className={styles.popupTitle}>Crate New Node</p>
          <div className={styles.nodeData}>
            <div className={styles.inpField}>
              <label htmlFor="node-title">Node title/label</label>
              <input
                type="text"
                id="node-title"
                value={nodeTitle}
                onChange={(e) => setNodeTitle(e.target.value)}
              />
            </div>
            <div className={styles.inpField}>
              <label htmlFor="node--type">Node Type</label>
              <select
                id="node--type"
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value)}
              >
                <option value={NODE_TYPE_ACTION}>Action</option>
                <option value={NODE_TYPE_BRANCH}>Branch</option>
                <option value={NODE_TYPE_END}>End</option>
              </select>
            </div>
            <button className={styles.createNodeButton} onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNodePopup;
