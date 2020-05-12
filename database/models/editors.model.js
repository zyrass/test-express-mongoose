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
			minLength: [5, "Le Nom doit contenir 5 caractères minimum"],
			maxLength: [25, "Le Nom doit contenir 25 caractères maximum"],
			index: true,
		},
		info: {
			adress: {type: String, default: "A venir" },
			code_postal: {type: Number, default: 75000},
			city: {type: String, default: "France" }
		},
		active: Boolean,
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