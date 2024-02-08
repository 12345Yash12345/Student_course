import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, deleteCourse } from '../store/actions';
import './StudentDashboard.css'; 


const StudentDashboard = () => {
  const enrolledCourses = useSelector(state => state.enrolledCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    console.log('Deleting course with ID:', courseId);
    dispatch(deleteCourse(courseId));
  };

  console.log('Enrolled Courses:', enrolledCourses);

  return (
    <div className="student-dashboard">
      <h1 className="dashboard-title">My Enrolled Courses</h1>
      <div className="enrolled-courses">
        {enrolledCourses.length === 0 ? (
          <p className="empty-message">No courses enrolled yet.</p>
        ) : (
          <ul className="courses-list">
            {enrolledCourses.map(course => (
              <li key={`enrolled-${course.id}`} className="course-item">
                <div className="course-info">
                  {course.thumbnail && <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />}
                  <h2 className="course-name">{course.name}</h2>
                  <p className="course-details">Instructor: {course.instructor}</p>
                  <p className="course-details">Description: {course.description}</p>
                  <p className="course-details">Enrollment Status: {course.enrollmentStatus}</p>
                  <p className="course-details">Duration: {course.duration}</p>
                  <p className="course-details">Schedule: {course.schedule}</p>
                  <p className="course-details">Location: {course.location}</p>
                  <p className="course-details">Prerequisites: {course.prerequisites.join(', ')}</p>
                  {course.syllabus && (
                    <div>
                      <details>
                        <summary className="syllabus-summary">Syllabus</summary>
                        <ul className="syllabus-list">
                          {course.syllabus.map((topic, index) => (
                            <li key={index}>
                              <strong>Week {topic.week}:</strong> {topic.topic}
                              <p>{topic.content}</p>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  )}
                  <p className="students-title">Students:</p>
                  <ul className="students-list">
                    {course.students.map(student => (
                      <li key={student.id} className="student-item">
                        {student.name} - {student.email}
                      </li>
                    ))}
                  </ul>
                  <button className="delete-btn" onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
