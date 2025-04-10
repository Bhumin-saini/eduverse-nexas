const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'failed'],
    default: 'active'
  },
  progress: {
    type: Number, // Percentage of course completed
    default: 0,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', 'I', 'W', ''],
    default: ''
  },
  gradePoints: {
    type: Number,
    default: 0
  },
  completionDate: {
    type: Date
  },
  materialProgress: [{
    materialId: String,
    completed: Boolean,
    completionDate: Date,
    timeSpent: Number, // in minutes
    attemptsCount: Number
  }],
  assignmentSubmissions: [{
    assignmentId: String,
    submissionDate: Date,
    submissionContent: String,
    grade: Number,
    feedback: String,
    onchainVerified: Boolean
  }],
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateId: {
    type: String
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    submissionDate: Date
  }
}, {
  timestamps: true
});

// Compound index to ensure a student can only enroll once in a course
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema); 