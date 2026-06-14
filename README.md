# HireFlow — Premium Career Platform

HireFlow is a state-of-the-art job portal web application featuring a stunning React frontend and a secure PHP API backend. It connects job seekers with employers, offering interactive application tracking, resume uploads, and robust candidate management.

---

## Key Features

### 🌟 Premium Visual Redesign
* **Dark Theme:** Engineered with modern dark aesthetics, HSL color tokens, and custom scrollbars.
* **Glassmorphism:** Elegant tables, forms, and cards powered by responsive flexbox/grid styling and backdrop blurs.
* **Micro-Animations:** Fluid transitions, scale transforms, and glowing highlights on element hover and form focus.

### 🔒 Hardened Backend Security
* **JWT Authentication:** Secure API access via HMAC-SHA256 tokens on endpoints.
* **Access Control:** Automatic context and database checks to verify that applicants and employers can only view or manage resources they own.
* **Upload Validations:** Restricts resume uploads strictly to standard extensions (`pdf`, `doc`, `docx`) with an enforced **5MB size limit** to prevent DoS attacks.
* **Clean Codebase:** Stripped out debug scripts and credential comments.

### 👔 For Job Seekers
* **Interactive Job Directory:** Browse real-time job openings in category tabs with full salary and description details.
* **Dynamic Applications:** Apply directly to positions with automated resume uploads and dynamic page-reload recovery.
* **Application Tracker:** Monitor application status in real-time using beautiful progress indicators.

### 💼 For Job Posters
* **Job Publishing Control:** Post job listings with criteria descriptions.
* **Candidate Control Center:** Verify applicant qualifications, download resumes, and update application statuses (Pending, Accepted, Rejected) securely.

---

## Tech Stack

* **Frontend:** React.js, React Router v6, Axios
* **Backend:** PHP (PDO Parameterized Queries, Native JWT Engine)
* **Database:** MySQL
* **Styling:** Vanilla CSS Custom Variables (Design Token System)

---

## Getting Started

### Prerequisites
- Node.js & npm
- PHP Web Server (e.g., XAMPP, WAMP, LAMP)
- MySQL Database

### Frontend Installation

1. Navigate to the project root directory and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and specify the API base URL:
   ```env
   REACT_APP_API_URL=http://localhost:80/phpdbms/HireWay/hireway/api
   ```

3. Launch the React development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4. To bundle the app for production:
   ```bash
   npm run build
   ```

### Backend Installation

1. Place the `api/` folder in your local web server directory (e.g., `htdocs/` for XAMPP).
2. Configure database connection parameters in [dbconnection.php](api/dbconnection.php).
3. Ensure the server has read/write permissions for the resume upload folder:
   ```bash
   chmod 755 api/uploads
   ```

---

## Project Directory Structure

```
├── src/
│   ├── components/     # Reusable UI components (Navbar, Hero, Branding, Categories)
│   ├── pages/          # Application views (Job Directory, Dashboards, Authentication)
│   ├── styles/         # Scoped modern dark CSS modules
│   ├── config.js       # Centralized API configuration loader
│   ├── App.js          # Router definition and global Axios security interceptor
│   └── index.css       # Global design variables and base resets
├── api/                # Secure PHP REST API backend
│   ├── uploads/        # Candidate resume storage directory
│   ├── auth_helper.php # Custom JWT token generation and validation middleware
│   └── *.php           # Secure database controller endpoints
├── public/             # Static page assets
└── package.json        # Node configuration and dependencies
```

---

## API Documentation

* **Authentication:**
  - `POST /api/login.php` - Authenticate credentials and retrieve a signed JWT.
  - `POST /api/users.php` - Register a new seeker or poster.

* **Job Listings:**
  - `GET /api/jobs.php` - Retrieve all active listings.
  - `GET /api/jobs.php?id={id}` - Retrieve details of a specific job listing.
  - `POST /api/post_job.php` - Publish a new job (JWT required).

* **Applications:**
  - `POST /api/apply_job.php` - Submit a candidate application and upload a resume file.
  - `GET /api/applications.php?user_email={email}` - Fetch candidate applications list (JWT required).
  - `GET /api/get_applications.php?poster_email={email}` - Fetch employer applications list (JWT required).
  - `POST /api/update_application_status.php` - Update application status (JWT required).
  - `GET /api/download_resume.php` - Securely download resume uploads (JWT required).

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
