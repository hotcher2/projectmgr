import { Draggable } from "../models/drag-drop";
import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
import { Project } from "../models/project";

// ProjectListItem class
export class ProjectListItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }
  constructor(type: "active" | "finished", private project: Project) {
    super(
      "single-project",
      `${type}-projects-list`,
      false,
      Math.random().toString()
    );
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {
    console.log("drag end event");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.textContent = `${this.project.title} - ${this.project.description} - ${this.persons} assigned`;
  }
}
