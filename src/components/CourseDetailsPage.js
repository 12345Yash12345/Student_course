import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailsPage.css'; 

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch('/courses.json');
        const data = await response.json();
        const selectedCourse = data.courses.find(course => course.id === Number(courseId));
        setCourse(selectedCourse);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>Error fetching course details: {error.message}</p>;
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="course-details">
      <h1>Course Details</h1>
      <div className="course-info">
        <h2>{course.name}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Description: {course.description}</p>
        <p>Enrollment Status: {course.enrollmentStatus}</p>
        <p>Duration: {course.duration}</p>
        <p>Schedule: {course.schedule}</p>
        <p>Location: {course.location}</p>
        <p>Prerequisites: {course.prerequisites.join(', ')}</p>
        {/* {course.syllabus && course.syllabus.length > 0 && (
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
        )} */}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
