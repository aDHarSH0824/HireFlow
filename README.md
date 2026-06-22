# HireFlow — Premium Career Platform

HireFlow is a state-of-the-art job portal web application featuring a stunning React frontend and a secure PHP API backend. It connects job seekers with employers, offering interactive application tracking, resume uploads, and robust candidate management.

**Live Application:** [https://hire-flow-uefl.vercel.app/](https://hire-flow-uefl.vercel.app/)
**Live API Endpoint:** [https://hireflow-api-wt5b.onrender.com/](https://hireflow-api-wt5b.onrender.com/)

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

### 1. Prerequisites
- **Node.js** & **npm**
- **Apache Web Server** (with PHP support enabled)
- **MySQL Database Server**

### 2. Frontend Installation & Startup
1. Navigate to the project root directory and install npm packages:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory and specify your backend API base URL:
   ```env
   REACT_APP_API_URL=http://localhost:80/phpdbms/HireWay/hireway/api
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to access the app in your browser.

### 3. Local Backend Setup (Ubuntu/Debian)
1. Install Apache, PHP, MySQL, and the Apache PHP integration module:
   ```bash
   sudo apt-get update
   sudo apt-get install -y php php-mysql mysql-server php-xml php-mbstring libapache2-mod-php
   ```
2. Start the MySQL service and set up your database and user privileges:
   ```bash
   sudo systemctl start mysql
   sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS hireway;"
   sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''; FLUSH PRIVILEGES;"
   ```
3. Import the database schema from the project root:
   ```bash
   sudo mysql -u root hireway < database_schema.sql
   ```
4. Adjust directory search permissions on your home directory so that Apache's `www-data` user can follow symlinks to your project folder:
   ```bash
   chmod o+x /home/harsh
   chmod o+x /home/harsh/Documents
   chmod o+x /home/harsh/Documents/HireFlow
   chmod -R o+rX /home/harsh/Documents/HireFlow/api
   ```
5. Create the Apache folder structure and create a symlink to your development API directory so edits are immediately live:
   ```bash
   sudo mkdir -p /var/www/html/phpdbms/HireWay/hireway
   sudo ln -sfn /home/harsh/Documents/HireFlow/api /var/www/html/phpdbms/HireWay/hireway/api
   ```
6. Restart the Apache server to load the configurations:
   ```bash
   sudo systemctl restart apache2
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
