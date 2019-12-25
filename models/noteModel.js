import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
export const NOTE_STATE = ['DEFAULT', 'ARCHIVE', 'TRASH'];

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'note.title is required']
		},
		body: {
			type: String,
			default: ''
		},
		state: {
			type: String,
			enum: {
				values: NOTE_STATE,
				message: 'invalid value for note.state'
			},
			default: NOTE_STATE[0],
			uppercase: true,
			trim: true
		},
		attachments: {
			type: [ObjectId]
		},
		ownerId: {
			type: ObjectId,
			required: [true, 'note.ownerId is required'],
			select: false
		}
	},
	{
		timestamps: true
	}
);

export const Note = mongoose.model('Note', noteSchema);
