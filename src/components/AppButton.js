import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const AppButton = ({ label, onPress, variant = 'primary', size = 'md' }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.terra,
  },
  secondary: {
    backgroundColor: colors.sun,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(10,61,43,0.2)',
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
  },
  primaryLabel: {
    color: 'white',
  },
  secondaryLabel: {
    color: colors.deepGreen,
  },
  ghostLabel: {
    color: colors.deepGreen,
  },
  pressed: {
    opacity: 0.86,
  },
});
