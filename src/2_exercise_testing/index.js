import React from 'react'
import { List, ListItem, Text } from '@chakra-ui/react'

import { Exercise } from '../components/Exercise'

import { UserList } from './user-list'

export const ExerciseTesting = () => {
  return (
    <Exercise
      index={2}
      instructions={
        <>
          <Text>
            We have a short list of users that we want to update. When clicking
            on a user, it shows a small form which allows to edit his first
            name, last name and login. Submitting the form should update the
            informations of the user in the list. The three points below will be
            verified:
          </Text>
          <List pl={2} styleType="disc">
            <ListItem>When clicking on a user its form is toggled.</ListItem>
            <ListItem>
              Only one form should be opened at the same time.
            </ListItem>
            <ListItem>
              Write a simple test to confirm that everything works fine.
            </ListItem>
          </List>
        </>
      }
    >
      <UserList />
    </Exercise>
  )
}
