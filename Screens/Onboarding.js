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
            <Appbar.Header style = {styles.Appbar} mode = 'center-aligned'>
            <Image 
                source={require('../assets/Images/Logo.png')} 
                style={{ width: 250, height: 200 }} 
                resizeMode = "contain"/>
                
                {/* <Appbar.Content title = "Title" alignItems = 'center' /> */}
            </Appbar.Header>

            {/* Body */}
            <View style = {styles.container}>
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
    backgroundColor: '#CBD2D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Appbar: {
    backgroundColor: '#EDEFEE',
    justifyContent: 'center'
  },
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
    backgroundColor: 'white',
    height: 40,
    width: 120,
    marginVertical: 40,
    borderRadius: 8,
    padding: 10,
    fontWeight: 'bold'

  },
});

