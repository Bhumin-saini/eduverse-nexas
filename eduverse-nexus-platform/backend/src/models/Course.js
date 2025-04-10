const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  contentType: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment', 'discussion', 'interactive'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  contentUrl: String,
  resources: [{
    title: String,
    description: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'article', 'link', 'code', 'presentation']
    },
    url: String
  }],
  quiz: {
    questions: [{
      text: String,
      options: [String],
      correctOptionIndex: Number,
      points: Number
    }],
    passingScore: Number,
    timeLimit: Number // in minutes
  },
  assignment: {
    instructions: String,
    rubric: String,
    dueDate: Date,
    points: Number,
    submissionType: {
      type: String,
      enum: ['file', 'text', 'link', 'repository']
    }
  },
  isRequired: {
    type: Boolean,
    default: true
  }
});

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'all-levels'
  },
  creditHours: {
    type: Number,
    required: true,
    min: 1
  },
  semester: {
    type: String,
    enum: ['fall', 'spring', 'summer', 'winter', 'year-round'],
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  enrollmentCap: {
    type: Number,
    required: true
  },
  currentEnrollment: {
    type: Number,
    default: 0
  },
  waitlistEnabled: {
    type: Boolean,
    default: false
  },
  waitlistCapacity: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    default: 'default-course-cover.jpg'
  },
  tags: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  syllabus: {
    type: String,
    required: true
  },
  modules: [ModuleSchema],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  gradingPolicy: {
    assignments: {
      type: Number, // percentage
      default: 30
    },
    quizzes: {
      type: Number,
      default: 20
    },
    midterm: {
      type: Number,
      default: 20
    },
    finalExam: {
      type: Number,
      default: 30
    },
    participation: {
      type: Number,
      default: 0
    }
  },
  schedule: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: String,
    endTime: String,
    location: String,
    isOnline: Boolean
  }],
  pointsAvailable: {
    type: Number,
    default: 100
  },
  certificationOffered: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean, 
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for enrollment status
CourseSchema.virtual('enrollmentStatus').get(function() {
  if (this.currentEnrollment < this.enrollmentCap) {
    return 'open';
  } else if (this.waitlistEnabled && this.waitlistCapacity > 0) {
    return 'waitlist';
  } else {
    return 'closed';
  }
});

// Virtual for course duration in weeks
CourseSchema.virtual('durationWeeks').get(function() {
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
});

// Index for efficient searching
CourseSchema.index({ courseCode: 1 });
CourseSchema.index({ department: 1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ 
  title: 'text', 
  description: 'text', 
  tags: 'text' 
}, {
  weights: {
    title: 10,
    tags: 5,
    description: 1
  }
});

module.exports = mongoose.model('Course', CourseSchema); 