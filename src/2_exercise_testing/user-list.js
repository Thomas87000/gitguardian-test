import React, { useState } from 'react'
import { Box, Button, Input, Stack } from '@chakra-ui/react'

import { users } from '../data/users'

export const UserList = () => {
	const [selectedUserIndex, setSelectedUserIndex] = useState(0);
	const [usersList, setUsersList] = useState(users ?? []);


	const selectUserIndex = (index) => (setSelectedUserIndex(index));

  	const updateUser = (e) => {
		e.preventDefault();
		const form = new FormData(e.target);

		setUsersList((prevState) => prevState?.map((user, index) => {
			if (index === selectedUserIndex) {
				return {
					...user,
					firstName: form.get('firstName') ?? '',
					lastName: form.get('lastName') ?? '',
					login: form.get('login') ?? '',
				}
			}

			return user;
		}))
	}
	return (
		<Stack
			w="600px"
			ml={4}
			p={4}
			border="1px"
			borderColor="gray.400"
			rounded="md">
      		{usersList.map((user, index) => {
        	return (
          		<Box key={user.login} >
            		<Button
						_hover={{ bg: 'gray.300' }}
						bg="gray.100"
						p="2"
						w="100%"
						justifyContent="left"
						rounded="2"
						data-testid={`user-${index}`}
						onClick={() => selectUserIndex(index)}>
              			{user.firstName} {user.lastName} @{user.login}
            		</Button>
            		{selectedUserIndex === index ? (
						<form onSubmit={updateUser}>
							<Stack p={2} spacing={3}>
								<Input
									defaultValue={user.firstName}
									placeholder="First name"
									size="sm"
									w="300px"
									name="firstName"
									aria-label="first name"
								/>
								<Input
									defaultValue={user.lastName}
									placeholder="Last name"
									size="sm"
									w="300px"
									name="lastName"
									aria-label="last name"
								/>
								<Input
									defaultValue={user.login}
									placeholder="Login"
									size="sm"
									w="300px"
									name="login"
									aria-label='login'
								/>
								<Button
									colorScheme="green"
									size="sm"
									type="submit"
									alignSelf="flex-start"
								>
									Update
								</Button>
							</Stack>
						</form>
            		) : null}
          </Box>
        )
      })}
    </Stack>
  )
}
