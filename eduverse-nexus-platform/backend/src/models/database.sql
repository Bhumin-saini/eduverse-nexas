-- EduVerse Platform Database Schema
-- PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (authentication)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    is_email_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Students table (profile information)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    enrollment_date DATE,
    graduation_date DATE,
    avatar_url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Wallets table (blockchain integration)
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(42) UNIQUE NOT NULL,
    is_primary BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- EduPoints transactions (cache of blockchain data)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) NOT NULL,
    transaction_hash VARCHAR(66) UNIQUE,
    transaction_type VARCHAR(50) NOT NULL,
    amount NUMERIC(20, 8) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    block_number BIGINT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_wallet FOREIGN KEY (wallet_address) REFERENCES wallets(address)
);

-- Staking records
CREATE TABLE staking_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) NOT NULL,
    transaction_hash VARCHAR(66),
    amount NUMERIC(20, 8) NOT NULL,
    duration_months INTEGER NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    reward_rate NUMERIC(10, 4) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    unstaked_at TIMESTAMP WITH TIME ZONE,
    rewards_amount NUMERIC(20, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_wallet FOREIGN KEY (wallet_address) REFERENCES wallets(address)
);

-- Redemption offers
CREATE TABLE redemption_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    points_cost NUMERIC(20, 8) NOT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    quantity_available INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Redemption records
CREATE TABLE redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    offer_id UUID NOT NULL REFERENCES redemption_offers(id),
    transaction_hash VARCHAR(66),
    points_spent NUMERIC(20, 8) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    redemption_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_offer FOREIGN KEY (offer_id) REFERENCES redemption_offers(id)
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL,
    prerequisites TEXT,
    image_url VARCHAR(255),
    syllabus_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course sections
CREATE TABLE course_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id),
    section_code VARCHAR(20) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    instructor VARCHAR(255),
    max_students INTEGER,
    room VARCHAR(100),
    schedule_info TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(course_id, section_code, semester, year)
);

-- Enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    section_id UUID NOT NULL REFERENCES course_sections(id),
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active',
    grade VARCHAR(5),
    completion_percentage INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_section FOREIGN KEY (section_id) REFERENCES course_sections(id),
    UNIQUE(student_id, section_id)
);

-- Assignments
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID NOT NULL REFERENCES course_sections(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER,
    weight NUMERIC(5, 2),
    assignment_type VARCHAR(50),
    resource_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_section FOREIGN KEY (section_id) REFERENCES course_sections(id)
);

-- Assignment submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    assignment_id UUID NOT NULL REFERENCES assignments(id),
    submission_url VARCHAR(255),
    submission_text TEXT,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'submitted',
    grade INTEGER,
    feedback TEXT,
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by UUID REFERENCES users(id),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_assignment FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);

-- Attendance records
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID NOT NULL REFERENCES enrollments(id),
    class_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    remarks TEXT,
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_enrollment FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
    UNIQUE(enrollment_id, class_date)
);

-- Achievements
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    achievement_type VARCHAR(50) NOT NULL,
    points_value NUMERIC(20, 8) NOT NULL,
    icon_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student achievements
CREATE TABLE student_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    achievement_id UUID NOT NULL REFERENCES achievements(id),
    transaction_hash VARCHAR(66),
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    awarded_by UUID REFERENCES users(id),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_achievement FOREIGN KEY (achievement_id) REFERENCES achievements(id),
    UNIQUE(student_id, achievement_id)
);

-- DAO Proposals
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proposal_type VARCHAR(50) NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    implementation_data TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Proposal votes
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID NOT NULL REFERENCES proposals(id),
    voter_address VARCHAR(42) NOT NULL,
    vote_type VARCHAR(20) NOT NULL,
    vote_weight NUMERIC(20, 8) NOT NULL,
    transaction_hash VARCHAR(66),
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_proposal FOREIGN KEY (proposal_id) REFERENCES proposals(id),
    CONSTRAINT fk_voter_wallet FOREIGN KEY (voter_address) REFERENCES wallets(address),
    UNIQUE(proposal_id, voter_address)
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Credentials (verified academic credentials)
CREATE TABLE credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    credential_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issuer VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    verification_hash VARCHAR(66) UNIQUE,
    blockchain_reference TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id)
);

-- System logs
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_student_id ON students(student_id);
CREATE INDEX idx_wallets_address ON wallets(address);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_transactions_wallet ON transactions(wallet_address);
CREATE INDEX idx_transactions_hash ON transactions(transaction_hash);
CREATE INDEX idx_staking_wallet ON staking_records(wallet_address);
CREATE INDEX idx_courses_code ON courses(course_code);
CREATE INDEX idx_courses_department ON courses(department);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_section ON enrollments(section_id);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_votes_proposal ON votes(proposal_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_credentials_student ON credentials(student_id);
CREATE INDEX idx_credentials_hash ON credentials(verification_hash);

-- Views for common queries
CREATE VIEW student_course_progress AS
SELECT 
    s.id AS student_id, 
    s.name AS student_name,
    c.id AS course_id,
    c.course_code,
    c.title AS course_title,
    e.completion_percentage,
    e.grade,
    cs.semester,
    cs.year
FROM 
    students s
JOIN 
    enrollments e ON s.id = e.student_id
JOIN 
    course_sections cs ON e.section_id = cs.id
JOIN 
    courses c ON cs.course_id = c.id;

CREATE VIEW student_wallet_balance AS
SELECT 
    s.id AS student_id, 
    s.name AS student_name,
    w.address AS wallet_address,
    COALESCE(SUM(CASE WHEN t.transaction_type = 'earned' THEN t.amount ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN t.transaction_type = 'spent' THEN t.amount ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN t.transaction_type = 'staked' AND sr.status = 'active' THEN t.amount ELSE 0 END), 0) AS available_balance,
    COALESCE(SUM(CASE WHEN sr.status = 'active' THEN sr.amount ELSE 0 END), 0) AS staked_balance,
    COALESCE(SUM(CASE WHEN t.transaction_type = 'earned' THEN t.amount ELSE 0 END), 0) AS total_earned,
    COALESCE(SUM(CASE WHEN t.transaction_type = 'spent' THEN t.amount ELSE 0 END), 0) AS total_spent
FROM 
    students s
JOIN 
    users u ON s.user_id = u.id
JOIN 
    wallets w ON u.id = w.user_id
LEFT JOIN 
    transactions t ON w.address = t.wallet_address
LEFT JOIN 
    staking_records sr ON w.address = sr.wallet_address
GROUP BY 
    s.id, s.name, w.address;

-- Trigger to update timestamp on record changes
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Apply the trigger to relevant tables
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_students_modtime BEFORE UPDATE ON students FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_courses_modtime BEFORE UPDATE ON courses FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_staking_modtime BEFORE UPDATE ON staking_records FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_offers_modtime BEFORE UPDATE ON redemption_offers FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_proposals_modtime BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_credentials_modtime BEFORE UPDATE ON credentials FOR EACH ROW EXECUTE PROCEDURE update_modified_column(); 