require('colors');
const mongoose = require('mongoose');

/**
 * * *******************************************************************************
 * * EditorSchema
 * * *******************************************************************************
 */
const editorSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Le champ Nom est requis"],
			index: true,
			minLength: [5, "Le Nom doit contenir 5 caractères minimum"],
			maxLength: [25, "Le Nom doit contenir 25 caractères maximum"]
		},
		index: Number
	},
	{
		timestamps: true
	}
);

/**
 * * *******************************************************************************
 * * EditorSchema.pre('save')
 * * *******************************************************************************
 */
editorSchema.pre('save', function() {
	return Editors.countDocuments().exec().then((currentEditorIndex) => {
		this.index = currentEditorIndex + 1;
	});
});

/**
 * * *******************************************************************************
 * * Modèle Editor
 * * *******************************************************************************
 */
const Editors = mongoose.model('editors', editorSchema);

module.exports = Editors;