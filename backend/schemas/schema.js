const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')
    
const user = require('./user')
const person = require('./person')
const group = require('./group')

const Query = `
        type Query {
            getGroups: [Group]
            getUserById(id: String): User!
            getUserByEmail(email: String): User!
            getPeople(id: String, name: String): [Person!]
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
            saveGroup(
                title: String!
                users: [String]
                people: [String]
            ): Group
            editGroup(
                id: String!
                owner: String
                title: String
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
            addPerson(
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
        }
    `

const schema = makeExecutableSchema({
	typeDefs: [ Query, Mutation, user.typeDef, group.typeDef, person.typeDef ],
	resolvers: merge(user.resolvers, group.resolvers, person.resolvers),
})

module.exports = schema