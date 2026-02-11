    // src/utils/helpers.js - Utility Functions
import { Platform, ToastAndroid, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

export const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notification', message);
  }
};

export const formatPrice = (price, currency = 'TND') => {
  return `${price.toLocaleString('fr-TN')} ${currency}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-TN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const triggerHaptic = (type = 'light') => {
  const hapticTypes = {
    light: Haptics.ImpactFeedbackStyle.Light,
    medium: Haptics.ImpactFeedbackStyle.Medium,
    heavy: Haptics.ImpactFeedbackStyle.Heavy,
    success: Haptics.NotificationFeedbackType.Success,
    error: Haptics.NotificationFeedbackType.Error,
  };

  if (type === 'success' || type === 'error') {
    Haptics.notificationAsync(hapticTypes[type]);
  } else {
    Haptics.impactAsync(hapticTypes[type]);
  }
};

export const calculateWaterSavings = (traditionalUsage, optimizedUsage) => {
  const savings = ((traditionalUsage - optimizedUsage) / traditionalUsage) * 100;
  return Math.round(savings);
};

export const getWeatherIcon = (condition) => {
  const icons = {
    sunny: 'sunny',
    cloudy: 'cloudy',
    rainy: 'rainy',
    storm: 'thunderstorm',
    partlyCloudy: 'partly-sunny',
  };
  return icons[condition] || 'help';
};