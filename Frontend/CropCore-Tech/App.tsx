import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import Navbar from './screens/Navbar';
import Dashboard from './screens/DashBoard';
import { StartScreen, LoginScreen, SignUpScreen } from './screens/AuthScreens';
import FarmingAIScreen from './screens/FarmingAIScreen';
import MotorControlApp from './screens/MotorControlApp';
import DiseaseDetectionApp from './screens/DiseaseDetectionApp';
import CropMarketTrends from './screens/CropMarketTrends';
import ChatbotInterface from './screens/ChatbotInterface';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ecomm from './screens/Ecommerce';
import Community from './screens/Community'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  'Farming AI': undefined;
  'Motor Control': undefined;
  'Disease Detection': undefined;
  'Crop Market Trends': undefined;
  Chatbot: undefined;
  Ecommerce:undefined;
  Community: undefined;

};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate some async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        setCurrentRoute(currentRouteName);
      }}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#e6fff9' }
          }}
        >
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Farming AI" component={FarmingAIScreen} />
          <Stack.Screen name="Motor Control" component={MotorControlApp} />
          <Stack.Screen name="Disease Detection" component={DiseaseDetectionApp} />
          <Stack.Screen name="Crop Market Trends" component={CropMarketTrends} />
          <Stack.Screen name="Chatbot" component={ChatbotInterface} />
          <Stack.Screen name="Ecommerce" component={Ecomm} />
          <Stack.Screen name="Community" component={Community}/>
        </Stack.Navigator>
        {currentRoute && currentRoute !== "Start" && currentRoute !== "Login" && currentRoute !== "SignUp" && (
          <Navbar />
        )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;