/* eslint-disable no-undef */
import React from 'react'
import { List, ListItem } from '@chakra-ui/react'

import data from './data.json'

const now = new Date('June 23, 2022 00:00:00')
const oneDay = 1000*60*60*24

const getUniqUsers = (users) => {
	const cache = {};
	const cacheUserParents = {};
	const uniqUsers = [];

	for (let i = 0, l = users.length; i < l; i++) {
		const user = users[i];
	
		const userInCache = cache[user["email"]];
		cacheUserParents[user["id"]] = user["id"];
		if (typeof userInCache === "undefined") {
			cache[user["email"]] = {
				index: i,
				userInfo: user
			};
			uniqUsers.push(user);
		} else {
			const cachedUserCreatedAtDate = new Date(userInCache.userInfo.createdAt);
			const currentUserCreatedAtDate = new Date(user.createdAt);

			// Check if the current user has been added before the user already added in the duplicated cache user list
			if (currentUserCreatedAtDate.getTime() < cachedUserCreatedAtDate.getTime()) {
				// Update the cache with the new user info
				cache[user["email"]] = {
					index: userInCache.index,
					userInfo: user
				};

				cacheUserParents[userInCache.userInfo.id] = user.id;

				// Update the user info with the oldest user infos
				uniqUsers[userInCache.index] = user
			}
		}
  	}

	return { uniqUsers, cacheUserParents };
}

const getOutdatedPassword = (users) => {
	const outdatedPasswordUsers = [];
  
	for (let i = 0, l = users.length; i < l; i++) {
	  	const user = users[i];
		const passwordExpiresDate = new Date(user?.passwordExpiresAt);

		// Check if the password finish before the current date
		if (passwordExpiresDate.getTime() < now.getTime()) {
			outdatedPasswordUsers.push(user);
		}
	}

	return outdatedPasswordUsers;
}

const getUsersWithManyAccounts = (memberships, cacheUserParents) => {
	const cacheUsersAccounts = {};
	const cacheAccountsUsers = {};
	let usersWithManyAccounts = [];
  
	for (let i = 0, l = memberships.length; i < l; i++) {
	  	const membership = memberships[i];
		
		const idParentUser = cacheUserParents[membership["user"]];
		if (typeof cacheUsersAccounts[idParentUser] === "undefined") {
			cacheUsersAccounts[idParentUser] = [membership.account];
		} else if (cacheUsersAccounts[idParentUser].length === 2) {
			usersWithManyAccounts = [...new Set([...usersWithManyAccounts, ...[membership.user]])];
		} else {
			cacheUsersAccounts[idParentUser].push(...[membership.account]);
		}

		if (typeof cacheAccountsUsers[membership.account] === "undefined") {
			cacheAccountsUsers[membership.account] = [idParentUser];
		} else {
			cacheAccountsUsers[membership.account] = [...new Set([...cacheAccountsUsers[membership.account], ...[idParentUser]])];
		}
	}

	return { usersWithManyAccounts, cacheAccountsUsers };
}

const getUsersAverageAgeAndBiggestAccountMembers = (accounts, cacheAccountsUsers) => {
	let sumAge = 0;
	let biggestAccountMembers = 0;
	
	for (let i = 0, l = accounts.length; i < l; i++) {
	  	const account = accounts[i];
		const createdAtDate = new Date(account?.createdAt);
		sumAge = sumAge + (now.getTime() - createdAtDate.getTime());
		biggestAccountMembers = biggestAccountMembers < cacheAccountsUsers?.[account.id]?.length ? cacheAccountsUsers[account.id].length : biggestAccountMembers;
	}

	const userAccountsAverageAge = sumAge > 0 ? Math.round((sumAge / oneDay) / accounts.length) : 0;

	return {
		userAccountsAverageAge,
		biggestAccountMembers
	}
}

export const computeMetrics = ({ users, accounts, memberships }) => {
	// console.log(users, accounts, memberships)
	const start = performance.now();

	const { uniqUsers, cacheUserParents } = getUniqUsers(users);
	const outdatedPasswordUsers = getOutdatedPassword(uniqUsers);
	const { usersWithManyAccounts, cacheAccountsUsers } = getUsersWithManyAccounts(memberships, cacheUserParents);
	const { userAccountsAverageAge, biggestAccountMembers } = getUsersAverageAgeAndBiggestAccountMembers(accounts, cacheAccountsUsers);


	const end = performance.now();
	
	const value = end - start;
	console.log(value + "ms");

	return {
		uniqueUsers: uniqUsers.length,
		outdatedPasswordUsers: outdatedPasswordUsers.length,
		usersWithManyAccounts: usersWithManyAccounts.length,
		usersAverageAge: userAccountsAverageAge,
		biggestAccountMembers
	}
}

export const Metrics = () => {
	const { users, accounts, memberships } = data

	const {
		biggestAccountMembers,
		outdatedPasswordUsers,
		uniqueUsers,
		usersAverageAge,
		usersWithManyAccounts,
	} = computeMetrics({
		users,
		accounts,
		memberships,
	})

	return (
		<List>
			<ListItem>
				Total of unique users: <b>{uniqueUsers}</b>
			</ListItem>
			<ListItem>
				Users with outdated password: <b>{outdatedPasswordUsers}</b>
			</ListItem>
			<ListItem>
				Users with more than 2 accounts: <b>{usersWithManyAccounts}</b>
			</ListItem>
			<ListItem>
				Average age of user accounts: <b>{usersAverageAge}</b>
			</ListItem>
			<ListItem>
				Number of users in the biggest account: <b>{biggestAccountMembers}</b>
			</ListItem>
		</List>
	)
}
