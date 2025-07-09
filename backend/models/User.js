const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
 role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  
  // ✅ Add leave balance tracking
  leaveBalances: {
    casual: { type: Number, default: 14 },
    sick: { type: Number, default: 7 },
    earned: { type: Number, default: 10 }
  }
});

module.exports = mongoose.model('User', userSchema);
