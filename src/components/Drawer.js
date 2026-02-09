import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { screens } from '../data/screens';

export const Drawer = ({ open, onClose, onNavigate }) => {
  if (!open) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        <Text style={styles.title}>القائمة</Text>
        {/* FR: Menu */}
        {screens.drawer.map((item) => (
          <Pressable key={item.key} style={styles.item} onPress={() => onNavigate(item.key)}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            {/* FR: {item.labelFr} */}
          </Pressable>
        ))}
        <Pressable onPress={onClose} style={styles.close}>
          <Text style={styles.closeText}>إغلاق</Text>
          {/* FR: Fermer */}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.deepGreen,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10,61,43,0.08)',
  },
  itemLabel: {
    fontSize: 14,
    color: colors.ink,
  },
  close: {
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.sand,
  },
  closeText: {
    color: colors.deepGreen,
    fontWeight: '700',
  },
});
