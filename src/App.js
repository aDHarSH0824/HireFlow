

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// // Importing your previous components
// import LoginPage from './pages/LoginPage'; // Login page component
// import RegisterPage from './pages/RegisterPage'; // Register page component
// import ApplyPage from './pages/ApplyPage';
// // Main page components
// import PostJobPage from './pages/PostJobPage';
// import JobsPage from './pages/JobsPage';
// import Navbar from './components/Navbar';
// import NewsSection from './components/NewsSection';
// import CompaniesSection from './components/Companies';
// import CategoriesSection from './components/Categories';
// import ApplicationStatusPage from './pages/ApplicationStatusPage';
// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 {/* Route for Main Page */}
//                 <Route path="/" element={
//                     <div>
//                         <Navbar />
//                         <NewsSection />
//                         <CompaniesSection />
//                         <CategoriesSection />
//                     </div>
//                 } />

//                 {/* Route for Login */}
//                 <Route path="/application-status" element={<ApplicationStatusPage />} />
//                 <Route path="/JOBS" element={<JobsPage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/post-job" element={<PostJobPage />} />
//                 <Route path="/apply/:jobId" element={<ApplyPage />} />
//                 {/* Route for Register */}
//                 <Route path="/register" element={<RegisterPage />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;


import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplyPage from './pages/ApplyPage';
import PostJobPage from './pages/PostJobPage';
import JobsPage from './pages/JobsPage';
import Navbar from './components/Navbar';
import NewsSection from './components/NewsSection';
import CompaniesSection from './components/Companies';
import CategoriesSection from './components/Categories';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import JobPosterDashboard from './pages/JobPosterDashboard';
import NewsDetailPage from './pages/NewsDetailsPage';
// Create a context for managing login state
export const AuthContext = createContext();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [userRole, setUserRole] = useState(''); // Track user role (optional)
    const[userEmail,setUserEmail]=useState('');
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole,userEmail,setUserEmail }}>
            <Router>
                <Navbar /> {/* Navbar will use the login state */}
                <Routes>
                    {/* Route for Main Page */}
                    <Route path="/" element={
                        <div>
                            <NewsSection />
                            <CompaniesSection />
                            <CategoriesSection />
                        </div>
                    } />
                    {/* Routes for other components */}
                    <Route path="/news/:id" element={<NewsDetailPage/>}/>
                    <Route path="/application-status" element={<ApplicationStatusPage />} />
                    <Route path="/JOBS" element={<JobsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/post-job" element={<PostJobPage />} />
                    <Route path="/apply/:jobId" element={<ApplyPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/job-poster-dashboard" element={<JobPosterDashboard />} />

                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
