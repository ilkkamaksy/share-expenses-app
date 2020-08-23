const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
	name: {
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

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Group').update({ users: id }, { $pull: { users: id } }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Group').deleteMany({ owner: id }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Invitation').deleteMany({ owner: id }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

module.exports = mongoose.model('User', schema)