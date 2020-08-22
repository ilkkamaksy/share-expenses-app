const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const { ApolloServer } = require('apollo-server')
const schema = require('./schemas/schema')
const User = require('./models/user')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { 
	useNewUrlParser: true,
	useUnifiedTopology: true, 
	useCreateIndex: true
})
	.then(() => {
		console.log('connected to MongoDb')
	})
	.catch(error => {
		console.log('error connection to MongoDB:', error.message)
	})

const server = new ApolloServer({ 
	schema: schema,
	context: async ({req}) => {
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

if (config.MODE !== 'test') {
	server.listen().then(({ url }) => {
		console.log(`Server ready at ${url}`)
	})
}


module.exports = {
	ApolloServer,
	server,
	mongoose,
	schema,
	User,
	config,
	jwt
}