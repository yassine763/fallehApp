// src/screens/HomeScreen.js - Premium Home Dashboard
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  FontAwesome5,
  MaterialIcons 
} from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';
import { Easing } from 'react-native-reanimated';
import WeatherWidget from '../components/WeatherWidget';
import AlertCard from '../components/AlertCard';
import QuickActionButton from '../components/QuickActionButton';
import AdviceCard from '../components/AdviceCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Sbah el khir');
    else if (hour < 17) setGreeting('Massta');
    else setGreeting('Msa el khir');
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  const features = [
    {
      id: 1,
      title: 'Conseils',
      icon: 'sprout',
      color: '#4CAF50',
      delay: 0,
    },
    {
      id: 2,
      title: 'Diagnostic',
      icon: 'camera',
      color: '#2E7D32',
      delay: 100,
      onPress: () => navigation.navigate('Diagnostic'),
    },
    {
      id: 3,
      title: 'Prix',
      icon: 'chart-line',
      color: '#FF6F00',
      delay: 200,
      onPress: () => navigation.navigate('Prix'),
    },
    {
      id: 4,
      title: 'Météo',
      icon: 'weather-partly-cloudy',
      color: '#0288D1',
      delay: 300,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Animated Header Background */}
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]}>
        <BlurView intensity={80} style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={['#1B5E20', '#2E7D32', '#388E3C']}
            style={StyleSheet.absoluteFill}
          />
        </BlurView>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#1B5E20', '#2E7D32', '#4CAF50', '#81C784']}
          style={styles.heroSection}
        >
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.logoContainer}>
                <View style={styles.logoIconWrapper}>
                  <MaterialCommunityIcons name="sprout" size={24} color="#FFF" />
                </View>
                <Text style={styles.appName}>Le Fellah Intelligent</Text>
              </View>
              <TouchableOpacity style={styles.notificationBtn}>
                <Ionicons name="notifications-outline" size={24} color="#FFF" />
                <View style={styles.badge} />
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Welcome Card */}
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200 }}
            style={styles.welcomeCard}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' }}
              style={styles.farmImage}
            />
            <View style={styles.welcomeOverlay}>
              <Text style={styles.greeting}>{greeting}, Fellah Ahmad!</Text>
              <Text style={styles.welcomeText}>
                Mölkha akhter el k hadma mabrouka!
              </Text>
              <Text style={styles.subText}>
                Voci le ciemöre ites pour ta ferme:
              </Text>
            </View>
          </MotiView>
        </LinearGradient>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.grid}>
            {features.map((feature, index) => (
              <MotiView
                key={feature.id}
                from={{ opacity: 0, scale: 0, rotate: '-180deg' }}
                animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
                transition={{
                  type: 'spring',
                  delay: feature.delay + 400,
                  damping: 15,
                }}
              >
                <QuickActionButton
                  icon={feature.icon}
                  title={feature.title}
                  color={feature.color}
                  onPress={feature.onPress}
                  delay={index}
                />
              </MotiView>
            ))}
          </View>
        </View>

        {/* Weather Alert */}
        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 800 }}
        >
          <AlertCard
            type="warning"
            title="Alerte Météo"
            message="Vague de chaleur"
            subMessage="Plan irigue su attej besa park chalitil"
            icon="sun-thermometer"
          />
        </MotiView>

        {/* Weather Widget */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1000 }}
        >
          <WeatherWidget />
        </MotiView>

        {/* Latest Advice Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Derniers Conseils</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.adviceScroll}
          >
            <AdviceCard
              image="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400"
              title="Lutter contre les Pucerons"
              description="Découvrez comment contrôler efficacement la prolifération des pucerons sur vos cultures."
              delay={0}
            />
            <AdviceCard
              image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400"
              title="Irrigation Optimale"
              description="Techniques d'économie d'eau pour l'été. Réduisez votre consommation de 30%."
              delay={150}
            />
          </ScrollView>
        </View>

        {/* Market Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prix du Marché Aujourd'hui</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Prix')}>
              <Text style={styles.seeAll}>Détails</Text>
            </TouchableOpacity>
          </View>
          
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1200 }}
            style={styles.marketPreview}
          >
            <LinearGradient
              colors={['#FFF8E1', '#FFECB3']}
              style={styles.marketCard}
            >
              <View style={styles.marketItem}>
                <FontAwesome5 name="apple-alt" size={24} color="#E65100" />
                <View style={styles.marketInfo}>
                  <Text style={styles.marketName}>Tomates</Text>
                  <Text style={styles.marketPrice}>1,750 TND/kg</Text>
                </View>
                <View style={styles.trendUp}>
                  <Ionicons name="arrow-up" size={16} color="#FFF" />
                  <Text style={styles.trendText}>+100</Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.marketItem}>
                <MaterialCommunityIcons name="barley" size={24} color="#F9A825" />
                <View style={styles.marketInfo}>
                  <Text style={styles.marketName}>Blé</Text>
                  <Text style={styles.marketPrice}>1,200 TND/kg</Text>
                </View>
                <View style={styles.trendStable}>
                  <Text style={styles.trendText}>0%</Text>
                </View>
              </View>
            </LinearGradient>
          </MotiView>
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 100,
  },
  heroSection: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconWrapper: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  welcomeCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  farmImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  welcomeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
  },
  quickActionsContainer: {
    marginTop: -30,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  seeAll: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  adviceScroll: {
    paddingRight: 20,
  },
  marketPreview: {
    marginTop: 10,
  },
  marketCard: {
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  marketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  marketInfo: {
    flex: 1,
    marginLeft: 15,
  },
  marketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 2,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  trendStable: {
    backgroundColor: '#9E9E9E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  trendText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
  },
});

export default HomeScreen;