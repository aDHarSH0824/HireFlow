// import React from "react";
// import { Link } from 'react-router-dom';
// import "../styles/nav.css";

// const Navbar = () => {
//   return (
//     <nav>
//       <div className="logo">HireWay</div>
//       <ul>
//       <li><Link to="/JOBS">Jobs</Link></li>
//       <li><Link to="/application-status">Application Status</Link></li>
//         <li><Link to="/post-job">Post a Job</Link></li>
//       </ul>
//       <div>
//       <ul>
//         <li>
//           <Link to="/login" className="nav-link">Login</Link>
//         </li>
//         <li>
//           <Link to="/register" className="nav-link">Register</Link>
//         </li>
//       </ul>
//             </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Import AuthContext
import "../styles/nav.css";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn, userRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Update login state
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav>
            <div className="logo">HireWay</div>
            <ul>
                <li><Link to="/JOBS">Jobs</Link></li>
                {isLoggedIn && userRole == 'job_seeker' && (
                    <React.Fragment>
                                       <li><Link to="/application-status">Application Status</Link></li>
                    </React.Fragment>
                )}
                {isLoggedIn && userRole == 'job_poster' && (
                    <React.Fragment>
                        <li><Link to="/post-job">Post a Job</Link></li>
                        <li><Link to="/Job-poster-dashboard">Verify Applications</Link></li> {/* New link added */}
                    </React.Fragment>
                )}
            </ul>
            <div>
                <ul>
                    {isLoggedIn ? (
                        <li>
                            <button className="nav-link" onClick={handleLogout}>Logout</button>
                        </li>
                    ) : (
                        <>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                            <li><Link to="/register" className="nav-link">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
