const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	people: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Person'
	}]
})

    
module.exports = mongoose.model('Group', schema)