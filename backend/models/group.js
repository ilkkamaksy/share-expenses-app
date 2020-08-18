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
	expenses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Expense'
	}],
	createdAt: Date,
	lastUpdatedAt: Date
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Person').deleteMany({ group: id }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Expense').deleteMany({ group: id }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Invitation').deleteMany({ group: id }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

module.exports = mongoose.model('Group', schema)