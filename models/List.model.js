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
            enum: ['Daily', 'Health', 'Social', 'Hobbies', 'Work', 'Finance']
        },

        description: {
            type: String,
        },

        isPublic: {
            type: Boolean

        },

        tasks: [String],

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