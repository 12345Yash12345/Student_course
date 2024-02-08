export const fetchCourses = async () => {
    try {
      const response = await fetch('/courses.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      return data.courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  };
  