import { Controller } from '@hotwired/stimulus'
import { enter, leave } from 'el-transition'

export default class extends Controller {
  static targets = ["menu", "iconClosed", "iconOpened"]

  declare readonly menuTarget: HTMLDivElement
  declare readonly iconClosedTarget: HTMLElement
  declare readonly iconOpenedTarget: HTMLElement

  toggle() {
    if (this.menuTarget.classList.contains("hidden")) {
      enter(this.menuTarget);
      this.iconClosedTarget.classList.add("hidden");
      this.iconOpenedTarget.classList.remove("hidden");
    } else {
      this.iconClosedTarget.classList.remove("hidden");
      this.iconOpenedTarget.classList.add("hidden");
      leave(this.menuTarget)
    }
  }

  close() {
    this.iconClosedTarget.classList.remove("hidden");
    this.iconOpenedTarget.classList.add("hidden");
    leave(this.menuTarget)
  }
}
