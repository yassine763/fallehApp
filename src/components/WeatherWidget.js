// src/components/WeatherWidget.js - Animated Weather Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherWidget = () => {
  const forecast = [
    { day: 'Lun', icon: 'sunny', temp: '32°', color: '#FFB300' },
    { day: 'Mar', icon: 'partly-sunny', temp: '30°', color: '#FB8C00' },
    // src/components/WeatherWidget.js (continued)
    { day: 'Mer', icon: 'cloudy', temp: '28°', color: '#757575' },
    { day: 'Jeu', icon: 'rainy', temp: '26°', color: '#0288D1' },
    { day: 'Ven', icon: 'sunny', temp: '31°', color: '#FFB300' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E3F2FD', '#BBDEFB']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={20} color="#0288D1" />
            <Text style={styles.location}>Béja, Tunisie</Text>
          </View>
          <Text style={styles.date}>Aujourd'hui, 10 Février</Text>
        </View>

        <View style={styles.mainWeather}>
          <MotiView
            from={{ rotate: '0deg' }}
            animate={{ rotate: '360deg' }}
            transition={{ loop: true, duration: 10000 }}
          >
            <Ionicons name="sunny" size={80} color="#FFB300" />
          </MotiView>
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>31°C</Text>
            <Text style={styles.condition}>Ensoleillé</Text>
            <Text style={styles.humidity}>Humidité: 45%</Text>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          {forecast.map((day, index) => (
            <MotiView
              key={day.day}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100 }}
              style={styles.forecastItem}
            >
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Ionicons 
                name={day.icon} 
                size={24} 
                color={day.color} 
              />
              <Text style={styles.forecastTemp}>{day.temp}</Text>
            </MotiView>
          ))}
        </View>

        <View style={styles.irrigationAlert}>
          <MaterialCommunityIcons name="water-alert" size={24} color="#0288D1" />
          <Text style={styles.irrigationText}>
            Conseil: Irriguer tôt le matin (6h-8h)
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#01579B',
    marginLeft: 5,
  },
  date: {
    fontSize: 14,
    color: '#0277BD',
    marginTop: 5,
  },
  mainWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  tempContainer: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#01579B',
  },
  condition: {
    fontSize: 20,
    color: '#0288D1',
    marginTop: 5,
  },
  humidity: {
    fontSize: 14,
    color: '#29B6F6',
    marginTop: 5,
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  forecastItem: {
    alignItems: 'center',
  },
  forecastDay: {
    fontSize: 14,
    color: '#01579B',
    marginBottom: 5,
    fontWeight: '600',
  },
  forecastTemp: {
    fontSize: 16,
    color: '#0288D1',
    marginTop: 5,
    fontWeight: 'bold',
  },
  irrigationAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 136, 209, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0288D1',
  },
  irrigationText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#01579B',
    fontWeight: '500',
  },
});

export default WeatherWidget;