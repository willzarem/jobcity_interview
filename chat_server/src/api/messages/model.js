import mongoose, { Schema } from 'mongoose'

const messagesSchema = new Schema({
  roomId: {
    type: String
  },
  userId: {
    type: String
  },
  body: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
});

messagesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      roomId: this.roomId,
      userId: this.userId,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
};

const model = mongoose.model('Messages', messagesSchema);

export const schema = model.schema;
export default model
