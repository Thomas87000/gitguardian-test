import { Provider } from 'react-redux'
import React, { useEffect, useRef } from 'react'
import { List, ListItem, Text } from '@chakra-ui/react'

import { Exercise } from '../components/Exercise'

import { createRandomEvent } from './utils'
import { store } from './store'

export const Container = ({ children }) => {
  	const currentIndex = useRef(50)

	useEffect(() => {
		const intervalId = setInterval(() => {
			store.dispatch({
				type: 'new_event',
				event: createRandomEvent(++currentIndex.current),
			})
		}, 2000)
		return () => clearInterval(intervalId)
	}, [])

	return (
		<Provider store={store}>
			<Exercise
				index={3}
				title={'Live chart'}
				instructions={
				<>
					<Text>
					The following graph is a simulation of a live stream of events
					which refresh every 2s. The events are stored in a redux store. We
					want to be able to edit some events.
					</Text>
					<Text as="u">Please add the following features:</Text>
					<List pl={2} styleType="disc">
					<ListItem>
						Clicking on a cell makes it editable and allows to edit its
						value.
					</ListItem>
					<ListItem>The chart must show the correct value.</ListItem>
					</List>
					<Text as="u">Optional:</Text>
					<List pl={2} styleType="disc">
					<ListItem>
						Clicking on the chart may open the cell `value1` of the
						corresponding event
					</ListItem>
					<ListItem>
						A button may be added to reset all the updated values
					</ListItem>
					<ListItem>
						Add some components in the UI that allow to navigate in time.
					</ListItem>
					</List>
					<Text as="u">Additional informations:</Text>
					<List pl={2} styleType="disc">
					<ListItem>
						The `container` component must not be edited. Consider that this
						is the only constraint.
					</ListItem>
					<ListItem>
						Use the ui/ux you consider working well for the use case.
					</ListItem>
					</List>
				</>
				}
			>
				{children}
			</Exercise>
		</Provider>
	)
}
