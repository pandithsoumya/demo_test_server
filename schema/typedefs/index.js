const { gql } = require('apollo-server-express')

const data = require('./data')

const base = gql `

type Query {
    _base : String
}
type Mutation {
    _base : String
}

`
module.exports = [
    base, data
]
