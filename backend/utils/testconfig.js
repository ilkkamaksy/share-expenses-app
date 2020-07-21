const {
	ApolloServer,
	schema,
	config,
	jwt,
	User
} = require('../index')

/**
 * Integration testing utils
 */
const constructTestServer = (context = null) => {
    
	const server = new ApolloServer({ 
		schema: schema,
		context: context ? context : async ({req}) => {
			const auth = req ? req.headers.authorization : null
			if ( auth && auth.toLowerCase().startsWith('bearer') ) {
				const decodedToken = jwt.verify(
					auth.substring(7), config.JWT_SECRET
				)
				const currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		}
	})
  
	return { server }
}
  
module.exports.constructTestServer = constructTestServer