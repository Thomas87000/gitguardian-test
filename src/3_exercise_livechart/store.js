import { createStore } from 'redux'

import { createRandomEvent } from './utils'

const initialEvents = Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

export const store = createStore(
  (
    state = {
		events: initialEvents,
		defaultEvents: initialEvents,
      	selectedEvent: null,
	  	lastItemIndexDisplayed: null
    },
    action
  ) => {
    switch (action.type) {
		case 'new_event':
			return {
				...state,
				events: [...state.events, action.event],
				defaultEvents: [...state.defaultEvents, action.event]
			}
		case 'select_event':
			return {
				...state,
				selectedEvent: action.selectedEvent,
				lastItemIndexDisplayed: state?.lastItemIndexDisplayed ?? state?.events?.at(-1)?.index
			}
		case 'edit_event_value':
			return {
				...state,
				events: state?.events?.map((event) => {
					if (event?.index === action?.index) {
						return {
							...event,
							value1: action?.value ?? event?.value1
						}
					}

					return event;
				}),
				selectedEvent: null
			}
		case "reset_edited_values":
			return {
				...state,
				events: state.defaultEvents
			}
		case 'play':
		case 'go_to_last':
			return {
				...state,
				lastItemIndexDisplayed: null
			}
		case 'pause':
			return {
				...state,
				lastItemIndexDisplayed: state?.events?.at(-1)?.index
			}
		case 'previous':
			return {
				...state,
				lastItemIndexDisplayed: state?.lastItemIndexDisplayed ? state?.lastItemIndexDisplayed - 1 : state?.events?.at(-1)?.index - 1
			}
		case 'next':
			return {
				...state,
				lastItemIndexDisplayed: state?.lastItemIndexDisplayed && state?.lastItemIndexDisplayed !== state?.events?.at(-1)?.index ? state?.lastItemIndexDisplayed + 1 : null
			}
		case 'go_to_first':
			return {
				...state,
				lastItemIndexDisplayed: 20
			}
		default:
			return state
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
