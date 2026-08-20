// import React, { useState } from 'react';
// import './App.css';
// import Dashboard from './components/Dashboard';
// import Profile from './components/Profile';

// function App() {
//   // Shared profile data state
//   const [profileData, setProfileData] = useState({
//     name: 'Jaanya Bagdi',
//     registrationNumber: '24BKT0029',
//     course: 'B.Tech Computer Science',
//     school: 'School of Computer Science and Engineering',
//     email: 'jaanya.bagdi2024@vitstudent.ac.in',
//     phone: '+91 7869511627',
//     profilePicture: null
//   });

//   // Navigation state
//   const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard' or 'profile'

//   // Handle profile save - updates the shared state
//   const handleSaveProfile = (updatedProfile) => {
//     setProfileData(updatedProfile);
//   };

//   // Navigate to profile page
//   const navigateToProfile = () => {
//     setCurrentPage('profile');
//   };

//   // Navigate back to dashboard
//   const navigateToDashboard = () => {
//     setCurrentPage('dashboard');
//   };

//   return (
//     <div className="App">
//       {currentPage === 'dashboard' ? (
//         <Dashboard 
//           onNavigateToProfile={navigateToProfile}
//           profileData={profileData}
//         />
//       ) : (
//         <Profile 
//           onBack={navigateToDashboard}
//           profileData={profileData}
//           onSaveProfile={handleSaveProfile}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import FacultyDashboard from './components/FacultyDashboard';
import FacProfile from './components/FacProfile';
import Register from './components/Register';

const initialStudentProfile = {
  name: 'Jaanya Bagdi',
  registrationNumber: '24BKT0029',
  course: 'B.Tech Computer Science',
  school: 'School of Computer Science and Engineering',
  email: 'jaanya.bagdi2024@vitstudent.ac.in',
  phone: '+91 7869511627',
  profilePicture: null,
};

const initialFacultyProfile = {
  name: 'Dr. Priya Sharma',
  title: 'Associate Professor',
  department: 'Dept. of Computer Science',
  email: 'priya.sharma@vit.ac.in',
  phone: '+91 98765 43210',
  office: 'Academic Building 3, Room 205',
  researchInterests: 'Machine Learning, Computer Vision, AI',
  profilePicture: null,
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [studentProfileData, setStudentProfileData] = useState(initialStudentProfile);
  const [facultyProfileData, setFacultyProfileData] = useState(initialFacultyProfile);
  const handleLogin = ({ token, user }) => {
    localStorage.setItem('vnexus_token', token);
    if (user.role === 'faculty') {
      setFacultyProfileData(user);
      setCurrentPage('facultyDashboard');
    } else {
      setStudentProfileData(user);
      setCurrentPage('studentDashboard');
    }
  };

  const renderPage = () => {
    if (currentPage === 'home') {
      return <Home onGetStarted={() => setCurrentPage('login')} />;
    }

    if (currentPage === 'login') {
      return (
        <Login
          onStudentLogin={() => setCurrentPage('studentDashboard')}
          onFacultyLogin={() => setCurrentPage('facultyDashboard')}
          onCreateAccount={() => setCurrentPage('register')}
          onLogin={handleLogin}
        />
      );
    }

    if (currentPage === 'register') {
      return <Register onSignup={handleLogin} onBackToLogin={() => setCurrentPage('login')} />;
    }

    if (currentPage === 'studentDashboard') {
      return (
        <Dashboard
          onNavigateToProfile={() => setCurrentPage('studentProfile')}
          profileData={studentProfileData}
        />
      );
    }

    if (currentPage === 'studentProfile') {
      return (
        <Profile
          onBack={() => setCurrentPage('studentDashboard')}
          profileData={studentProfileData}
          onSaveProfile={setStudentProfileData}
        />
      );
    }

    if (currentPage === 'facultyDashboard') {
      return (
        <FacultyDashboard
          onNavigateToProfile={() => setCurrentPage('facultyProfile')}
          profileData={facultyProfileData}
        />
      );
    }

    if (currentPage === 'facultyProfile') {
      return (
        <FacProfile
          onBack={() => setCurrentPage('facultyDashboard')}
          profileData={facultyProfileData}
          onSaveProfile={setFacultyProfileData}
        />
      );
    }

    return <Login onStudentLogin={() => setCurrentPage('studentDashboard')} onFacultyLogin={() => setCurrentPage('facultyDashboard')} />;
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;