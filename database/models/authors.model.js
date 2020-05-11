require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * AuthorSchema
 * * *******************************************************************************
 */
const authorSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
            required: [true, "Le champ Prénom est requis"],
			index: true,
			minLength: [3, "Le Prénom doit contenir minimum 3 caractères"],
			maxLength: [20, "Le Prénom doit contenir maximum 20 caractères"]
		},
		lastname: {
			type: String,
			required: [true, "Le champ Nom est requis"],
			index: true,
			minLength: [3, "Le Nom doit contenir minimum 3 caractères"],
			maxLength: [25, "Le Nom doit contenir maximum 25 caractères"]
		},
		index: Number
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * AuthorSchema.pre('save')
 * * *******************************************************************************
 */
authorSchema.pre('save', function() {
	return Authors.countDocuments().exec().then((currentAuthorIndex) => {
		this.index = currentAuthorIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Author
 * * *******************************************************************************
 */
const Authors = mongoose.model('authors', authorSchema);

module.exports = Authors;
