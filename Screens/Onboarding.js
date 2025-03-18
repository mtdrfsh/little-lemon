import { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Pressable } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding({navigation}) {
  const [firstName, setFirstName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [isOnboardingCompleted, setisOnboardingCompleted] = useState(false)

  const handler = async () =>{
    try {

      if(firstName.trim().length < 1 || emailAddress.trim().length < 1) {
        return  
      }

      await AsyncStorage.setItem('firstName', firstName)
      await AsyncStorage.setItem('emailAddress', emailAddress)

      setisOnboardingCompleted(true)
      await AsyncStorage.setItem('isOnboardingCompleted', JSON.stringify(isOnboardingCompleted))

      navigation.navigate(isOnboardingCompleted ? 'profile': null)
      
  } catch (error) {
    console.log('Error saving data:', error)
  }
  }

    return (
        
        <SafeAreaProvider>
            {/* Appbar */}
            <Appbar.Header style = {styles.appbar} mode = 'center-aligned'>
            <Image 
                source={require('../assets/Images/Logo.png')} 
                style={{ width: 250, height: 200 }} 
                resizeMode = "contain"/>
                
                {/* <Appbar.Content title = "Title" alignItems = 'center' /> */}
            </Appbar.Header>

            {/* Body */}
            <View style = {styles.container}>
              {/* Hero Section */}
                    <View style = {styles.heroContainer}>
                      <Text style = {styles.heroHeader}>Little Lemon</Text>
                      <Text style = {styles.heroSubHeader}>Chicago</Text>
                        <View style = {styles.heroRow}>
                          <Text style = {styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                          <Image source = {require('../assets/Images/Hero image.png')} style = {styles.heroImg}></Image>
                        </View>
                  </View>
                <Text style = {styles.header}>Let us get to know you</Text>

                <>
                <Text style = {styles.TextinputTitle}>First Name</Text>
                <TextInput 
                style = {styles.Textinput} 
                onChangeText = {(input) => setFirstName(input)}
                value = {firstName}
                ></TextInput>
                </>

                <>
                <Text style = {styles.TextinputTitle}>Email</Text>
                <TextInput 
                style = {styles.Textinput} 
                keyboardType = 'email-address'
                onChangeText = {(input) => setEmailAddress(input)}
                value = {emailAddress}
                ></TextInput>
                </>

                <Pressable style = {styles.pressable} onPress = {() => handler()}>
                    <Text style = {{textAlign: 'center' , justifyContent: 'center'}}>Next</Text>
                </Pressable>

                
            </View>
        </SafeAreaProvider>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // AppBar
  appbar: { backgroundColor: '#FFFFFF', justifyContent: 'center' },
  logo: { width: 200, height: 50 },

  // Hero Section
  heroContainer: { padding: 20, backgroundColor: '#495E57' },
  heroHeader: { fontSize: 40, fontWeight: 'bold', color: '#F4CE14' },
  heroSubHeader: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#FFFFFF' },
  heroRow: {flexDirection: 'row', justifyContent: 'space-between', gap: 4},
  heroText: { fontSize: 14, marginVertical: 1, color: '#FFFFFF', flexWrap: 'wrap', maxWidth: 180, },
  heroImg: { width: 180, height: 180, borderRadius: 10 },
  
  Textinput: {
    width: 286,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  TextinputTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334753',
  },
  header: {
    marginVertical: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334753',
  },
  pressable: {
    backgroundColor: '#F4CE14',
    height: 40,
    width: 120,
    marginVertical: 40,
    borderRadius: 8,
    padding: 10,
    fontWeight: 'bold'

  },
});

