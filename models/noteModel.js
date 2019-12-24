import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'title is required']
		},
		body: {
			type: String,
			default: ''
		},
		attachments: {
			type: [ObjectId]
		},
		ownerId: {
			type: ObjectId,
			required: [true, 'ownerId is required'],
			select: false
		}
	},
	{
		timestamps: true
	}
);

export const Note = mongoose.model('Note', noteSchema);
