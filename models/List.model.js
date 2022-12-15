const { Schema, model } = require("mongoose");

const listSchema = new Schema(
    {

        imageUrl: {
            type: String,
            required: [true, 'La imagen es obligatoria'],
        },

        title: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            minLength: [5, 'Mínimo 5 caracteres del título'],
            maxLength: [42, 'Máximo 42 caracteres del título'],
            unique: true
        },

        type: {
            type: String,
            enum: ['Daily', 'Health', 'Social', 'Hobbies', 'Work', 'Finance'],
            required: [true, 'Elige uno de los siguientes tipos: Daily, Health,Social, Hobbies, Work, Finance']
        },

        description: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
        },

        isPublic: {
            type: Boolean
        },

        tasks: {
            type: [String],
            validate: [values => !values.some(elm => elm === ''), 'Debes incluir tres tareas']
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const List = model("List", listSchema)

module.exports = List