import { computeMetrics } from './Metrics'

const users = [
	{
		"id": 500,
		"firstName": "Yves",
		"lastName": "Bissonnette",
		"email": "Yves.Montgomery@masson.paris",
		"createdAt": "2020-06-07T06:05:50.273Z",
		"passwordExpiresAt": "2021-06-07T06:05:50.273Z"
	},
	{
		"id": 501,
		"firstName": "Yves",
		"lastName": "Montgomery",
		"email": "Yves.Montgomery@masson.paris",
		"createdAt": "2018-08-26T11:49:28.723Z",
		"passwordExpiresAt": "2022-08-26T11:49:28.723Z"
	},
	{
		"id": 502,
		"firstName": "Roberta",
		"lastName": "Lucy",
		"email": "Roberta.Lucy@masson.paris",
		"createdAt": "2019-10-12T20:28:16.410Z",
		"passwordExpiresAt": "2020-10-11T20:28:16.410Z"
	},
	{
		"id": 503,
		"firstName": "Tommy",
		"lastName": "Pichard",
		"email": "Tommy.Pichard@picard.zero",
		"createdAt": "2019-09-11T15:55:20.517Z",
		"passwordExpiresAt": "2020-09-10T15:55:20.517Z"
	},
	{
		"id": 504,
		"firstName": "Abraham",
		"lastName": "Brochard",
		"email": "Abraham.Brochard@masson.paris",
		"createdAt": "2018-10-17T16:23:50.293Z",
		"passwordExpiresAt": "2019-10-17T16:23:50.293Z"
	},
	{
		"id": 505,
		"firstName": "Yves",
		"lastName": "De la Croix",
		"email": "Yves.De la Croix@masson.paris",
		"createdAt": "2019-06-04T12:59:35.760Z",
		"passwordExpiresAt": "2020-06-03T12:59:35.760Z"
	},
	{
		"id": 506,
		"firstName": "Cora",
		"lastName": "De la Croix",
		"email": "Cora.De la Croix@gg.com",
		"createdAt": "2020-02-13T01:06:45.391Z",
		"passwordExpiresAt": "2021-02-12T01:06:45.391Z"
	},
	{
		"id": 507,
		"firstName": "Irwin",
		"lastName": "Lucy",
		"email": "Irwin.Lucy@gg.com",
		"createdAt": "2020-04-01T13:59:50.512Z",
		"passwordExpiresAt": "2023-04-01T13:59:50.512Z"
	},
	{
		"id": 508,
		"firstName": "Irwin",
		"lastName": "Brochard",
		"email": "Irwin.Brochard@masson.paris",
		"createdAt": "2018-11-18T14:50:33.592Z",
		"passwordExpiresAt": "2019-11-18T14:50:33.592Z"
	},
	{
		"id": 509,
		"firstName": "Gwenael",
		"lastName": "De la Croix",
		"email": "Gwenael.De la Croix@masson.paris",
		"createdAt": "2020-02-21T05:47:44.632Z",
		"passwordExpiresAt": "2021-02-20T05:47:44.632Z"
	},
	{
		"id": 510,
		"firstName": "Mado",
		"lastName": "De la Croix",
		"email": "Mado.De la Croix@masson.paris",
		"createdAt": "2018-07-11T18:24:34.340Z",
		"passwordExpiresAt": "2019-07-11T18:24:34.340Z"
	}
]

const accounts = [
	{
		"id": 20,
		"name": "First account",
		"createdAt": "2022-06-22T00:00:00.830Z"
	},
	{
		"id": 21,
		"name": "Second account",
		"createdAt": "2022-06-20T00:00:00.413Z"
	},
	{
		"id": 22,
		"name": "Third account",
		"createdAt": "2022-06-21T00:00:00.253Z"
	},
	{
		"id": 23,
		"name": "Third account",
		"createdAt": "2022-06-20T00:00:00.253Z"
	}
]

const memberships = [
	{ "id": 715, "account": 20, "user": 500 },
    { "id": 724, "account": 20, "user": 506 },
    { "id": 719, "account": 20, "user": 504 },
    { "id": 721, "account": 20, "user": 503 },
    { "id": 742, "account": 20, "user": 509 },
    { "id": 716, "account": 21, "user": 502 },
    { "id": 720, "account": 21, "user": 501 },
    { "id": 718, "account": 22, "user": 506 },
    { "id": 722, "account": 22, "user": 507 },
    { "id": 759, "account": 22, "user": 508 },
    { "id": 722, "account": 22, "user": 510 },
    { "id": 798, "account": 22, "user": 501 },
    { "id": 800, "account": 23, "user": 501 }
];

describe('computeMetrics', () => {
	test('it should return 0 when no users', () => {
		expect(
		computeMetrics({ users: [], accounts: [], memberships: [] })
		).toEqual({
			uniqueUsers: 0,
			outdatedPasswordUsers: 0,
			usersWithManyAccounts: 0,
			biggestAccountMembers: 0,
			usersAverageAge: 0
		})
	})

	test('it should return right values', () => {
		expect(
		computeMetrics({ users, accounts, memberships })
		).toEqual({
			uniqueUsers: 10,
			outdatedPasswordUsers: 8,
			usersWithManyAccounts: 1,
			biggestAccountMembers: 5,
			usersAverageAge: 2
		})
	})
})
