// src/components/VoiceAssistant.js - Voice Command Interface
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VoiceAssistant = ({ isListening, onStart, onStop }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  return (
    <View style={styles.container}>
      {isListening && (
        <View style={styles.waveform}>
          {[...Array(5)].map((_, i) => (
            <MotiView
              key={i}
              from={{ height: 10 }}
              animate={{ height: [10, 40, 10] }}
              transition={{
                loop: true,
                repeatReverse: true,
                duration: 600,
                delay: i * 100,
              }}
              style={styles.waveBar}
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        onPressIn={onStart}
        onPressOut={onStop}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <LinearGradient
            colors={isListening ? ['#F44336', '#D32F2F'] : ['#4CAF50', '#2E7D32']}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name={isListening ? 'microphone' : 'microphone-outline'}
              size={40}
              color="#FFF"
            />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.hint}>
        {isListening ? 'Écoute...' : 'Appuyez et maintenez pour parler'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  waveBar: {
    width: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    marginHorizontal: 4,
  },
  buttonContainer: {
    borderRadius: 50,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default VoiceAssistant;