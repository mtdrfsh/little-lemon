import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Screens/Onboarding';
import Main from './Screens/MainScreen';
import Profile from './Screens/ProfileScreen';




export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setLoggedIn] = useState(true)
  const [initialRouteName, setInitialRouteName] = useState('welcome');
  
  const LoginState = async () => {
    try {
      const storedFirstName = await AsyncStorage.getItem('firstName');
      const storedEmail = await AsyncStorage.getItem('emailAddress');
      // const storedPhone = await AsyncStorage.getItem('phone');
  
      if (!storedFirstName && !storedEmail) {
        setInitialRouteName('welcome');
        setLoggedIn(false)
      } else {
        setInitialRouteName('main');
        setLoggedIn(true)
      }
      console.log(isLoggedIn);
  
    } catch (error) {
      console.log('Error checking profile data:', error);
    }
  };

  useEffect(() => {
    LoginState();
  }, [])
  

  return (
    <SQLiteProvider databaseName="little_lemon">
      <NavigationContainer>
        <Stack.Navigator initialRouteName = {initialRouteName}>

            <Stack.Screen name = 'main' component={Main} options={{ headerShown: false }} />
            <Stack.Screen name = 'profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name = 'welcome' component = {Onboarding} options = {{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
