# HireWay - Job Portal Application

A comprehensive job portal application with React frontend and PHP backend that connects job seekers with employers.

## Features

- **For Job Seekers:**
  - Browse available jobs
  - Apply for positions with resume upload
  - Track application status
  - User authentication and registration

- **For Job Posters:**
  - Post job listings
  - Manage applications
  - Review candidate resumes
  - Update application status

## Tech Stack

- **Frontend:** React.js
- **Backend:** PHP
- **Database:** MySQL
- **File Handling:** Resume upload and download functionality

## Getting Started

### Prerequisites
- Node.js and npm
- PHP server (XAMPP/WAMP/LAMP)
- MySQL database

### Frontend Setup

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Backend Setup

1. Place the `api` folder in your web server directory
2. Configure database connection in `api/dbconnection.php`
3. Set up the database with required tables
4. Ensure proper permissions for the `api/uploads/` directory

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/         # Application pages
│   └── styles/        # CSS styling files
├── api/               # PHP backend files
│   ├── uploads/       # Resume file storage
│   └── *.php         # API endpoints
└── public/           # Public assets
```

## API Endpoints

- `POST /api/login.php` - User authentication
- `POST /api/users.php` - User registration
- `GET /api/jobs.php` - Fetch job listings
- `POST /api/post_job.php` - Create new job posting
- `POST /api/apply_job.php` - Submit job application
- `GET /api/applications.php` - Fetch user applications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
