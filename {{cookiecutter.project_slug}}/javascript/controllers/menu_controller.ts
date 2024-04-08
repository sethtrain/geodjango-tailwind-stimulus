import { Controller } from '@hotwired/stimulus'
import { enter, leave } from 'el-transition'
import { useClickOutside } from 'stimulus-use'

export default class extends Controller {
    static targets = ["menu"]

    declare readonly menuTarget: HTMLDivElement

    connect() {
        useClickOutside(this, { element: this.menuTarget })
    }

    clickOutside(e: Event) {
        e.preventDefault()
        this.hide()
    }

    toggle() {
        if (this.menuTarget.classList.contains("hidden")) {
            enter(this.menuTarget);
        } else {
            leave(this.menuTarget);
        }
    }

    hide() {
        leave(this.menuTarget);
    }
}
