import React from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from '../Header'

export const Exercise = ({ index, title, children, instructions }) => {
  return (
    <Box>
      <Header
        title={
          <span>
            Exercise {index} {title && <b>{title}</b>}
          </span>
        }
      >
        {instructions}
      </Header>
      {children}
    </Box>
  )
}

Exercise.displayName = 'Exercise'
