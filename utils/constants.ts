export const API_URL = 'https://simple-api-ngvw.onrender.com';

export const STORAGE_KEYS = {
  JWT_TOKEN: '@jwt_token',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/(tabs)',
  POSTS: '/(tabs)/posts',
  MY_POSTS: '/(tabs)/my-posts',
  CREATE_POST: '/(tabs)/create-post',
  USERS: '/(tabs)/users',
} as const; 