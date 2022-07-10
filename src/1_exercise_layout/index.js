import React from 'react'
import { Box, Flex, Grid, List, ListItem, Text } from '@chakra-ui/react'

import { users } from '../data/users'
import { Exercise } from '../components/Exercise'

import { User } from './user'

export const ExerciseLayout = () => {
	return (
		<Exercise
		index={1}
		instructions={
			<>
			<Text as="u">Please fix the 2 problems below:</Text>
			<List pl={2} styleType="disc">
				<ListItem>
				The 3 GitHub profiles below do not display any information.
				</ListItem>
				<ListItem>
				They should be displayed on 3 rows, each containing 3 colums: the
				first for the avatar, the 2nd contains the profile informations
				and the 3rd contains the top 3 repositories. The middle column
				should take the maximum space.
				</ListItem>
			</List>
			</>
		}
		>
			<Flex flexDirection="column" p={2} gap={6}>
				{users.map((user) => (
					<User key={user.login} user={user} />
				))}
			</Flex>
		</Exercise>
  	)
}
