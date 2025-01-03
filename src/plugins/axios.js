import axios from 'axios';

// Set base URL
axios.defaults.baseURL = 'http://localhost:3000/api'; // Replace with your API base URL

// Set default headers
// axios.defaults.headers.common['Authorization'] = `Bearer YOUR_TOKEN`; // Replace with logic to fetch the token dynamically, if needed (might needed later on)
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add interceptors for requests
axios.interceptors.request.use(
  config => {
    // Modify the request before sending it
    console.log('Request sent:', config);
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add interceptors for responses
axios.interceptors.response.use(
  response => {
    // Process the response
    return response;
  },
  error => {
    // Handle response errors
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axios;
