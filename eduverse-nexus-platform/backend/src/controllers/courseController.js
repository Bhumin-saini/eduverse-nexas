const db = require('../db');
const logger = require('../utils/logger');
const blockchainService = require('../services/blockchainService');

/**
 * Get all courses with pagination
 */
exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', departmentId } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT c.*, d.name as department_name, 
      (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrollment_count
      FROM courses c
      JOIN departments d ON c.department_id = d.id
      WHERE 1=1
    `;
    
    const queryParams = [];
    
    if (search) {
      query += ` AND (c.title ILIKE $${queryParams.length + 1} OR c.description ILIKE $${queryParams.length + 1})`;
      queryParams.push(`%${search}%`);
    }
    
    if (departmentId) {
      query += ` AND c.department_id = $${queryParams.length + 1}`;
      queryParams.push(departmentId);
    }
    
    // Count total records for pagination
    const countQuery = `
      SELECT COUNT(*) 
      FROM courses c
      JOIN departments d ON c.department_id = d.id
      WHERE 1=1
      ${search ? `AND (c.title ILIKE $1 OR c.description ILIKE $1)` : ''}
      ${departmentId ? `AND c.department_id = $${search ? 2 : 1}` : ''}
    `;
    
    const countParams = [];
    if (search) countParams.push(`%${search}%`);
    if (departmentId) countParams.push(departmentId);
    
    // Get count of total records
    const countResult = await db.query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);
    
    // Add pagination to main query
    query += ` ORDER BY c.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);
    
    // Execute main query
    const { rows } = await db.query(query, queryParams);
    
    return res.status(200).json({
      success: true,
      count: rows.length,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      data: rows
    });
  } catch (error) {
    logger.error('Error in getAllCourses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve courses',
      error: error.message
    });
  }
};

/**
 * Get course by ID with sections and materials
 */
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get course details
    const courseQuery = `
      SELECT c.*, d.name as department_name,
      (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) as enrollment_count
      FROM courses c
      JOIN departments d ON c.department_id = d.id
      WHERE c.id = $1
    `;
    
    const courseResult = await db.query(courseQuery, [id]);
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const course = courseResult.rows[0];
    
    // Get course sections
    const sectionsQuery = `
      SELECT * FROM course_sections
      WHERE course_id = $1
      ORDER BY section_order
    `;
    
    const sectionsResult = await db.query(sectionsQuery, [id]);
    course.sections = sectionsResult.rows;
    
    // Get materials for each section
    for (const section of course.sections) {
      const materialsQuery = `
        SELECT * FROM course_materials
        WHERE section_id = $1
        ORDER BY material_order
      `;
      
      const materialsResult = await db.query(materialsQuery, [section.id]);
      section.materials = materialsResult.rows;
    }
    
    // Get assignments for the course
    const assignmentsQuery = `
      SELECT * FROM assignments
      WHERE course_id = $1
      ORDER BY due_date
    `;
    
    const assignmentsResult = await db.query(assignmentsQuery, [id]);
    course.assignments = assignmentsResult.rows;
    
    // If the request is from a student, also get their progress
    if (req.user && req.user.role === 'student') {
      const studentId = req.user.id;
      
      // Check if enrolled
      const enrollmentQuery = `
        SELECT * FROM enrollments
        WHERE student_id = $1 AND course_id = $2
      `;
      
      const enrollmentResult = await db.query(enrollmentQuery, [studentId, id]);
      course.isEnrolled = enrollmentResult.rows.length > 0;
      
      if (course.isEnrolled) {
        // Get progress data
        const progressQuery = `
          SELECT 
            (SELECT COUNT(*) FROM course_materials cm
             JOIN course_sections cs ON cm.section_id = cs.id
             WHERE cs.course_id = $1) as total_materials,
            (SELECT COUNT(*) FROM student_progress
             WHERE student_id = $2 AND course_id = $1 AND is_completed = true) as completed_materials,
            (SELECT COUNT(*) FROM assignments
             WHERE course_id = $1) as total_assignments,
            (SELECT COUNT(*) FROM submissions s
             JOIN assignments a ON s.assignment_id = a.id
             WHERE a.course_id = $1 AND s.student_id = $2 AND s.status = 'submitted') as submitted_assignments
        `;
        
        const progressResult = await db.query(progressQuery, [id, studentId]);
        course.progress = progressResult.rows[0];
        
        // Calculate completion percentage
        const totalItems = parseInt(course.progress.total_materials) + parseInt(course.progress.total_assignments);
        const completedItems = parseInt(course.progress.completed_materials) + parseInt(course.progress.submitted_assignments);
        
        course.progress.completionPercentage = totalItems > 0 
          ? Math.round((completedItems / totalItems) * 100) 
          : 0;
      }
    }
    
    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    logger.error('Error in getCourseById:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve course details',
      error: error.message
    });
  }
};

/**
 * Create a new course
 */
exports.createCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { 
      title, 
      description, 
      department_id, 
      credit_hours, 
      start_date, 
      end_date, 
      is_active, 
      prerequisites,
      image_url,
      sections = []
    } = req.body;
    
    // Validate input
    if (!title || !description || !department_id) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and department'
      });
    }
    
    await client.query('BEGIN');
    
    // Insert course
    const courseQuery = `
      INSERT INTO courses (
        title, description, department_id, credit_hours, 
        start_date, end_date, is_active, prerequisites, image_url,
        created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    
    const courseValues = [
      title, 
      description, 
      department_id, 
      credit_hours || 3, 
      start_date, 
      end_date, 
      is_active !== undefined ? is_active : true, 
      prerequisites || [], 
      image_url || null,
      req.user.id
    ];
    
    const courseResult = await client.query(courseQuery, courseValues);
    const courseId = courseResult.rows[0].id;
    
    // Insert sections if provided
    if (sections && sections.length > 0) {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        const sectionQuery = `
          INSERT INTO course_sections (
            course_id, title, description, section_order
          )
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `;
        
        const sectionValues = [
          courseId,
          section.title,
          section.description || null,
          i + 1 // Order based on array index
        ];
        
        const sectionResult = await client.query(sectionQuery, sectionValues);
        const sectionId = sectionResult.rows[0].id;
        
        // Insert materials if provided
        if (section.materials && section.materials.length > 0) {
          for (let j = 0; j < section.materials.length; j++) {
            const material = section.materials[j];
            
            const materialQuery = `
              INSERT INTO course_materials (
                section_id, title, type, content, url, material_order
              )
              VALUES ($1, $2, $3, $4, $5, $6)
            `;
            
            const materialValues = [
              sectionId,
              material.title,
              material.type || 'text',
              material.content || null,
              material.url || null,
              j + 1 // Order based on array index
            ];
            
            await client.query(materialQuery, materialValues);
          }
        }
      }
    }
    
    await client.query('COMMIT');
    
    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: courseResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error in createCourse:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  } finally {
    client.release();
  }
};

/**
 * Update an existing course
 */
exports.updateCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      department_id, 
      credit_hours, 
      start_date, 
      end_date, 
      is_active, 
      prerequisites,
      image_url
    } = req.body;
    
    // Check if course exists
    const checkQuery = 'SELECT * FROM courses WHERE id = $1';
    const checkResult = await client.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    await client.query('BEGIN');
    
    // Update course
    const updateQuery = `
      UPDATE courses
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        department_id = COALESCE($3, department_id),
        credit_hours = COALESCE($4, credit_hours),
        start_date = COALESCE($5, start_date),
        end_date = COALESCE($6, end_date),
        is_active = COALESCE($7, is_active),
        prerequisites = COALESCE($8, prerequisites),
        image_url = COALESCE($9, image_url),
        updated_at = NOW()
      WHERE id = $10
      RETURNING *
    `;
    
    const updateValues = [
      title,
      description,
      department_id,
      credit_hours,
      start_date,
      end_date,
      is_active,
      prerequisites,
      image_url,
      id
    ];
    
    const updateResult = await client.query(updateQuery, updateValues);
    
    await client.query('COMMIT');
    
    return res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updateResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error in updateCourse:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  } finally {
    client.release();
  }
};

/**
 * Delete a course
 */
exports.deleteCourse = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { id } = req.params;
    
    // Check if course exists
    const checkQuery = 'SELECT * FROM courses WHERE id = $1';
    const checkResult = await client.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    await client.query('BEGIN');
    
    // Check if there are active enrollments
    const enrollmentQuery = 'SELECT COUNT(*) FROM enrollments WHERE course_id = $1';
    const enrollmentResult = await client.query(enrollmentQuery, [id]);
    
    if (parseInt(enrollmentResult.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course with active enrollments'
      });
    }
    
    // Delete course materials first
    await client.query(`
      DELETE FROM course_materials
      WHERE section_id IN (SELECT id FROM course_sections WHERE course_id = $1)
    `, [id]);
    
    // Delete course sections
    await client.query('DELETE FROM course_sections WHERE course_id = $1', [id]);
    
    // Delete assignments
    await client.query('DELETE FROM assignments WHERE course_id = $1', [id]);
    
    // Delete the course
    await client.query('DELETE FROM courses WHERE id = $1', [id]);
    
    await client.query('COMMIT');
    
    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error in deleteCourse:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error.message
    });
  } finally {
    client.release();
  }
};

/**
 * Enroll a student in a course
 */
exports.enrollStudent = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { courseId } = req.params;
    const studentId = req.user.id; // Assuming middleware sets req.user
    
    // Check if course exists and is active
    const courseQuery = 'SELECT * FROM courses WHERE id = $1 AND is_active = true';
    const courseResult = await client.query(courseQuery, [courseId]);
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found or not active'
      });
    }
    
    // Check if student is already enrolled
    const enrollmentQuery = 'SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2';
    const enrollmentResult = await client.query(enrollmentQuery, [studentId, courseId]);
    
    if (enrollmentResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course'
      });
    }
    
    await client.query('BEGIN');
    
    // Create enrollment
    const createQuery = `
      INSERT INTO enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    
    const createResult = await client.query(createQuery, [studentId, courseId]);
    
    // Create initial progress records for all materials
    const materialsQuery = `
      INSERT INTO student_progress (student_id, course_id, section_id, material_id, is_completed)
      SELECT $1, cs.course_id, cm.section_id, cm.id, false
      FROM course_materials cm
      JOIN course_sections cs ON cm.section_id = cs.id
      WHERE cs.course_id = $2
    `;
    
    await client.query(materialsQuery, [studentId, courseId]);
    
    // Check if student wallet exists
    const walletQuery = 'SELECT wallet_address FROM wallets WHERE user_id = $1 AND is_primary = true';
    const walletResult = await client.query(walletQuery, [studentId]);
    
    if (walletResult.rows.length > 0) {
      // Award EduPoints for enrollment via blockchain
      try {
        const walletAddress = walletResult.rows[0].wallet_address;
        const course = courseResult.rows[0];
        
        await blockchainService.awardPoints(
          walletAddress,
          "5", // 5 points for enrollment
          `Enrolled in ${course.title}`,
          0 // 0 = Academic achievement type
        );
        
        // Record transaction in database
        const txQuery = `
          INSERT INTO transactions (
            wallet_address, transaction_type, amount, description
          )
          VALUES ($1, 'enrollment_reward', 5, $2)
        `;
        
        await client.query(txQuery, [
          walletAddress,
          `Enrollment reward for course: ${course.title}`
        ]);
      } catch (error) {
        logger.error('Error awarding points for enrollment:', error);
        // Continue with enrollment even if blockchain transaction fails
      }
    }
    
    await client.query('COMMIT');
    
    return res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: createResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error in enrollStudent:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to enroll in course',
      error: error.message
    });
  } finally {
    client.release();
  }
};

/**
 * Unenroll a student from a course
 */
exports.unenrollStudent = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;
    
    // Check if enrollment exists
    const enrollmentQuery = 'SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2';
    const enrollmentResult = await client.query(enrollmentQuery, [studentId, courseId]);
    
    if (enrollmentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }
    
    await client.query('BEGIN');
    
    // Delete progress records
    await client.query(`
      DELETE FROM student_progress
      WHERE student_id = $1 AND course_id = $2
    `, [studentId, courseId]);
    
    // Delete submissions
    await client.query(`
      DELETE FROM submissions
      WHERE student_id = $1 AND assignment_id IN (
        SELECT id FROM assignments WHERE course_id = $2
      )
    `, [studentId, courseId]);
    
    // Delete enrollment
    await client.query(`
      DELETE FROM enrollments
      WHERE student_id = $1 AND course_id = $2
    `, [studentId, courseId]);
    
    await client.query('COMMIT');
    
    return res.status(200).json({
      success: true,
      message: 'Successfully unenrolled from course'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error in unenrollStudent:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to unenroll from course',
      error: error.message
    });
  } finally {
    client.release();
  }
};

/**
 * Get all courses a student is enrolled in
 */
exports.getEnrolledCourses = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    const query = `
      SELECT c.*, d.name as department_name,
      (
        SELECT ROUND(
          (COUNT(*) FILTER (WHERE sp.is_completed = true) * 100.0 / NULLIF(COUNT(*), 0))
        )
        FROM student_progress sp
        WHERE sp.student_id = e.student_id AND sp.course_id = c.id
      ) as completion_percentage,
      e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN departments d ON c.department_id = d.id
      WHERE e.student_id = $1
      ORDER BY e.enrolled_at DESC
    `;
    
    const { rows } = await db.query(query, [studentId]);
    
    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    logger.error('Error in getEnrolledCourses:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enrolled courses',
      error: error.message
    });
  }
};

/**
 * Mark a course material as completed
 */
exports.completeMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    const studentId = req.user.id;
    
    // Check if progress record exists
    const checkQuery = `
      SELECT sp.*, cm.title, cs.course_id
      FROM student_progress sp
      JOIN course_materials cm ON sp.material_id = cm.id
      JOIN course_sections cs ON cm.section_id = cs.id
      WHERE sp.student_id = $1 AND sp.material_id = $2
    `;
    
    const checkResult = await db.query(checkQuery, [studentId, materialId]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Material progress record not found'
      });
    }
    
    // Update progress
    const updateQuery = `
      UPDATE student_progress
      SET is_completed = true, completed_at = NOW()
      WHERE student_id = $1 AND material_id = $2
      RETURNING *
    `;
    
    const updateResult = await db.query(updateQuery, [studentId, materialId]);
    
    // Check if this completion deserves an award
    const progressQuery = `
      SELECT 
        (SELECT COUNT(*) FROM course_materials cm
         JOIN course_sections cs ON cm.section_id = cs.id
         WHERE cs.course_id = $1) as total_materials,
        (SELECT COUNT(*) FROM student_progress
         WHERE student_id = $2 AND course_id = $1 AND is_completed = true) as completed_materials
    `;
    
    const courseId = checkResult.rows[0].course_id;
    const progressResult = await db.query(progressQuery, [courseId, studentId]);
    const progress = progressResult.rows[0];
    
    // Calculate completion percentage
    const completionPercentage = Math.round(
      (parseInt(progress.completed_materials) / parseInt(progress.total_materials)) * 100
    );
    
    // Check for milestone completions (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    const hitMilestone = milestones.find(m => 
      completionPercentage >= m && 
      completionPercentage - (1 / parseInt(progress.total_materials) * 100) < m
    );
    
    // If a milestone was hit, award points
    if (hitMilestone) {
      try {
        // Get student wallet
        const walletQuery = 'SELECT wallet_address FROM wallets WHERE user_id = $1 AND is_primary = true';
        const walletResult = await db.query(walletQuery, [studentId]);
        
        if (walletResult.rows.length > 0) {
          const walletAddress = walletResult.rows[0].wallet_address;
          
          // Points to award based on milestone
          const pointsToAward = hitMilestone === 100 ? 20 : hitMilestone / 5;
          
          // Get course details
          const courseQuery = 'SELECT title FROM courses WHERE id = $1';
          const courseResult = await db.query(courseQuery, [courseId]);
          const courseTitle = courseResult.rows[0].title;
          
          // Award points via blockchain
          await blockchainService.awardPoints(
            walletAddress,
            pointsToAward.toString(),
            `${hitMilestone}% completion of ${courseTitle}`,
            0 // 0 = Academic achievement type
          );
          
          // Record transaction
          const txQuery = `
            INSERT INTO transactions (
              wallet_address, transaction_type, amount, description
            )
            VALUES ($1, 'course_progress', $2, $3)
          `;
          
          await db.query(txQuery, [
            walletAddress,
            pointsToAward,
            `Reached ${hitMilestone}% completion in course: ${courseTitle}`
          ]);
        }
      } catch (error) {
        logger.error('Error awarding points for milestone:', error);
        // Continue even if blockchain transaction fails
      }
    }
    
    return res.status(200).json({
      success: true,
      message: 'Material marked as completed',
      data: {
        progress: updateResult.rows[0],
        completionPercentage,
        hitMilestone: hitMilestone || null
      }
    });
  } catch (error) {
    logger.error('Error in completeMaterial:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark material as completed',
      error: error.message
    });
  }
}; 