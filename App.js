import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Screens/Onboarding';
import Main from './Screens/MainScreen';
import Profile from './Screens/ProfileScreen';



export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setLoggedIn] = useState(true)
  
  const LoginState = async () => {
    try {
      const storedFirstName = await AsyncStorage.getItem('firstName');
      const storedEmail = await AsyncStorage.getItem('emailAddress');
      // const storedPhone = await AsyncStorage.getItem('phone');
  
      if (!storedFirstName && !storedEmail) {
        setLoggedIn(false)
        return
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
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
          <Stack.Screen name='main' component={Main} options={{ headerShown: false }} />
          
          </>
        ) : 
        <Stack.Screen name = 'welcome' component = {Onboarding} options = {{headerShown: false}} />
        }
        
        <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
