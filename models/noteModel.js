import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
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
			required: true,
			select: false
		}
	},
	{
		timestamps: true
	}
);

mongoose.model('Note', noteSchema);
