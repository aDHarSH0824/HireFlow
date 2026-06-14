const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:80/phpdbms/HireWay/hireway/api' 
    : window.location.origin + '/api');

export default API_URL;
