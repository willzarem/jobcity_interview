import mongoose, {Schema} from 'mongoose'

const usersSchema = new Schema({
  name: {
    type: String
  },
  rooms: {
    type: Number
  },
  avatar: {
    type: String
  },
  type: {
    type: String
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

usersSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      rooms: this.rooms,
      avatar: this.avatar,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
};

const model = mongoose.model('Users', usersSchema);

export const schema = model.schema;
export default model
