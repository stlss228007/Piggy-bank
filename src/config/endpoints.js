export const API = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    
    PIGGIES: '/piggies',
    PIGGY_BY_ID: (id) => `/piggies/${id}`,
    PIGGY_DEPOSIT: (id) => `/piggies/${id}/deposit`,
    
    WITH_TITLE: (title) => `?title=${encodeURIComponent(title)}`
}