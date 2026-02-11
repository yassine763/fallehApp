// src/screens/ProfileScreen.js - User Profile & Settings
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  FontAwesome5,
  MaterialIcons 
} from '@expo/vector-icons';

const ProfileScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [offlineMode, setOfflineMode] = React.useState(false);

  const menuItems = [
    { icon: 'sprout', title: 'Mes Cultures', subtitle: '3 actives', color: '#4CAF50' },
    { icon: 'map-marker', title: 'Mes Parcelles', subtitle: '5 hectares', color: '#FF9800' },
    { icon: 'history', title: 'Historique', subtitle: '24 diagnostics', color: '#2196F3' },
    { icon: 'credit-card', title: 'Paiement', subtitle: 'Fellah Pro', color: '#9C27B0' },
    { icon: 'help-circle', title: 'Aide & Support', subtitle: 'FAQ et contact', color: '#607D8B' },
    { icon: 'share-variant', title: 'Partager', subtitle: 'Inviter un ami', color: '#00BCD4' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#388E3C']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Plus</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          style={styles.profileCard}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <View style={styles.badge}>
              <MaterialIcons name="verified" size={16} color="#4CAF50" />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ahmad Ben Ali</Text>
            <Text style={styles.role}>Agriculteur Professionnel</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#81C784" />
              <Text style={styles.location}>Béja, Tunisie</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="#FFF" />
          </TouchableOpacity>
        </MotiView>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Cultures</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>5ha</Text>
            <Text style={styles.statLabel}>Surface</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>30%</Text>
            <Text style={styles.statLabel}>Économie</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Toggles */}
        <View style={styles.togglesSection}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 200 }}
            style={styles.toggleCard}
          >
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="notifications" size={24} color="#0288D1" />
              </View>
              <View>
                <Text style={styles.toggleTitle}>Notifications</Text>
                <Text style={styles.toggleSubtitle}>Alertes prix et météo</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notifications ? '#4CAF50' : '#f4f3f4'}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 300 }}
            style={styles.toggleCard}
          >
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: '#E8EAF6' }]}>
                <Ionicons name="moon" size={24} color="#3F51B5" />
              </View>
              <View>
                <Text style={styles.toggleTitle}>Mode Sombre</Text>
                <Text style={styles.toggleSubtitle}>Interface sombre</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
            />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 400 }}
            style={styles.toggleCard}
          >
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="cloud-offline" size={24} color="#FF9800" />
              </View>
              <View>
                <Text style={styles.toggleTitle}>Mode Hors-ligne</Text>
                <Text style={styles.toggleSubtitle}>Données locales</Text>
              </View>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={offlineMode ? '#4CAF50' : '#f4f3f4'}
            />
          </MotiView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          {menuItems.map((item, index) => (
            <MotiView
              key={item.title}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 500 + index * 50 }}
            >
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                  <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#CCC" />
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Pro Banner */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 800 }}
          style={styles.proBanner}
        >
          <LinearGradient
            colors={['#FFD700', '#FFA000']}
            style={styles.proGradient}
          >
            <View style={styles.proLeft}>
              <FontAwesome5 name="crown" size={30} color="#FFF" />
              <View style={styles.proText}>
                <Text style={styles.proTitle}>Passer à Pro</Text>
                <Text style={styles.proSubtitle}>Diagnostic illimité + Alertes avancées</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.proButton}>
              <Text style={styles.proButtonText}>15 TND/mois</Text>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#F44336" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0 - Le Fellah Intelligent</Text>
      </ScrollView>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  role: {
    fontSize: 14,
    color: '#81C784',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    color: '#A5D6A7',
    marginLeft: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#A5D6A7',
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  togglesSection: {
    marginBottom: 25,
  },
  toggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggleSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  menuSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },
  menuIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  proBanner: {
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  proGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  proLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  proText: {
    marginLeft: 15,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  proSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  proButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  proButtonText: {
    color: '#FFA000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  logoutText: {
    color: '#F44336',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});

export default ProfileScreen;