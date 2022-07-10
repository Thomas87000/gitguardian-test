import { Link as RLink } from 'react-router-dom'
import React from 'react'
import { Box, Link } from '@chakra-ui/react'

import { Header } from './Header'

const exercises = [
  { index: 1, name: 'Layout' },
  { index: 2, name: 'Testing' },
  { index: 3, name: 'LiveChart' },
  { index: 4, name: 'Algo' },
]

function App() {
  return (
    <div className="App">
      <Header title={'Welcome! This is the GitGuardian interview test'}>
        Each of the link below corresponds to an exercise. Each of the exercises
        is independent and can be done separately. If you struggle on one, feel
        free to go to the next one even if they are sorted from the easiest to
        the more difficult, more or less.
      </Header>
      <Box p={4}>
        {exercises.map(({ index, name }) => (
          <Link
            key={index}
            as={RLink}
            color="blue.700"
            mr={8}
            to={`/exercises/${index}`}
          >
            Exercise {index}: <b>{name}</b>
          </Link>
        ))}
      </Box>
    </div>
  )
}

export default App
