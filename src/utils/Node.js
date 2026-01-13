export default class WorkflowNode {
  constructor(title, type, id, parentId) {
    this.title = title;
    this.type = type;
    this.id = id;
    this.parentId = parentId;
  }
  updateTitle(newTitle) {
    this.title = newTitle;
    return this;
  }
}
