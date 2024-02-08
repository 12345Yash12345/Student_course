import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { enrollCourse } from '../store/actions';
import { fetchCourses } from '../utils/api';
import './CourseListingPage.css'; 
const CourseListingPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.enrolledCourses); 

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    getCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      (course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCourse = course => {
    setSelectedCourse(course);
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  const handleEnroll = (courseId) => {
    dispatch(enrollCourse(courseId));
    alert("Your course has been enrolled successfully!");
  };

  return (
    <div className="course-listing">
      <h1>Explore Courses</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Instructor Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="course-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p className="instructor">Instructor: {course.instructor}</p>
            <p className="description">{course.description}</p>
            <div className="details-btn-container">
              <button className="details-btn" onClick={() => handleSelectCourse(course)}>View Details</button>
            </div>
            {selectedCourse === course && (
              <div className="course-details">
                <p className="enrollment-status">Enrollment Status: {course.enrollmentStatus}</p>
                <p>Duration: {course.duration}</p>
                <p>Schedule: {course.schedule}</p>
                <p>Location: {course.location}</p>
                <p>Prerequisites: {course.prerequisites.join(', ')}</p>
                {course.syllabus && (
                  <details>
                    <summary>Syllabus</summary>
                    <ul>
                      {course.syllabus.map((topic, index) => (
                        <li key={index}>
                          <strong>Week {topic.week}:</strong> {topic.topic}
                          <p>{topic.content}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <div className="enroll-btn-container">
                  <button className="enroll-btn" onClick={() => handleEnroll(course.id)}>Enroll Now</button>
                  <button className="close-btn" onClick={handleCloseDetails}>Close</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListingPage;
