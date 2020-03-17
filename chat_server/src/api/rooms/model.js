import mongoose, {Schema} from 'mongoose'

const roomsSchema = new Schema({
  topic: {
    type: String
  },
  joined: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
});

roomsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      topic: this.topic,
      joined: this.joined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
};

const model = mongoose.model('Rooms', roomsSchema);

export const schema = model.schema;
export default model
