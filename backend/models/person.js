const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1
	},
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	},
})

schema.pre('findOneAndDelete', { document: true }, function(next) {
	let id = this.getQuery()['_id']
	mongoose.model('Group').update({ people: id }, { $pull: { people: id } }, function(err) {
		if (err) {
			next(err)
		} else {
			next()
		}
	})
})

module.exports = mongoose.model('Person', schema)