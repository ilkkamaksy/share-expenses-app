const mongoose = require('mongoose')
const Group = require('./group')

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

schema.pre('remove', function(next) {
	Group.update(
		{ people : this._id}, 
		{ $pull: { people: this._id } },
		{ multi: true })  //if reference exists in multiple documents 
		.exec()
	next()
})

module.exports = mongoose.model('Person', schema)