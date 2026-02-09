import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const tabs = [
  { key: 'home', label: 'الدار' },
  { key: 'diagnosis', label: 'تشخيص' },
  { key: 'market', label: 'أسعار' },
  { key: 'irrigation', label: 'ري' },
  { key: 'journal', label: 'دفتر' },
];

export const BottomTabs = ({ current, onChange, onOpenDrawer }) => {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onOpenDrawer} style={styles.drawerButton}>
        <Text style={styles.drawerText}>☰</Text>
      </Pressable>
      {tabs.map((tab) => {
        const active = tab.key === current;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  drawerButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.sun,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.deepGreen,
  },
  tab: {
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: colors.muted,
  },
  labelActive: {
    color: colors.terra,
    fontWeight: '700',
  },
});
