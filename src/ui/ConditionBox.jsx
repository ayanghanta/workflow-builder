import { useNodeContext } from "../context/nodesContext";
import styles from "./ConditionBox.module.css";
import PathTag from "./PathTag";

function ConditionBox({ branchNode }) {
  const { id, conditions } = branchNode;
  // const conditions = ["login", "logOut"]; // FIXME:
  const { nodes } = useNodeContext();
  const allChildNodes = nodes.filter((node) => node.parentId === id);

  return (
    <div className={styles.conditionContainer}>
      <div className={styles.conditionBox}>
        <p>Condition Box</p>
      </div>
      <div className={styles.paths}>
        {conditions.map((condition) => (
          <PathTag
            key={`${condition}-${id}`}
            parentNodeId={id}
            condition={condition}
            childNodes={allChildNodes.filter(
              (node) => node.nodeCondition === condition
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ConditionBox;
