// src/components/ScheduleCard.js - Irrigation Schedule Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const ScheduleCard = ({ time, zone, duration, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeColumn}>
        <View style={styles.timeIndicator}>
          <View style={styles.dot} />
          <View style={styles.line} />
        </View>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="#0288D1" />
          <Text style={styles.duration}>{duration}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        </View>
        
        <Text style={styles.zoneName}>{zone}</Text>
        
        <View style={styles.cardFooter}>
          <Ionicons name="water" size={16} color="#4CAF50" />
          <Text style={styles.waterAmount}>125L estimés</Text>
          
          <View style={styles.weatherIndicator}>
            <Ionicons name="sunny" size={16} color="#FFB300" />
            <Text style={styles.weatherText}>31°C</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timeColumn: {
    width: 80,
    alignItems: 'center',
  },
  timeIndicator: {
    alignItems: 'center',
    height: '100%',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#E8F5E9',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginLeft: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  duration: {
    fontSize: 14,
    color: '#0288D1',
    fontWeight: '600',
    marginLeft: 5,
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterAmount: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  weatherIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  weatherText: {
    fontSize: 12,
    color: '#F57C00',
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default ScheduleCard;