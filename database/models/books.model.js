require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * BookSchema
 * * *******************************************************************************
 */
const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Le champ Titre est requis"],
			index: true,
			minLength: [8, "Le Titre doit avoir minimum 8 caractères."],
			maxLength: [255, "Le Titre ne peut exéder 255 caractères."]
		},
		index: Number,
		info: {
			color: Boolean,
			pages: { type: Number, default: 1 },
			chapters: { type: Number, default: 1 },
			genre: { type: String, default: 'Developpeur Web' }
		},
		editor_id: { type: mongoose.Types.ObjectId, required: true, ref: 'editors' },
		author_id: { type: mongoose.Types.ObjectId, required: false, ref: 'authors' }
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * BookSchema.pre('save')
 * * *******************************************************************************
 */
bookSchema.pre('save', function() {
	return Books.countDocuments().exec().then((currentBookIndex) => {
		this.index = currentBookIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Book
 * * *******************************************************************************
 */
const Books = mongoose.model('books', bookSchema);

module.exports = Books;
