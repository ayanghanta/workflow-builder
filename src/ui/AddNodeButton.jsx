import { useState } from "react";
import styles from "./AddNodeButton.module.css";
import CreateNodePopup from "./CreateNodePopup";

function AddNodeButton({ onCreateNode }) {
  const [displayPopup, setDisplayPopup] = useState(false);

  function handleClick() {
    setDisplayPopup(true);
  }

  return (
    <>
      <p className={styles.button} onClick={handleClick}>
        ➕
      </p>
      {displayPopup && (
        <CreateNodePopup
          onClose={() => setDisplayPopup(false)}
          onCreateNode={onCreateNode}
        />
      )}
    </>
  );
}

export default AddNodeButton;
