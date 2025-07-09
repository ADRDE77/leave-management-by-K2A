const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  leaveType: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);
