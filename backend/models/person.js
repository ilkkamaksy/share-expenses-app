const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}
})

module.exports = mongoose.model('Person', schema)