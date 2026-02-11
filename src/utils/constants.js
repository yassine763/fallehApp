// src/utils/constants.js - App Constants
export const COLORS = {
  primary: '#1B5E20',
  secondary: '#4CAF50',
  accent: '#FF9800',
  danger: '#F44336',
  info: '#2196F3',
  warning: '#FF9800',
  success: '#4CAF50',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xl: 24,
  xxl: 32,
};

export const FONTS = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  arabic: 'NotoSansArabic-Regular',
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.lefellahintelligent.tn',
  DIAGNOSE: '/api/v1/diagnose',
  MARKET_PRICES: '/api/v1/market/prices',
  WEATHER: '/api/v1/weather',
  IRRIGATION: '/api/v1/irrigation/schedule',
};

export const STORAGE_KEYS = {
  USER: '@user',
  TOKEN: '@token',
  OFFLINE_DATA: '@offline_data',
  SETTINGS: '@settings',
};