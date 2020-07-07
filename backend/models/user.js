const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minlength: 3
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 4
	},
	password: {
		type: String,
		required: true,
		minlength: 4
	},
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}]
})

schema.plugin(uniqueValidator)

schema.virtual('fullName')
	.get(function() { return `${this.firstName} ${this.lastName}` })
	.set(function(v) {
		const firstName = v.substring(0, v.indexOf(' '))
		const lastName = v.substring(v.indexOf(' ') + 1)
		this.set({ firstName, lastName })
	})

module.exports = mongoose.model('User', schema)