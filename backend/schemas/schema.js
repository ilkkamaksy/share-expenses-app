const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')
    
const user = require('./user')
const person = require('./person')
const group = require('./group')
const expense = require('./expense')

const Query = `
        type Query {
            getGroups: [Group]
            getUserById(id: String): User!
            getUserByEmail(email: String): User!
            getPeopleByGroupId(groupid: String): [Person!]
            getPersonById(id: String): Person
            me: User
        }
    `
const Mutation = `
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
                people: [String!]
            ): Expense
        }
    `

const schema = makeExecutableSchema({
	typeDefs: [ Query, Mutation, user.typeDef, group.typeDef, person.typeDef, expense.typeDef ],
	resolvers: merge(user.resolvers, group.resolvers, person.resolvers, expense.resolvers),
})

module.exports = schema