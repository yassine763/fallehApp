// src/components/SkeletonLoader.js - Loading Skeletons
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

const SkeletonLoader = ({ type = 'card' }) => {
  const shimmerAnimation = {
    translateX: [-200, 200],
  };

  if (type === 'card') {
    return (
      <View style={styles.cardContainer}>
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ loop: true, duration: 1500 }}
          style={styles.skeletonCard}
        >
          <LinearGradient
            colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </MotiView>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {[1, 2, 3].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 100 }}
          style={styles.skeletonItem}
        >
          <View style={styles.skeletonCircle} />
          <View style={styles.skeletonLines}>
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLineShort} />
          </View>
        </MotiView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 20,
  },
  skeletonCard: {
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  listContainer: {
    padding: 20,
  },
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  skeletonLines: {
    flex: 1,
    marginLeft: 15,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
    width: '80%',
  },
  skeletonLineShort: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    width: '50%',
  },
});

export default SkeletonLoader;