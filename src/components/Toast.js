// src/components/Toast.js - Custom Toast Notifications
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

const Toast = ({ visible, message, type = 'success', onHide }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const colors = {
    success: { bg: '#4CAF50', icon: 'checkmark-circle' },
    error: { bg: '#F44336', icon: 'close-circle' },
    warning: { bg: '#FF9800', icon: 'warning' },
    info: { bg: '#2196F3', icon: 'information-circle' },
  };

  const theme = colors[type];

  return (
    <MotiView
      from={{ opacity: 0, translateY: -100, scale: 0.9 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      exit={{ opacity: 0, translateY: -100, scale: 0.9 }}
      style={[styles.container, { backgroundColor: theme.bg }]}
    >
      <Ionicons name={theme.icon} size={24} color="#FFF" />
      <Text style={styles.message}>{message}</Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  message: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 12,
    fontSize: 15,
  },
});

export default Toast;