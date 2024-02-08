import axios from 'axios';


export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const ENROLL_COURSE_REQUEST = 'ENROLL_COURSE_REQUEST';
export const ENROLL_COURSE_SUCCESS = 'ENROLL_COURSE_SUCCESS';
export const ENROLL_COURSE_FAILURE = 'ENROLL_COURSE_FAILURE';
export const DELETE_COURSE = 'DELETE_COURSE';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

export const enrollCourseRequest = () => ({
  type: ENROLL_COURSE_REQUEST
});

export const enrollCourseSuccess = (course) => ({
  type: ENROLL_COURSE_SUCCESS,
  payload: course
});

export const enrollCourseFailure = (error) => ({
  type: ENROLL_COURSE_FAILURE,
  payload: error
});

export const deleteCourse = (courseId) => ({
  type: DELETE_COURSE,
  payload: courseId
});


export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/courses.json');
      const data = response.data.courses;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};



export const enrollCourse = (courseId) => {
  return async (dispatch, getState) => {
    try {
      const { enrolledCourses } = getState(); // Modify this to match your state structure
      const response = await axios.get('/courses.json');
      const course = response.data.courses.find(course => course.id === courseId);
      const isAlreadyEnrolled = enrolledCourses.some(course => course.id === courseId);
      if (!isAlreadyEnrolled) {
        dispatch(enrollCourseSuccess(course));
      }
    } catch (error) {
      console.error('Error enrolling course:', error);
    }
  };
};