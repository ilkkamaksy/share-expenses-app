const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		minlength: 1
	},
	amount: {
		type: Number,
		required: true,
		min: 0
	},
	people: [{
		person: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Person'
		},
		share: {
			type: Number
		},
		amountPaid: {
			type: Number
		}
	}],
	createdAt: Date,
	lastUpdatedAt: Date
})
    
module.exports = mongoose.model('Expense', schema)