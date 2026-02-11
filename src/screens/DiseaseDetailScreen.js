// src/screens/DiseaseDetailScreen.js - Detailed Disease Information
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiScrollView } from 'moti';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const DiseaseDetailScreen = ({ route, navigation }) => {
  const { diagnosis } = route.params || {
    disease: 'Mildiou',
    confidence: 94,
    severity: 'Modérée',
  };

  const treatments = [
    { name: 'Bordeaux Mixture', type: 'Biologique', effectiveness: 95, icon: 'leaf' },
    { name: 'Fongicide Cuivre', type: 'Chimique', effectiveness: 90, icon: 'spray' },
    { name: 'Bicarbonate Soude', type: 'Maison', effectiveness: 70, icon: 'home-variant' },
  ];

  const prevention = [
    'Éviter l\'arrosage par le dessus',
    'Assurer une bonne circulation d\'air',
    'Retirer les feuilles infectées',
    'Espacer les plants suffisamment',
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1B5E20', '#2E7D32']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du Diagnostic</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <MotiScrollView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Disease Header Card */}
        <MotiView
          from={{ translateY: 50, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring' }}
          style={styles.diseaseCard}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' }}
            style={styles.diseaseImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          >
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{diagnosis.confidence}%</Text>
            </View>
            <Text style={styles.diseaseName}>{diagnosis.disease}</Text>
            <View style={styles.severityRow}>
              <View style={[styles.severityBadge, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.severityText}>{diagnosis.severity}</Text>
              </View>
              <Text style={styles.scientificName}>Phytophthora infestans</Text>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="share-outline" size={24} color="#0288D1" />
            </View>
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="bookmark-outline" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Sauvegarder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="warning-outline" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Signaler</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Le mildiou est une maladie fongique qui affecte principalement les plants de tomates 
            et de pommes de terre. Elle se manifeste par des taches brunes sur les feuilles et 
            peut causer des pertes de récolte importantes si non traitée rapidement.
          </Text>
        </View>

        {/* Treatments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitements Recommandés</Text>
          {treatments.map((treatment, index) => (
            <MotiView
              key={treatment.name}
              from={{ opacity: 0, translateX: -30 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100 }}
              style={styles.treatmentCard}
            >
              <View style={[styles.treatmentIcon, { backgroundColor: index === 0 ? '#E8F5E9' : '#F5F5F5' }]}>
                <MaterialCommunityIcons 
                  name={treatment.icon} 
                  size={28} 
                  color={index === 0 ? '#4CAF50' : '#666'} 
                />
              </View>
              <View style={styles.treatmentInfo}>
                <Text style={styles.treatmentName}>{treatment.name}</Text>
                <Text style={styles.treatmentType}>{treatment.type}</Text>
                <View style={styles.effectivenessBar}>
                  <View 
                    style={[
                      styles.effectivenessFill, 
                      { width: `${treatment.effectiveness}%` },
                      index === 0 && { backgroundColor: '#4CAF50' }
                    ]} 
                  />
                </View>
                <Text style={styles.effectivenessText}>Efficacité: {treatment.effectiveness}%</Text>
              </View>
              {index === 0 && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Recommandé</Text>
                </View>
              )}
            </MotiView>
          ))}
        </View>

        {/* Prevention */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prévention</Text>
          <View style={styles.preventionCard}>
            {prevention.map((item, index) => (
              <View key={index} style={styles.preventionItem}>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                </View>
                <Text style={styles.preventionText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Expert Contact */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400 }}
          style={styles.expertCard}
        >
          <LinearGradient
            colors={['#E8F5E9', '#C8E6C9']}
            style={styles.expertGradient}
          >
            <View style={styles.expertIcon}>
              <FontAwesome5 name="user-tie" size={30} color="#1B5E20" />
            </View>
            <View style={styles.expertInfo}>
              <Text style={styles.expertTitle}>Besoin d'un expert?</Text>
              <Text style={styles.expertText}>
                Consultez un agronome certifié pour un traitement personnalisé
              </Text>
            </View>
            <TouchableOpacity style={styles.expertButton}>
              <Text style={styles.expertButtonText}>Contacter</Text>
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        {/* Related Diseases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maladies Similaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Oïdium', 'Rouille', 'Alternariose'].map((disease, index) => (
              <TouchableOpacity key={disease} style={styles.relatedCard}>
                <MaterialCommunityIcons name="leaf-off" size={32} color="#666" />
                <Text style={styles.relatedName}>{disease}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </MotiScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  diseaseCard: {
    margin: 20,
    height: 250,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  diseaseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    height: '60%',
    justifyContent: 'flex-end',
  },
  confidenceBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  confidenceText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  diseaseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  severityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  severityText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  scientificName: {
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 55,
    height: 55,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  treatmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  treatmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  treatmentType: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  effectivenessBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  effectivenessFill: {
    height: '100%',
    backgroundColor: '#81C784',
    borderRadius: 3,
  },
  effectivenessText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 5,
    fontWeight: '600',
  },
  recommendedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  recommendedText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  preventionCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  preventionText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  expertCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  expertGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  expertIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertInfo: {
    flex: 1,
    marginHorizontal: 15,
  },
  expertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  expertText: {
    fontSize: 13,
    color: '#388E3C',
  },
  expertButton: {
    backgroundColor: '#1B5E20',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  expertButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  relatedCard: {
    width: 120,
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
  },
  relatedName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default DiseaseDetailScreen;