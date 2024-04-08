import { Controller } from '@hotwired/stimulus'
import { enter, leave } from 'el-transition'
import { useHotkeys } from 'stimulus-use/hotkeys';

export default class extends Controller {
    static targets = ["palette", "commandOverlay", "commandPalette",
        "commandSearch", "commandPaletteResults", "commandPaletteTeams",
        "commandPaletteProjects", "commandPaletteDates", "help", "noResults"]

    declare readonly paletteTarget: HTMLDivElement
    declare readonly commandOverlayTarget: HTMLDivElement
    declare readonly commandPaletteTarget: HTMLDivElement
    declare readonly commandPaletteResultsTarget: HTMLDivElement
    declare readonly commandPaletteTeamsTarget: HTMLDivElement
    declare readonly commandPaletteProjectsTarget: HTMLDivElement
    declare readonly commandPaletteDatesTarget: HTMLDivElement
    declare readonly commandSearchTarget: HTMLInputElement
    declare readonly helpTarget: HTMLDivElement

    connect() {
        useHotkeys(this, {
            "k": [this.displayPalette]
        })
    }

    displayPalette(e: Event) {
        e.preventDefault();
        if (this.paletteTarget.classList.contains("hidden")) {
            enter(this.paletteTarget);
            enter(this.commandOverlayTarget);
            enter(this.commandPaletteTarget);
            this.commandSearchTarget.focus();
        }
    }

    hidePalette() {
        leave(this.commandOverlayTarget);
        leave(this.commandPaletteTarget);
        leave(this.paletteTarget);
    }

    commandSearchKeyup(e: KeyboardEvent) {
        if (e.code == '27') {
            e.preventDefault();
            this.hidePalette();
        } else if (this.commandSearchTarget.value.startsWith("#")) {
            this.commandPaletteResultsTarget.classList.remove("hidden");
            this.commandPaletteTeamsTarget.classList.remove("hidden");
            this.commandPaletteProjectsTarget.classList.add("hidden");
            this.commandPaletteDatesTarget.classList.add("hidden");
            this.helpTarget.classList.add("hidden");
        } else if (this.commandSearchTarget.value.startsWith(">")) {
            this.commandPaletteResultsTarget.classList.remove("hidden");
            this.commandPaletteProjectsTarget.classList.remove("hidden");
            this.commandPaletteTeamsTarget.classList.add("hidden");
            this.commandPaletteDatesTarget.classList.add("hidden");
            this.helpTarget.classList.add("hidden");
        } else if (this.commandSearchTarget.value.startsWith("@")) {
            this.commandPaletteResultsTarget.classList.remove("hidden");
            this.commandPaletteDatesTarget.classList.remove("hidden");
            this.commandPaletteTeamsTarget.classList.add("hidden");
            this.commandPaletteProjectsTarget.classList.add("hidden");
            this.helpTarget.classList.add("hidden");
        } else if (this.commandSearchTarget.value.startsWith("?")) {
            this.helpTarget.classList.remove("hidden");
            this.commandPaletteResultsTarget.classList.add("hidden");
            this.commandPaletteDatesTarget.classList.add("hidden");
            this.commandPaletteTeamsTarget.classList.add("hidden");
            this.commandPaletteProjectsTarget.classList.add("hidden");
        } else {
            this.commandPaletteResultsTarget.classList.add("hidden");
            this.commandPaletteTeamsTarget.classList.add("hidden");
            this.commandPaletteProjectsTarget.classList.add("hidden");
            this.commandPaletteDatesTarget.classList.add("hidden");
            this.helpTarget.classList.add("hidden");
        }
    }
}
