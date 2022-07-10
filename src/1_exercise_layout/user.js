import React from 'react'
import { Box, Flex, Image, ListItem, UnorderedList, Link } from '@chakra-ui/react'

export const User = ({ user: { avatar, bio, company, firstName, lastName, login, top3Repositories } }) => {
	return (
		<Flex border='1px' borderColor='gray.300' p="2" rounded={3} flexDirection="row" gap={4} alignItems="flex-start">
			<Image rounded={3} boxSize="100px" src={avatar} />
			<Box flex="1">
				{login ? <Box><Box as="span" fontWeight="bold">Login:</Box> {login}</Box> : null}
				{firstName ? <Box><Box as="span" fontWeight="bold">First name:</Box> {firstName}</Box> : null}
				{lastName ? <Box><Box as="span" fontWeight="bold">Last name:</Box> {lastName}</Box> : null}
				{company ? <Box><Box as="span" fontWeight="bold">Company:</Box> {company}</Box> : null}
				{bio ? <Box><Box as="span" fontWeight="bold">Bio:</Box> {bio}</Box> : null}
			</Box>
			<Box w={250}>
				<Box fontWeight="bold">Top 3 repositories:</Box>
				<UnorderedList>
					{top3Repositories?.map(({ name, url }, index) => (
						<ListItem key={index}>
							<Link color="blue.400" textDecoration="underline" href={url ?? '#'} isExternal>
								{name}
							</Link>
						</ListItem>
					))}
				</UnorderedList>
			</Box>
		</Flex>
  	)
}
