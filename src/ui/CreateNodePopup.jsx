import { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  DEFAULT_NODE_TITLE,
  NODE_TYPE_ACTION,
  NODE_TYPE_BRANCH,
  NODE_TYPE_END,
} from "../utils/contants";
import styles from "./CreateNodePopup.module.css";
import { createUniId } from "../utils/helper";

function CreateNodePopup({ onClose, onCreateNode }) {
  const [nodeTitle, setNodeTitle] = useState(DEFAULT_NODE_TITLE);
  const [nodeType, setNodeType] = useState(NODE_TYPE_ACTION);
  const [conditions, setConditions] = useState([
    { id: createUniId(), value: "true" },
    { id: createUniId(), value: "false" },
  ]);

  const { refEl } = useClickOutside(onClose);

  function handleCreate() {
    // const conditionValues = conditions.map((item) => item.value);
    // onCreateNode({ nodeTitle, nodeType, conditions: conditionValues });
    onCreateNode({ nodeTitle, nodeType, conditions });
  }
  function handleUpdateConditionValue(value, id) {
    setConditions((conditions) =>
      conditions.map((item) => (item.id === id ? { ...item, value } : item))
    );
  }

  function handleAddCondition() {
    setConditions((cons) => [...cons, { id: createUniId(), value: "" }]);
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
                className={styles.inp}
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
            {nodeType === NODE_TYPE_BRANCH && (
              <div className={styles.conditionContainer}>
                <p>Branching Conditions</p>
                <div className={styles.constionsInps}>
                  {conditions.map(({ id, value }) => (
                    <input
                      key={`consdition-inp-${id}`}
                      value={value}
                      className={styles.inp}
                      onChange={(e) =>
                        handleUpdateConditionValue(e.target.value, id)
                      }
                    />
                  ))}
                </div>
                <button onClick={handleAddCondition}>+ Add Condition</button>
              </div>
            )}
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
