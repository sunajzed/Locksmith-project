
import api from './../api/api';



const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error("No refresh token found in localStorage");
      throw new Error("No refresh token found");
    }

    const response = await api.post('/token/refresh/', { refresh: refreshToken });

    console.log("Refresh Token Response:", response.data);

    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh; // Ensure this is returned from backend

    if (!newAccessToken) throw new Error("No new access token received");

    localStorage.setItem('accessToken', newAccessToken);
    
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
      console.log("Updated refresh token in storage:", newRefreshToken);
    }

    return newAccessToken;
  } catch (err) {
    console.error('Error refreshing access token:', err);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
    return null;
  }
};



// Set up Axios interceptors
const setupAxiosInterceptors = () => {
  api.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the request fails with 401 and it's not a refresh token request
      if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/token/refresh/') {
        originalRequest._retry = true; // Prevent infinite loop

        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original request with new token
        }
      }

      return Promise.reject(error);
    }
  );
};

export { refreshAccessToken, setupAxiosInterceptors };