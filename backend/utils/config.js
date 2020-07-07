require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET
let MODE = process.env.NODE_ENV

if ( process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
	PORT,
	MONGODB_URI,
	MODE,
	JWT_SECRET
}
