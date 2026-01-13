import { createContext, useContext, useReducer, useRef } from "react";
import { INITIAL_NODE_ID, NODE_TYPE_ACTION } from "../utils/contants";
import { createWorkflowNode } from "../utils/helper";

const NodeContext = createContext();

const initialState = {
  nodes: [
    createWorkflowNode({
      title: "Master Node",
      type: NODE_TYPE_ACTION,
      id: INITIAL_NODE_ID,
      parentId: null,
    }),
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "addNewNode":
      return {
        ...state,
        nodes: [...state.nodes, createWorkflowNode(action.payload)],
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
            ? {
                ...node,
                parentId: action.payload.newParentId,
                nodeCondition: action.payload.nodeCondition,
              }
            : node;
        }),
      };
    default:
      return state;
  }
}

function NodeContextProvider({ children }) {
  const [{ nodes }, dispatch] = useReducer(reducer, initialState);

  const elementRefs = useRef([]);

  function handleAddRef(el, id) {
    if (!el || !id) return;
    if (elementRefs.current.map((elRef) => elRef.el).includes(el)) return;
    elementRefs.current.push({ el, id });
  }

  const clearElementRefs = () => (elementRefs.current = []);

  return (
    <NodeContext.Provider
      value={{ nodes, handleAddRef, elementRefs, dispatch, clearElementRefs }}
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
