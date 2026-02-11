// src/screens/IrrigationScreen.js - Smart Irrigation Management
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { 
  MaterialCommunityIcons, 
  Ionicons, 
  FontAwesome5 
} from '@expo/vector-icons';
import CircularProgress from '../components/CircularProgress';
import ScheduleCard from '../components/ScheduleCard';

const { width } = Dimensions.get('window');

const IrrigationScreen = () => {
  const [selectedZone, setSelectedZone] = useState(1);
  const [waterUsage, setWaterUsage] = useState(125);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
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
  }, []);

  const zones = [
    { id: 1, name: 'Zone A - Tomates', moisture: 65, status: 'active', next: '15:00' },
    { id: 2, name: 'Zone B - Blé', moisture: 45, status: 'pending', next: '16:30' },
    { id: 3, name: 'Zone C - Oliviers', moisture: 80, status: 'optimal', next: '18:00' },
  ];

  const history = [
    { date: 'Aujourd\'hui', usage: '125 L', saved: '45 L', time: '2h' },
    { date: 'Hier', usage: '140 L', saved: '30 L', time: '2.5h' },
    { date: 'Avant-hier', usage: '160 L', saved: '20 L', time: '3h' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#01579B', '#0288D1', '#29B6F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Gestion de l'Irrigation</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          style={styles.mainCard}
        >
          <View style={styles.waterDrop}>
            <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]} />
            <MaterialCommunityIcons name="water" size={50} color="#FFF" />
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>2.5L</Text>
              <Text style={styles.statLabel}>Actuel</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>33L</Text>
              <Text style={styles.statLabel}>Recommandé</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>31°C</Text>
              <Text style={styles.statLabel}>Temp</Text>
            </View>
          </View>
        </MotiView>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Zone Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zones d'Irrigation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {zones.map((zone, index) => (
              <MotiView
                key={zone.id}
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
              >
                <TouchableOpacity
                  style={[
                    styles.zoneCard,
                    selectedZone === zone.id && styles.zoneCardActive,
                  ]}
                  onPress={() => setSelectedZone(zone.id)}
                >
                  <LinearGradient
                    colors={selectedZone === zone.id ? ['#4CAF50', '#2E7D32'] : ['#FFF', '#F5F5F5']}
                    style={styles.zoneGradient}
                  >
                    <View style={styles.zoneHeader}>
                      <MaterialCommunityIcons 
                        name="sprinkler" 
                        size={24} 
                        color={selectedZone === zone.id ? '#FFF' : '#666'} 
                      />
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: zone.status === 'active' ? '#4CAF50' : zone.status === 'pending' ? '#FF9800' : '#2196F3' }
                      ]} />
                    </View>
                    <Text style={[
                      styles.zoneName,
                      selectedZone === zone.id && styles.zoneTextActive,
                    ]}>
                      {zone.name}
                    </Text>
                    <View style={styles.moistureRow}>
                      <Ionicons name="water" size={16} color={selectedZone === zone.id ? '#81C784' : '#0288D1'} />
                      <Text style={[
                        styles.moistureText,
                        selectedZone === zone.id && styles.zoneTextActive,
                      ]}>
                        {zone.moisture}% Humidité
                      </Text>
                    </View>
                    <Text style={[
                      styles.nextIrrigation,
                      selectedZone === zone.id && styles.zoneTextActive,
                    ]}>
                      Prochain: {zone.next}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        {/* Smart Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Programme Intelligent</Text>
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 400 }}
          >
            <ScheduleCard
              time="15:00 - 16:00"
              zone="Zone A - Tomates"
              duration="1h"
              type="Automatique"
            />
          </MotiView>
        </View>

        {/* History & Savings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique des Arrosages</Text>
          {history.map((item, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -30 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 500 + index * 100 }}
            >
              <View style={styles.historyCard}>
                <View style={styles.historyLeft}>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <View style={styles.usageInfo}>
                    <Text style={styles.usageText}>{item.usage}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
                <View style={styles.savingsBadge}>
                  <Ionicons name="water-outline" size={16} color="#4CAF50" />
                  <Text style={styles.savingsText}>Économie: {item.saved}</Text>
                </View>
              </View>
            </MotiView>
          ))}
        </View>

        {/* AI Recommendation */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 800 }}
          style={styles.aiCard}
        >
          <LinearGradient
            colors={['#E8F5E9', '#C8E6C9']}
            style={styles.aiGradient}
          >
            <View style={styles.aiIcon}>
              <MaterialCommunityIcons name="robot" size={32} color="#1B5E20" />
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>Recommandation IA</Text>
              <Text style={styles.aiText}>
                Réduisez l'irrigation de 15% demain. Prévisions de pluie à 60%.
              </Text>
            </View>
            <TouchableOpacity style={styles.aiButton}>
              <Text style={styles.aiButtonText}>Appliquer</Text>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>
      </ScrollView>

      {/* Quick Action FAB */}
      <MotiView
        from={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1000, type: 'spring' }}
        style={styles.fabContainer}
      >
        <TouchableOpacity style={styles.fab}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            style={styles.fabGradient}
          >
            <MaterialCommunityIcons name="play" size={30} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.fabLabel}>Démarrer</Text>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  waterDrop: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pulseRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  zoneCard: {
    width: 180,
    marginRight: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  zoneCardActive: {
    transform: [{ scale: 1.02 }],
  },
  zoneGradient: {
    padding: 20,
    height: 160,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  zoneTextActive: {
    color: '#FFF',
  },
  moistureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  moistureText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  nextIrrigation: {
    fontSize: 12,
    color: '#999',
    marginTop: 'auto',
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 15,
  },
  dateText: {
    color: '#0288D1',
    fontWeight: '600',
    fontSize: 12,
  },
  usageInfo: {
    alignItems: 'center',
  },
  usageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  savingsText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 12,
  },
  aiCard: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  aiGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  aiIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  aiText: {
    fontSize: 13,
    color: '#388E3C',
    lineHeight: 18,
  },
  aiButton: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aiButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5E20',
  },
});

export default IrrigationScreen;