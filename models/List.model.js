const { Schema, model } = require("mongoose");

const listSchema = new Schema(
    {

        imageUrl: {
            type: String
        },

        title: {
            type: String,
            required: [true, 'Name is obligatory'],
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
            type: Boolean,
            default: false
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