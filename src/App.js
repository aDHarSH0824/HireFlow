

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
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplyPage from './pages/ApplyPage';
import PostJobPage from './pages/PostJobPage';
import JobsPage from './pages/JobsPage';
import Navbar from './components/Navbar';
import MainSection from './components/MainSection'; // Import MainSection
import NewsSection from './components/NewsSection';
import CompaniesSection from './components/Companies';
import CategoriesSection from './components/Categories';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import JobPosterDashboard from './pages/JobPosterDashboard';
import NewsDetailPage from './pages/NewsDetailsPage';

// Configure Axios request interceptor globally
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Create a context for managing login state
export const AuthContext = createContext();

// Guard component to protect private routes
const ProtectedRoute = ({ children, allowedRole }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const App = () => {
    // Initialize state from localStorage to persist session
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
    const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || '');
    const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole, userEmail, setUserEmail }}>
            <Router>
                <Navbar /> {/* Navbar will use the login state */}
                <Routes>
                    {/* Route for Main Page */}
                    <Route path="/" element={
                        <div>
                            <MainSection />
                            <NewsSection />
                            <CompaniesSection />
                            <CategoriesSection />
                        </div>
                    } />
                    {/* Routes for other components */}
                    <Route path="/news/:id" element={<NewsDetailPage/>}/>
                    <Route path="/application-status" element={
                        <ProtectedRoute allowedRole="job_seeker">
                            <ApplicationStatusPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/JOBS" element={<JobsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/post-job" element={
                        <ProtectedRoute allowedRole="job_poster">
                            <PostJobPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/apply/:jobId" element={<ApplyPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/job-poster-dashboard" element={
                        <ProtectedRoute allowedRole="job_poster">
                            <JobPosterDashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
