const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1
	},
	location: {
		type: String,
		minlength: 1
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
	}],
	createdAt: Date,
	lastUpdatedAt: Date
})
    
module.exports = mongoose.model('Group', schema)