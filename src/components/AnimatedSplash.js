// src/components/AnimatedSplash.js - Premium Splash Screen
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AnimatedSplash = ({ onFinish }) => {
  const progress = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(progress, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <LinearGradient
      colors={['#1B5E20', '#2E7D32', '#388E3C', '#4CAF50']}
      style={styles.container}
    >
      <MotiView
        from={{ scale: 0, rotate: '-180deg' }}
        animate={{ scale: 1, rotate: '0deg' }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={styles.logoContainer}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="leaf" size={80} color="#FFF" />
        </View>
      </MotiView>

      <MotiText
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, type: 'timing', duration: 800 }}
        style={styles.title}
      >
        Le Fellah Intelligent
      </MotiText>

      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 800, type: 'timing', duration: 800 }}
        style={styles.subtitle}
      >
        L'agriculture intelligente à portée de main
      </MotiText>

      <MotiView
        from={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1200, type: 'timing', duration: 1000 }}
        style={styles.progressContainer}
      >
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.loadingText}>Chargement...</Text>
      </MotiView>

      {/* Floating particles animation */}
      {[...Array(5)].map((_, i) => (
        <MotiView
          key={i}
          from={{ 
            opacity: 0, 
            translateY: height,
            translateX: Math.random() * width,
          }}
          animate={{ 
            opacity: [0, 1, 0],
            translateY: -100,
            translateX: Math.random() * width,
          }}
          transition={{ 
            loop: true,
            repeatReverse: false,
            duration: 3000 + i * 1000,
            delay: i * 500,
          }}
          style={[
            styles.particle,
            { left: Math.random() * width },
          ]}
        />
      ))}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 50,
  },
  progressContainer: {
    width: width * 0.6,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
    fontSize: 14,
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default AnimatedSplash;