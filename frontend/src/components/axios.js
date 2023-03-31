import React from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  // baseURL: '',
});

export default instance;
