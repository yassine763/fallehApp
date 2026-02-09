import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const AppInput = ({ label, placeholder, helper }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.ink,
    borderWidth: 1,
    borderColor: 'rgba(10,61,43,0.12)',
  },
  helper: {
    fontSize: 11,
    color: colors.muted,
  },
});
