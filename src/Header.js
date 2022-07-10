import { Link } from 'react-router-dom'
import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'

export const Header = ({ title, children }) => (
  <Box p={4}>
    <Link to="/">
      <Flex align="center">
        <Image d="inline-block" h="60px" src="/gitguardian-owl.png" />
        <Text fontSize="2xl" fontWeight="bolder" ml={4}>
          Home page
        </Text>
      </Flex>
    </Link>
    <chakra.h1 fontSize="xl" fontWeight="md" mt={10}>
      {title}
    </chakra.h1>
    <Box>{children}</Box>
  </Box>
)
