import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
});

const List = mongoose.model('List', listSchema);
export default List;
