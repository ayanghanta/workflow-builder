import { NODE_TYPE_ACTION, NODE_TYPE_BRANCH, NODE_TYPE_END } from "./contants";

export function createWorkflowNode({
  title,
  type,
  id,
  parentId,
  conditions = [],
  nodeCondition,
}) {
  return { title, type, id, parentId, conditions, nodeCondition };
}

export function createUniId() {
  const randomInt = Math.floor(Math.random() * 100) + 1;
  const randomIn2 = Math.floor(Math.random() * 200) + 1;
  const tick = `${Date.now()}`.slice(-7);

  return `${tick}-${randomInt}-${randomIn2}`;
}

export const getConditionBoxId = (parentId) => `${parentId}-conditionBox`;

export function getColorForNode(nodeType) {
  const colors = {};
  colors[NODE_TYPE_ACTION] = "#3b82f6";
  colors[NODE_TYPE_BRANCH] = "#786fce";
  colors[NODE_TYPE_END] = "#2d6f29";

  return colors[nodeType];
}
