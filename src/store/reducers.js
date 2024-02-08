import { FETCH_DATA_SUCCESS, ENROLL_COURSE_SUCCESS, DELETE_COURSE } from './actions';

const initialState = {
  availableCourses: [],
  enrolledCourses: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        availableCourses: action.payload
      };
      case ENROLL_COURSE_SUCCESS:
        const { enrolledCourses } = state;
        const enrolledCourse = action.payload;
        const isAlreadyEnrolled = enrolledCourses.some(course => course.id === enrolledCourse.id);
        if (isAlreadyEnrolled) {
          return state;
        }
        return {
          ...state,
          enrolledCourses: [...state.enrolledCourses, enrolledCourse]
        };
    case DELETE_COURSE:
      return {
        ...state,
        availableCourses: state.availableCourses.filter(course => course.id !== action.payload),
        enrolledCourses: state.enrolledCourses.filter(course => course.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
