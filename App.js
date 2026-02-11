// App.js - Main Entry Point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DiagnosticScreen from './src/screens/DiagnosticScreen';
import MarketScreen from './src/screens/MarketScreen';
import IrrigationScreen from './src/screens/IrrigationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiseaseDetailScreen from './src/screens/DiseaseDetailScreen';

// Components
import CustomTabBar from './src/components/CustomTabBar';
import AnimatedSplash from './src/components/AnimatedSplash';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Carnet" component={IrrigationScreen} />
      <Tab.Screen name="Diagnostic" component={DiagnosticScreen} />
      <Tab.Screen name="Prix" component={MarketScreen} />
      <Tab.Screen name="Plus" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  if (isLoading) {
    return <AnimatedSplash onFinish={() => setIsLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen 
                name="DiseaseDetail" 
                component={DiseaseDetailScreen}
                options={{
                  presentation: 'modal',
                  animationEnabled: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}