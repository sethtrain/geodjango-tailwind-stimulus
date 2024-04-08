import { Application } from '@hotwired/stimulus'
import { definitions } from 'stimulus:./controllers'
import * as Turbo from '@hotwired/turbo'

import "./application.css"

const app = Application.start()
app.load(definitions)

Turbo.start()
