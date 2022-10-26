const {gql} = require('apollo-server-express')

module.exports = gql `

type vm {
    id : Int,
    vm_id : Int,
    vm_name : String,
    location : String,
    status : Boolean
}

input vm_input {
    vm_id : Int,
    vm_name : String,
    location : String,
    status : Boolean
}

input deleteId {
    id : Int
}
extend type Query {
      getAllVMs : [vm]
}

extend type Mutation {
    addVM(input : vm_input) : [vm]
    editVM(input : vm_input) : vm
    deleteVM (input : deleteId) : Boolean
}
`