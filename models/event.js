import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  event: {
    type: String,
    required: [true, 'Event is required.'],
  },
  date: {
    type: String,
    required: [true, 'Date is required.'],
  },
  time: {
    type: String,
    required: [true, 'Time is required.'],
  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  }
});

const Event = models.Event || model('Event', EventSchema);

export default Event;