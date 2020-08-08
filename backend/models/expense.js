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
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
	createdAt: Date,
	lastUpdatedAt: Date
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Group').update({ expenses: id }, { $pull: { expenses: id } }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

module.exports = mongoose.model('Expense', schema)