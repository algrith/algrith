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

const FileSchema = {
  created_at: String,
  mime_type: String,
  name: String,
  size: Number,
  url: String,
  id: String,
  _id: false,
  status: {
    enum: ['uploading', 'uploaded', 'pending', 'failed'],
    default: 'pending',
    type: String
  }
};

const ConversationSchema = new mongoose.Schema({
  active: { type: Boolean, default: true, index: true },
  participants: [
    {
      role: { type: String, enum: ['customer', 'moderator', 'admin'], required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      last_read: { type: Date, default: null },
      _id: false
    },
  ],
  last_message: {
    sender: { type: mongoose.Schema.Types.ObjectId },
    _id: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date },
    text: { type: String }
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    sparse: true,
    ref: 'Order',
    index: true
  },
  type: {
    enum: ['order', 'support'],
    required: true,
    type: String,
    index: true
  },
}, schemaOptions);

const MetadataSchema = new mongoose.Schema({
  order_status_info: String
}, { _id: false });

const MessageSchema = new mongoose.Schema({
  metadata: { type: MetadataSchema, default: null },
  attachments: { type: [FileSchema], default: [] },
  is_deleted: { type: Boolean, default: false },
  text: { type: String, trim: true },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  read_by: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    read_at: { type: Date },
    _id: false
  }],
  sender: {
    role: { type: String, enum: ['customer', 'moderator', 'admin', 'system'], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  status: {
    enum: ['delivered', 'pending', 'failed', 'read', 'sent'],
    default: 'sent',
    type: String
  },
  type: {
    enum: ['message', 'order'],
    default: 'message',
    type: String,
    index: true
  },
}, schemaOptions);

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
  requirements: {
    social_media: [String],
    business_name: String,
    images: [FileSchema],
    domain_name: String,
    logo: FileSchema,
    hosting: Boolean,
    colors: [String],
    fonts: {
      heading: {
        googleFont: String,
        category: String,
        family: String,
        name: String,
        tags: String
      },
      body: {
        googleFont: String,
        category: String,
        family: String,
        name: String,
        tags: String
      }
    }
  },
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
  is_verified: { type: Boolean, default: false },
  password: { type: String, select: false },
  email: { type: String, unique: true },
  google_id: String,
  verified_at: Date,
  name: String,
  auth_provider: {
    enum: ['email', 'google'],
    default: 'email',
    type: String
  },
  role: {
    enum: ['moderator', 'customer', 'admin'],
    default: 'customer',
    type: String,
  }
}, schemaOptions);

userSchema.pre('deleteOne', { document: true, query: false }, async function () {
  await Order.deleteMany({ user: this._id });
});

ConversationSchema.index({ order: 1 }, { unique: true, sparse: true });
ConversationSchema.index({ 'participants.user': 1, updatedAt: -1 });
MessageSchema.index({ conversation: 1, createdAt: 1 });

export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', applyVirtuals(ConversationSchema));
export const Message = mongoose.models.Message || mongoose.model('Message', applyVirtuals(MessageSchema));
export const Order = mongoose.models.Order || mongoose.model('Order', applyVirtuals(orderSchema));
export const Token = mongoose.models.Token || mongoose.model('Token', applyVirtuals(tokenSchema));
export const User = mongoose.models.User || mongoose.model('User', applyVirtuals(userSchema));