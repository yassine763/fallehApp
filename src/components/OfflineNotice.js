// src/components/OfflineNotice.js - Offline Mode Indicator
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const OfflineNotice = ({ isOffline }) => {
  if (!isOffline) return null;

  return (
    <MotiView
      from={{ translateY: -50 }}
      animate={{ translateY: 0 }}
      exit={{ translateY: -50 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="cloud-offline" size={20} color="#FFF" />
        <Text style={styles.text}>Mode hors-ligne - Données locales</Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF9800',
    zIndex: 1000,
    paddingTop: 50,
    paddingBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default OfflineNotice;