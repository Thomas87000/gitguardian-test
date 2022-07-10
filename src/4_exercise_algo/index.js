import React from 'react'
import { List, ListItem, Text } from '@chakra-ui/react'

import { Exercise } from '../components/Exercise'

import { Metrics } from './Metrics'

export const ExerciseAlgo = () => {
	return (
		<Exercise
			index={4}
			instructions={
				<>
					<Text>
						We have a lot of data that we want to extract meaningful metrics
						from. The data is composed of users, accounts and memberships which
						is an associative table between users and accounts.
						<br />
						Our data has been corrupted and some users have been duplicated. The
						user unique identifier is the email. In order to deduplicate them,
						keeps the user object whose account is the oldest but keep the
						membership of the duplicate users.
						<br />A basic test is already written, you can add test cases to
						help you.
						<br />
						You should implement the <i>computeMetrics</i> function without
						modifying the rest of the code.
						<br />
						The fixtures in data.json have a fixed date. Use the provided <b>now
						</b> variable as the current date (instead of the real current date).
						<br />
						Keep in mind this exercice is testing algorithmic, so the time
						complexity of your code will be evaluated.
					</Text>
					<Text mt={5}>
						Metrics you should compute on <b>deduplicated users</b>:
					</Text>
					<List pl={2} styleType="disc">
						<ListItem>The total number of users.</ListItem>
						<ListItem>
							The number of users with an outdated password (their password
							expires before the fixed `now` date defined in the code).
						</ListItem>
						<ListItem>The number of users with more than 2 accounts.</ListItem>
						<ListItem>
							The average age of the user accounts (using the user createdAt
							field) in days.
						</ListItem>
						<ListItem>
							The number of users in the account with the most users.
						</ListItem>
					</List>
				</>
			}
		>
		<Metrics />
		</Exercise>
	)
}
