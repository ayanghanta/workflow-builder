import { createContext, useContext, useReducer, useRef } from "react";
import { INITIAL_NODE_ID, NODE_TYPE_ACTION } from "../utils/contants";
import { createConditionBox, createWorkflowNode } from "../utils/hepler";

const NodeContext = createContext();

const initialState = {
  nodes: [
    createWorkflowNode({
      title: "Master Node",
      type: NODE_TYPE_ACTION,
      id: INITIAL_NODE_ID,
    }),
  ],
  conditionBoxes: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addNewNode":
      return {
        ...state,
        nodes: [...state.nodes, createWorkflowNode(action.payload)],
      };
    case "createConditionBox":
      return {
        ...state,
        conditionBoxes: [
          ...state.conditionBoxes,
          createConditionBox(action.payload),
        ],
      };

    case "updateNodeTitle":
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          return node.id !== action.payload.id
            ? node
            : { ...node, title: action.payload.newTitle };
        }),
      };
    case "deleteNode":
      return {
        ...state,
        nodes: state.nodes.filter((node) => node.id !== action.payload),
      };
    case "reConnectNodes":
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          return action.payload.ids.includes(node.id)
            ? { ...node, parentId: action.payload.newParentId }
            : node;
        }),
      };
    default:
      return state;
  }
}

function NodeContextProvider({ children }) {
  const [{ nodes, conditionBoxes }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const nodeRefs = useRef([]);

  function handleAddRef(el, nodeId) {
    if (!el || !nodeId) return;
    if (nodeRefs.current.map((nodeRef) => nodeRef.el).includes(el)) return;
    nodeRefs.current.push({ el, nodeId });
  }

  return (
    <NodeContext.Provider
      value={{ nodes, handleAddRef, nodeRefs, dispatch, conditionBoxes }}
    >
      {children}
    </NodeContext.Provider>
  );
}

function useNodeContext() {
  const context = useContext(NodeContext);
  if (context === undefined)
    throw new Error("You can not use NodeContext out side NodeContextProvider");
  return context;
}

export { NodeContextProvider, useNodeContext };
