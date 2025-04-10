-- EduVerse Nexus Platform Database Schema

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'faculty', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Departments
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student profiles
CREATE TABLE student_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  student_id VARCHAR(20) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  year_level INTEGER,
  profile_image VARCHAR(255),
  bio TEXT,
  contact_info JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Faculty profiles
CREATE TABLE faculty_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  faculty_id VARCHAR(20) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  position VARCHAR(100),
  profile_image VARCHAR(255),
  bio TEXT,
  contact_info JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallet connections
CREATE TABLE wallets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address VARCHAR(42) NOT NULL UNIQUE,
  is_primary BOOLEAN DEFAULT FALSE,
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education history for students
CREATE TABLE education_history (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  institution VARCHAR(100) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  field_of_study VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student achievements (certifications, awards, etc.)
CREATE TABLE student_achievements (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  issuer VARCHAR(100),
  blockchain_verified BOOLEAN DEFAULT FALSE,
  blockchain_tx_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  department_id INTEGER REFERENCES departments(id),
  credit_hours INTEGER NOT NULL DEFAULT 3,
  max_students INTEGER,
  faculty_id INTEGER REFERENCES faculty_profiles(id),
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  image_url VARCHAR(255),
  syllabus_url VARCHAR(255),
  prerequisites JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course sections (modules)
CREATE TABLE course_sections (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  section_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course materials (lectures, readings, videos)
CREATE TABLE course_materials (
  id SERIAL PRIMARY KEY,
  section_id INTEGER NOT NULL REFERENCES course_sections(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('lecture', 'reading', 'video', 'quiz', 'other')),
  content TEXT,
  file_url VARCHAR(255),
  duration INTEGER, -- For video/audio content (in minutes)
  material_order INTEGER NOT NULL,
  points_reward INTEGER DEFAULT 0, -- EduPoints reward for completing this material
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments
CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  due_date TIMESTAMP NOT NULL,
  max_points INTEGER NOT NULL,
  assignment_type VARCHAR(50) NOT NULL CHECK (type IN ('homework', 'project', 'quiz', 'exam', 'other')),
  file_attachments JSONB,
  submission_type VARCHAR(50) NOT NULL CHECK (submission_type IN ('text', 'file', 'url', 'multiple')),
  is_graded BOOLEAN DEFAULT TRUE,
  is_group_assignment BOOLEAN DEFAULT FALSE,
  points_reward INTEGER DEFAULT 0, -- EduPoints reward for completing this assignment
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student enrollments
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped', 'failed')),
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  grade NUMERIC(5,2),
  feedback TEXT,
  points_earned INTEGER DEFAULT 0,
  blockchain_verified BOOLEAN DEFAULT FALSE,
  blockchain_tx_hash VARCHAR(66),
  UNIQUE(student_id, course_id)
);

-- Assignment submissions
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  content TEXT,
  file_url JSONB,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'late', 'graded', 'returned')),
  grade NUMERIC(5,2),
  feedback TEXT,
  points_earned INTEGER DEFAULT 0,
  blockchain_verified BOOLEAN DEFAULT FALSE,
  blockchain_tx_hash VARCHAR(66),
  UNIQUE(assignment_id, student_id)
);

-- Student progress tracking for course materials
CREATE TABLE student_progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  material_id INTEGER NOT NULL REFERENCES course_materials(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  time_spent INTEGER, -- Time spent in minutes
  points_earned INTEGER DEFAULT 0,
  blockchain_verified BOOLEAN DEFAULT FALSE,
  blockchain_tx_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, material_id)
);

-- Point transactions
CREATE TABLE point_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL CHECK (
    transaction_type IN ('enrollment', 'material_completion', 'assignment_submission', 
                        'course_completion', 'staking', 'unstaking', 'reward', 'redemption')
  ),
  related_id INTEGER, -- ID of the related item (enrollment, submission, etc.)
  related_table VARCHAR(50), -- Name of the related table
  description TEXT,
  blockchain_tx_hash VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Redemption offers (what students can spend points on)
CREATE TABLE redemption_offers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  image_url VARCHAR(255),
  quantity_available INTEGER,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  offer_type VARCHAR(50) NOT NULL CHECK (
    offer_type IN ('discount', 'merchandise', 'event_access', 'certificate', 'nft', 'other')
  ),
  offer_details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Redemption records
CREATE TABLE redemptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  offer_id INTEGER NOT NULL REFERENCES redemption_offers(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'approved', 'rejected', 'fulfilled')
  ),
  redemption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fulfillment_date TIMESTAMP,
  blockchain_tx_hash VARCHAR(66),
  fulfillment_details JSONB
);

-- DAO proposals
CREATE TABLE dao_proposals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  proposer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  proposal_type VARCHAR(50) NOT NULL CHECK (
    proposal_type IN ('curriculum', 'governance', 'funding', 'feature', 'event', 'other')
  ),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (
    status IN ('draft', 'active', 'passed', 'rejected', 'implemented')
  ),
  implementation_details TEXT,
  blockchain_proposal_id VARCHAR(66),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DAO votes
CREATE TABLE dao_votes (
  id SERIAL PRIMARY KEY,
  proposal_id INTEGER NOT NULL REFERENCES dao_proposals(id) ON DELETE CASCADE,
  voter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vote VARCHAR(10) NOT NULL CHECK (vote IN ('for', 'against', 'abstain')),
  voting_power INTEGER NOT NULL,
  comments TEXT,
  blockchain_tx_hash VARCHAR(66),
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(proposal_id, voter_id)
);

-- Notifications
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_id INTEGER, -- ID of the related item
  related_table VARCHAR(50), -- Name of the related table
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX idx_student_profiles_department_id ON student_profiles(department_id);
CREATE INDEX idx_faculty_profiles_user_id ON faculty_profiles(user_id);
CREATE INDEX idx_faculty_profiles_department_id ON faculty_profiles(department_id);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_address ON wallets(wallet_address);
CREATE INDEX idx_courses_department_id ON courses(department_id);
CREATE INDEX idx_courses_faculty_id ON courses(faculty_id);
CREATE INDEX idx_course_sections_course_id ON course_sections(course_id);
CREATE INDEX idx_course_materials_section_id ON course_materials(section_id);
CREATE INDEX idx_assignments_course_id ON assignments(course_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_submissions_assignment_id ON submissions(assignment_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX idx_student_progress_material_id ON student_progress(material_id);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_redemptions_user_id ON redemptions(user_id);
CREATE INDEX idx_redemptions_offer_id ON redemptions(offer_id);
CREATE INDEX idx_dao_proposals_proposer_id ON dao_proposals(proposer_id);
CREATE INDEX idx_dao_votes_proposal_id ON dao_votes(proposal_id);
CREATE INDEX idx_dao_votes_voter_id ON dao_votes(voter_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id); 