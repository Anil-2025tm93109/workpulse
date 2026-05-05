import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Standups
export const submitStandup = (data) => API.post('/standups', data);
export const getMyStandups = () => API.get('/standups/me');
export const getTodayStandups = () => API.get('/standups/today');
export const getTeamStandups = () => API.get('/standups/team');

// Blockers
export const getMyBlockers = () => API.get('/blockers/me');
export const getAllBlockers = () => API.get('/blockers');
export const getOpenBlockers = () => API.get('/blockers/open');
export const resolveBlocker = (id) => API.patch(`/blockers/${id}/resolve`);

// Dashboard
export const getDashboard = () => API.get('/dashboard');