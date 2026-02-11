// src/components/CustomTabBar.js - Animated Custom Tab Bar
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    Accueil: 'home',
    Carnet: 'book-open',
    Diagnostic: 'camera',
    Prix: 'chart-line',
    Plus: 'menu',
  };

  const getIcon = (name, focused) => {
    switch (name) {
      case 'Accueil':
        return <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? '#FFF' : '#81C784'} />;
      case 'Carnet':
        return <Ionicons name={focused ? 'book' : 'book-outline'} size={24} color={focused ? '#FFF' : '#81C784'} />;
      case 'Diagnostic':
        return (
          <View style={styles.centerButton}>
            <Ionicons name="scan" size={32} color="#FFF" />
          </View>
        );
      case 'Prix':
        return <FontAwesome5 name="chart-line" size={22} color={focused ? '#FFF' : '#81C784'} />;
      case 'Plus':
        return <Ionicons name="menu" size={28} color={focused ? '#FFF' : '#81C784'} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;
            const isCenter = route.name === 'Diagnostic';

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (isCenter) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={onPress}
                  style={styles.centerButtonContainer}
                  activeOpacity={0.8}
                >
                  <MotiView
                    from={{ scale: 0.8 }}
                    animate={{ scale: isFocused ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    style={styles.centerButtonGradient}
                  >
                    {getIcon(route.name, isFocused)}
                  </MotiView>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabItem}
              >
                <MotiView
                  animate={{
                    scale: isFocused ? 1.1 : 1,
                    translateY: isFocused ? -5 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {getIcon(route.name, isFocused)}
                </MotiView>
                {isFocused && (
                  <MotiView
                    from={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={styles.indicator}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1B5E20',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  centerButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  centerButtonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 8,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFF',
  },
});

export default CustomTabBar;