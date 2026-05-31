import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  expiresAt: { type: Date, expires: 0 },
  token: String,
  email: String,
  name: String,
  purpose: {
    enum: ['email-verification', 'password-reset'],
    type: String
  }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  addon_total: Number,
  reference: String,
  total: Number,
  paid_at: Date,
  customer: {
    phone: String,
    email: String,
    name: String
  },
  status: {
    enum: ['pending', 'completed', 'delivered', 'cancelled'],
    default: 'pending',
    type: String
  },
  addons: [
    {
      price: Number,
      text: String,
      id: String,
      _id: false,
      billing_cycle: {
        enum: ['one-time', 'monthly'],
        type: String
      },
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  plan: {
    one_time_payment: Boolean,
    most_popular: Boolean,
    description: String,
    features: [String],
    action: String,
    price: Number,
    name: {
      enum: ['Professional', 'Enterprise', 'Business', 'Starter'],
      type: String
    }
  }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  is_verified: Boolean,
  verified_at: Date,
  password: String,
  name: String,
  auth_method: {
    enum: ['email', 'google'],
    default: 'email',
    type: String
  }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export const Token = mongoose.models.Token || mongoose.model('Token', tokenSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);