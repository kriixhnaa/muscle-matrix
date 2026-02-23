const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  plan_type: {
    type: String,
    required: [true, 'Plan type is required'],
    enum: ['1 month', '3 month', 'yearly']
  },
  plan_price: {
    type: Number,
    required: [true, 'Plan price is required']
  },
  start_date: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  expiry_date: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  payment_status: {
    type: String,
    required: [true, 'Payment status is required'],
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  gym_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gym',
    required: [true, 'Gym ID is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Calculate expiry date based on plan type (static method)
memberSchema.statics.calculateExpiry = function(startDate, planType) {
  const date = new Date(startDate);
  switch (planType) {
    case '1 month':
      date.setDate(date.getDate() + 30);
      break;
    case '3 month':
      date.setDate(date.getDate() + 90);
      break;
    case 'yearly':
      date.setDate(date.getDate() + 365);
      break;
    default:
      date.setDate(date.getDate() + 30);
  }
  return date;
};

// Get member status
memberSchema.virtual('status').get(function() {
  const today = new Date();
  const expiry = new Date(this.expiry_date);
  
  if (expiry < today) {
    return 'Expired';
  }
  
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  
  if (expiry <= sevenDaysFromNow) {
    return 'Expiring Soon';
  }
  
  return 'Active';
});

// Ensure virtuals are included in JSON
memberSchema.set('toJSON', { virtuals: true });
memberSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Member', memberSchema);
