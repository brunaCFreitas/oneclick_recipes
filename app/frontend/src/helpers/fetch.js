import axios from 'axios';
import { readObject, saveObject } from './localStorage';
import { saveUser } from '../services/userLS';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

export const setToken = () => {
  const token = readObject('token', '');
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  setToken();
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  setToken();
  try {
    const { data } = await api.post(endpoint, body);
    if (data.token) {
      saveObject('token', data.token);
      saveUser(data.email);
    }
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const postData = async (endpoint, body) => {
  setToken();
  try {
    await api.post(endpoint, body);
  } catch (error) {
    console.log(error.response);
  }
};

export const deleteData = async (endpoint) => {
  setToken();
  try {
    await api.delete(endpoint);
  } catch (e) {
    console.log(e.response.data);
  }
};

export const updateInProgress = async (endpoint, body) => {
  setToken();
  try {
    const { data } = await api.patch(endpoint, body);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const finishInProgress = async (endpoint, body) => {
  setToken();
  try {
    await api.post(endpoint, body);
  } catch (e) {
    console.log(e);
  }
};

export default api;
