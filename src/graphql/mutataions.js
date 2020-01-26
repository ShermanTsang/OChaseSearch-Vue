import gql from 'graphql-tag'

const mutations = {}

mutations.example = gql`
    mutation {
        test {
            name
        }
    }`

export default mutations
