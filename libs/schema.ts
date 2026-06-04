import mongoose, { Document, Schema } from 'mongoose';
import { filterObject } from '@/utils';
import { BaseObject } from '@/types';

const applyVirtuals = (schema: Schema) => {
  schema.virtual('id').get(function () {
    return (this as Document)._id.toString();
  });

  const transform = (_: BaseObject, ret: BaseObject) => filterObject({
    target: { id: ret._id.toString(), ...ret },
    filters: ['_id']
  });

  schema.set('toObject', {
    versionKey: false,
    virtuals: true,
    transform
  });

  schema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform
  });

  return schema;
};

const schemaOptions = { timestamps: true };

const tokenSchema = new mongoose.Schema({
  expiresAt: { type: Date, expires: 0 },
  token: String,
  email: String,
  name: String,
  purpose: {
    enum: ['email-verification', 'password-reset'],
    type: String
  }
}, schemaOptions);

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
}, schemaOptions);

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
}, schemaOptions);

export const Order = mongoose.models.Order || mongoose.model('Order', applyVirtuals(orderSchema));
export const Token = mongoose.models.Token || mongoose.model('Token', applyVirtuals(tokenSchema));
export const User = mongoose.models.User || mongoose.model('User', applyVirtuals(userSchema));