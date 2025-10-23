// frontend/src/api/urls.js

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://interview-ready-ai-saas.onrender.com"); // ✅ your real backend

export const BASE_URL = BACKEND_URL.replace(/\/$/, ""); // ✅ ensure no trailing slash

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions",
    GENERATE_EXPLANATION: "/api/ai/generate-explanation",
  },

  SESSION: {
    CREATE: "/api/session/create",
    GET_ALL: "/api/session/my-sessions",
    GET_ONE: (id) => `/api/session/${id}`,
    DELETE: (id) => `/api/session/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add",
    PIN: (id) => `/api/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
  },
};
