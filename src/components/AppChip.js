import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const tones = {
  default: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: colors.sand,
  },
  info: {
    backgroundColor: 'rgba(58,124,165,0.15)',
    color: colors.info,
  },
  warning: {
    backgroundColor: 'rgba(198,93,33,0.15)',
    color: colors.warning,
  },
};

export const AppChip = ({ label, tone = 'default' }) => {
  const toneStyle = tones[tone] || tones.default;
  return (
    <View style={[styles.chip, { backgroundColor: toneStyle.backgroundColor }]}>
      <Text style={[styles.label, { color: toneStyle.color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
