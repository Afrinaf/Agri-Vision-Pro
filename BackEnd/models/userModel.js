import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      pattern: '^[a-zA-Z0-9_]*$',
      unique: true,
    },
    firstName: {
      type: String,
      pattern: '^[a-zA-Z]*$',
      default: '',
    },
    lastName: {
      type: String,
      pattern: '^[a-zA-Z]*$',
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9olRhoEF2BaR6EQBQd48xoa8Wucs7Vml6Q&s',
    },
    role: {
      type: String,
      enum: ['regular', 'contributor', 'moderator', 'admin'],
      default: 'regular',
    },
    request: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // if the password is not modified, then do not hash it again
    next();
  }

  const salt = await bcrypt.genSalt(10); // 10 rounds of encryption
  this.password = await bcrypt.hash(this.password, salt); // hash the password with salt value
});

const User = mongoose.model('User', userSchema);

export default User;
