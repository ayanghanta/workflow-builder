import { useNodeContext } from "../context/NodesContext";
import { useCalculateConnectorPosition } from "../hooks/useCalculateConnectorPosition";
import { getConditionBoxId } from "../utils/helper";
import styles from "./ConditionBox.module.css";
import Connector from "./Connector";
import PathTag from "./PathTag";

function ConditionBox({ branchNode }) {
  const { id, conditions } = branchNode;
  const { nodes, handleAddRef } = useNodeContext();
  const { canvasHeight, position } = useCalculateConnectorPosition({
    sourceNodeId: id,
    targetNodeId: getConditionBoxId(id),
  });

  const allChildNodes = nodes.filter((node) => node.parentId === id);

  return (
    <>
      <Connector position={position} canvasHeight={canvasHeight} />
      <div className={styles.conditionContainer}>
        <div
          className={styles.conditionBox}
          ref={(el) => handleAddRef(el, getConditionBoxId(id))}
        >
          <p>Condition</p>
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
    </>
  );
}

export default ConditionBox;
