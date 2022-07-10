const firstNames = [
  'Abraham',
  'Madeleine',
  'Irwin',
  'Cora',
  'Gwenael',
  'Roberta',
  'Roderick',
  'Lua',
  'Yves',
  'Mado',
  'Tommy',
  'Sidoine',
]

const lastNames = [
  'Beaumont',
  'Bissonnette',
  'Montgomery',
  'De la Croix',
  'Monteil',
  'Rigal',
  'Barbet',
  'Lucy',
  'Pichard',
  'Brochard',
]

const companies = [
  'gg.com',
  'gmail.com',
  'toto.xd',
  'masson.paris',
  'picard.zero',
]

const now = new Date('June 23, 2020 00:00:00')

const range = (n) => [...Array(n)]
const randInt = (max, min = 0) => Math.floor(Math.random() * (max - min) + min)
const randChoice = (arr) => arr[randInt(arr.length)]
const DAY_IN_MILLISECONDS = 86400000
const randDate = (startDate, endDate = now) =>
  new Date(
    randInt(endDate.getTime() - startDate.getTime()) + startDate.getTime()
  )
const addDays = (date, n) => new Date(date.getTime() + n * DAY_IN_MILLISECONDS)

let nextUserId = 0
const generateUser = () => {
  const firstName = randChoice(firstNames)
  const lastName = randChoice(lastNames)
  const company = randChoice(companies)
  const createdAt = randDate(addDays(now, -365 * 2))
  return {
    id: nextUserId++,
    firstName,
    lastName,
    email: `${firstName}.${lastName}@${company}`,
    createdAt,
    passwordExpiresAt: addDays(createdAt, 365),
  }
}

let nextAccountId = 0
const generateAccount = () => ({
  id: nextAccountId++,
  name: 'First account',
  createdAt: randDate(addDays(now, -365 * 2)),
})

const combination = (arr, k) => {
  const copy = arr.slice()
  const elements = []
  for (let i = 0; i < k; i++) {
    const idx = randInt(copy.length)
    elements.push(copy.splice(idx, 1)[0])
  }
  return elements
}

let nextMembershipId = 0
const generateMemberships = (users, accounts) => {
  const memberships = []
  users.forEach((user) => {
    const n_memberships = randInt(4)
    const member_of = combination(accounts, n_memberships)
    member_of.forEach((account) => {
      memberships.push({
        id: nextMembershipId++,
        account: account.id,
        user: user.id,
      })
    })
  })
  return memberships
}

const N_USERS = 500
const N_ACCOUNTS = 20

export const generateData = () => {
  const users = range(N_USERS).map(generateUser)
  const accounts = range(N_ACCOUNTS).map(generateAccount)
  const memberships = generateMemberships(users, accounts)

  return {
    users,
    accounts,
    memberships,
  }
}
