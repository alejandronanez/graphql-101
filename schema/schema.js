const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

// Describe how a user looks like
const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Foo foo',
	fields: {
		id: {
			type: GraphQLString
		},
		firstName: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root query for the app',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				// DB Query
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
