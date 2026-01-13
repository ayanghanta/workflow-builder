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
export function createConditionBox({ boxId, conditions = [], parentNodeId }) {
  return { id: boxId, conditions, parentNodeId };
}

export function createNodeId() {
  const randomInt = Math.floor(Math.random() * 100) + 1;
  const randomIn2 = Math.floor(Math.random() * 200) + 1;
  const tick = `${Date.now()}`.slice(-7);

  return `${tick}-${randomInt}-${randomIn2}`;
}
