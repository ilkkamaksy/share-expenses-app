const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	createdAt: Date,
})

module.exports = mongoose.model('Invitation', schema)