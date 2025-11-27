import axios from 'axios';

// =================================================================
// 1. Configuración Base del Cliente HTTP
// =================================================================

// Crea una instancia de Axios. Todas las llamadas en la aplicación
// usarán esta configuración.
const apiClient = axios.create({
  // URL base para todos los endpoints.
  // Si estás usando un proxy en package.json (e.g., "proxy": "http://localhost:8080"),
  // puedes dejarlo vacío o usar '/'. Si no, usa la URL de tu API Gateway.
  baseURL: '/', 
  
  headers: {
    'Content-Type': 'application/json',
  },
  // Opcional: Configura un tiempo de espera para las solicitudes
  timeout: 10000, 
});

// =================================================================
// 2. Interceptor de Solicitudes (Inyección de JWT)
// =================================================================

apiClient.interceptors.request.use(
  (config) => {
    // 💡 Paso clave: Recuperar el token de autenticación
    // Se asume que guardaste el token en localStorage al hacer login
    const token = localStorage.getItem('jwt_token'); 

    if (token) {
      // 🚀 Inyecta el token en el encabezado 'Authorization'
      // Este es el formato estándar Bearer Token que tu backend espera
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Manejo de errores de solicitud (e.g., problemas de red)
    return Promise.reject(error);
  }
);

// =================================================================
// 3. Interceptor de Respuestas (Manejo de 401/Token Expirado)
// =================================================================

apiClient.interceptors.response.use(
  (response) => {
    // Respuesta exitosa (código 2xx)
    return response;
  },
  (error) => {
    // Si la respuesta es un error 401 (Unauthorized/Token Expirado)
    if (error.response && error.response.status === 401) {
      console.error("Token JWT expirado o inválido. Redirigiendo a login.");
      
      // 🚨 Acción Crítica: Limpia el token y fuerza la redirección
      localStorage.removeItem('jwt_token');
      // window.location.href = '/login'; // Descomentar para forzar la navegación
      
      // Puedes emitir un evento global o usar un toast para notificar al usuario.
    }
    
    // Rechaza la promesa para que el error sea capturado por el hook/componente que hizo la llamada
    return Promise.reject(error);
  }
);

export default apiClient;