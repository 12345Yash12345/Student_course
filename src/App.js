import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider  , useSelector} from 'react-redux';
import store from './store';
import CourseListingPage from './components/CourseListingPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import StudentDashboard from './components/StudentDashboard';

import './App.css'; 

const App = () => {
  const enrolledCourses = useSelector(state => state.enrolledCourses);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="container">
              <Link to="/" className="logo">My Courses</Link>
              <ul className="nav-links">
                <li>
                  <Link to="/">Course Listing</Link>
                </li>
                <li>
                  <Link to="/dashboard" >Dashboard {enrolledCourses.length > 0 && <span className="badge">{enrolledCourses.length}</span>}</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<CourseListingPage />} />
            <Route path="/course/:courseId" element={<CourseDetailsPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
