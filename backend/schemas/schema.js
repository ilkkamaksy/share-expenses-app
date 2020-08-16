const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')
    
const user = require('./user')
const person = require('./person')
const group = require('./group')
const expense = require('./expense')
const invitation = require('./invitation')

const Query = `
        type Query {
            getGroups(sortBy: String, order: Float): [Group]
            getInvitationsByCurrentUser: [Invitation]
            getInvitationByGroup(group: String!): Invitation
            getUserById(id: String): User!
            getUserByEmail(email: String): User!
            me: User
        }
    `
const Mutation = `
        input ExpenseDetails {
            personId: String!
            share: Float!
            paid: Float!
            balance: Float!
        }
        type Detail {
            person: String!
            share: Float!
            paid: Float!
            balance: Float!
        }
        type LoginResponse {
            token: String
            user: User
        }
        type Mutation {
            login (
                email: String! 
                password: String!
            ): LoginResponse!
            register (
                email: String!
                password: String!
            ): LoginResponse!
            editUser (
                id: String!
                firstname: String
                lastname: String
                email: String
            ): User
            removeUser (
                id: String!
            ): User
            createGroup(
                title: String!
                location: String
                users: [String]
                people: [String]
            ): Group
            updateGroup(
                id: String!
                title: String
                location: String
                owner: String
                users: [String]
                people: [String]
            ): Group
            removeGroup(
                id: String!
            ): Group
            addGroupUser(
                groupid: String!
                userid: String!
            ): Group
            removeGroupUser(
                groupid: String!
                userid: String!
            ): Group
            addPersonToGroup(
                name: String!
                groupid: String!
            ): Person
            editPerson(
                id: String!
                name: String
            ): Person
            removePerson (
                id: String!
            ): Person
            addExpense(
                groupid: String!
                description: String!
                amount: Float!
                dateTime: String
                details: [ExpenseDetails!]
            ): Group
            removeExpense(
                id: String!
            ): Expense
            createInvitation(
                groupid: String!
            ): Invitation
            removeInvitation(
                id: String!
            ): Invitation
        }
    `

const schema = makeExecutableSchema({
	typeDefs: [ Query, Mutation, user.typeDef, group.typeDef, person.typeDef, expense.typeDef, invitation.typeDef ],
	resolvers: merge(user.resolvers, group.resolvers, person.resolvers, expense.resolvers, invitation.resolvers),
})

module.exports = schema