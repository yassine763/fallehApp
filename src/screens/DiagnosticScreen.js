// src/screens/DiagnosticScreen.js - AI Disease Detection with Camera
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const DiagnosticScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isAnalyzing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isAnalyzing]);

  const takePicture = async () => {
    if (cameraRef) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const photo = await cameraRef.takePictureAsync();
      setCapturedImage(photo.uri);
      analyzeImage();
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      analyzeImage();
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosis({
        disease: 'Mildiou',
        confidence: 94,
        recommendation: 'Utilisez un fongicide cuivre',
        severity: 'Modérée',
        treatment: 'Appliquez du Bordeaux mixture',
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 3000);
  };

  const resetScan = () => {
    setCapturedImage(null);
    setDiagnosis(null);
    setIsAnalyzing(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {!capturedImage ? (
        <Camera
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)}
          type={Camera.Constants.Type.back}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.overlay}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Diagnostic</Text>
              <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>

            {/* Scanner Frame */}
            <View style={styles.scannerContainer}>
              <View style={styles.scannerFrame}>
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
                
                <View style={styles.scanArea}>
                  <Text style={styles.scanText}>Scanner votre Plante</Text>
                  <MaterialCommunityIcons name="scan-helper" size={60} color="rgba(255,255,255,0.5)" />
                </View>
              </View>
              
              <Text style={styles.instruction}>
                Placez la feuille malade bien au centre de l'écran
              </Text>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              <TouchableOpacity style={styles.galleryBtn} onPress={pickImage}>
                <Ionicons name="images" size={28} color="#FFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                <View style={styles.captureInner} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.flipBtn}>
                <Ionicons name="camera-reverse" size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          
          {isAnalyzing ? (
            <View style={styles.analyzingOverlay}>
              <MotiView
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
                style={styles.analyzingCard}
              >
                <View style={styles.scanAnimation}>
                  <Animated.View
                    style={[
                      styles.scanLine,
                      {
                        transform: [{
                          translateY: scanLineAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 200],
                          }),
                        }],
                      },
                    ]}
                  />
                  <MaterialCommunityIcons name="leaf" size={80} color="#4CAF50" />
                </View>
                <Text style={styles.analyzingText}>Analyse en cours...</Text>
                <Text style={styles.analyzingSubtext}>L'IA examine votre plante</Text>
              </MotiView>
            </View>
          ) : diagnosis ? (
            <MotiView
              from={{ translateY: height }}
              animate={{ translateY: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              style={styles.resultContainer}
            >
              <LinearGradient
                colors={['#FFF', '#F5F5F5']}
                style={styles.resultCard}
              >
                <View style={styles.resultHeader}>
                  <View style={styles.confidenceBadge}>
                    <Text style={styles.confidenceText}>{diagnosis.confidence}%</Text>
                  </View>
                  <Text style={styles.resultTitle}>{diagnosis.disease}</Text>
                  <Text style={styles.severityBadge}>{diagnosis.severity}</Text>
                </View>

                <View style={styles.recommendationSection}>
                  <MaterialCommunityIcons name="medical-bag" size={32} color="#4CAF50" />
                  <View style={styles.recommendationText}>
                    <Text style={styles.recommendationLabel}>Recommandé</Text>
                    <Text style={styles.recommendationValue}>{diagnosis.recommendation}</Text>
                  </View>
                </View>

                <View style={styles.treatmentSection}>
                  <Text style={styles.treatmentLabel}>Traitement:</Text>
                  <Text style={styles.treatmentValue}>{diagnosis.treatment}</Text>
                </View>

                <View style={styles.irrigationSection}>
                  <MaterialCommunityIcons name="water" size={24} color="#0288D1" />
                  <Text style={styles.irrigationText}>
                    Préviem mealt 15:00 a 16:00
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.detailsBtn}
                  onPress={() => navigation.navigate('DiseaseDetail', { diagnosis })}
                >
                  <Text style={styles.detailsBtnText}>Voir les détails</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetBtn} onPress={resetScan}>
                  <Text style={styles.resetBtnText}>Nouveau scan</Text>
                </TouchableOpacity>
              </LinearGradient>
            </MotiView>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerFrame: {
    width: 280,
    height: 280,
    borderRadius: 20,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 4,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    margin: 10,
  },
  scanText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  instruction: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  galleryBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
  },
  flipBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewImage: {
    width: width,
    height: height * 0.6,
    resizeMode: 'cover',
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
    elevation: 10,
  },
  scanAnimation: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 100,
    marginBottom: 20,
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4CAF50',
    elevation: 5,
  },
  analyzingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  analyzingSubtext: {
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  resultCard: {
    padding: 30,
    minHeight: 400,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  confidenceBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  confidenceText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  severityBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    color: '#FFF',
    fontWeight: '600',
    overflow: 'hidden',
  },
  recommendationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  recommendationText: {
    marginLeft: 15,
    flex: 1,
  },
  recommendationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  recommendationValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  treatmentSection: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  treatmentLabel: {
    fontSize: 14,
    color: '#E65100',
    marginBottom: 5,
    fontWeight: '600',
  },
  treatmentValue: {
    fontSize: 16,
    color: '#333',
  },
  irrigationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  irrigationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0288D1',
    fontWeight: '600',
  },
  detailsBtn: {
    backgroundColor: '#1B5E20',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },
  detailsBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resetBtn: {
    alignItems: 'center',
    padding: 10,
  },
  resetBtnText: {
    color: '#666',
    fontSize: 16,
  },
});

export default DiagnosticScreen;