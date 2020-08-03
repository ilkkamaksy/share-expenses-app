const mongoose = require('mongoose')
const Group = require('./group')

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
	details: [{
		person: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Person'
		},
		share: {
			type: Number
		},
		paid: {
			type: Number
		},
		balance: {
			type: Number
		},
		receivables: [{
			debtor: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Person'
			},
			amount: {
				type: Number
			}
		}]
	}],
	dateTime: {
		type: Date
	},
	createdAt: Date,
	lastUpdatedAt: Date
})

schema.pre('remove', function(next) {
	Group.update(
		{ expenses : this._id}, 
		{ $pull: { expenses: this._id } },
		{ multi: true })  //if reference exists in multiple documents 
		.exec()
	next()
})

module.exports = mongoose.model('Expense', schema)