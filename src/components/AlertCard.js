// src/components/AlertCard.js - Animated Alert Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const AlertCard = ({ type, title, message, subMessage, icon }) => {
  const colors = {
    warning: { bg: '#FFF3E0', border: '#FF9800', icon: '#F57C00' },
    danger: { bg: '#FFEBEE', border: '#F44336', icon: '#D32F2F' },
    success: { bg: '#E8F5E9', border: '#4CAF50', icon: '#388E3C' },
    info: { bg: '#E3F2FD', border: '#2196F3', icon: '#1976D2' },
  };

  const theme = colors[type] || colors.info;

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateX: -50, scale: 0.9 }}
      animate={{ opacity: 1, translateX: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      whilePress={{ scale: 0.98 }}
    >
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: theme.bg, borderLeftColor: theme.border }]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} size={32} color={theme.icon} />
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.icon }]}>{title}</Text>
            <Ionicons name="warning" size={20} color={theme.icon} />
          </View>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.subMessage}>{subMessage}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.icon} style={styles.arrow} />
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  subMessage: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  arrow: {
    marginLeft: 10,
  },
});

export default AlertCard;