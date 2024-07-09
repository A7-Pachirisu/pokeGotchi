import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:3000', // base URL 설정 (환경에 맞게 변경)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
