import gql from 'graphql-tag'

const queries = {}

queries.engineList = gql`
    query {
        engineList:engines{
            id
            name
            slug
            url
        }
    }`

export default queries
