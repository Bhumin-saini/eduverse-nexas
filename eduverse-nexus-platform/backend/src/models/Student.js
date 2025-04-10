const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // Don't include password in query results by default
  },
  fullName: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    default: 'default-profile.png'
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  studentId: {
    type: String,
    unique: true
  },
  department: {
    type: String,
    trim: true
  },
  enrollmentYear: {
    type: Number
  },
  currentSemester: {
    type: Number,
    default: 1
  },
  majorProgram: {
    type: String,
    trim: true
  },
  minorProgram: {
    type: String,
    trim: true
  },
  educationalBackground: {
    highSchool: String,
    previousDegrees: [{
      institution: String,
      degree: String,
      field: String,
      year: Number
    }]
  },
  balance: {
    totalPointsEarned: {
      type: Number,
      default: 0
    },
    currentBalance: {
      type: Number,
      default: 0
    },
    stakedPoints: {
      type: Number,
      default: 0
    }
  },
  achievements: [{
    title: String,
    description: String,
    dateEarned: Date,
    pointsAwarded: Number,
    badgeUrl: String,
    category: String,
    onchainId: String
  }],
  skills: [{
    name: String,
    level: {
      type: Number,
      min: 1,
      max: 5
    },
    endorsements: Number,
    verifications: [{
      verifierId: String,
      date: Date
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to hash password
StudentSchema.pre('save', async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
StudentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full student profile
StudentSchema.virtual('fullProfile').get(function() {
  return {
    id: this._id,
    walletAddress: this.walletAddress,
    username: this.username,
    email: this.email,
    fullName: this.fullName,
    profilePicture: this.profilePicture,
    studentId: this.studentId,
    department: this.department,
    enrollmentYear: this.enrollmentYear,
    currentSemester: this.currentSemester,
    majorProgram: this.majorProgram,
    balance: this.balance,
    achievementCount: this.achievements ? this.achievements.length : 0
  };
});

module.exports = mongoose.model('Student', StudentSchema); 