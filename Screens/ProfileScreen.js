import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
import { Appbar, Checkbox } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


export default function Profile() {
  
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState({
    orderStatus: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  // Load data from AsyncStorage
  const loadProfileData = async () => {
    try {
      const storedFirstName = await AsyncStorage.getItem('firstName');
      const storedEmail = await AsyncStorage.getItem('emailAddress');
      const storedPhone = await AsyncStorage.getItem('phone');
      const storedLastName = await AsyncStorage.getItem('lastName');
      const storedImage = await AsyncStorage.getItem('profileImage');
      const storedNotifications = await AsyncStorage.getItem('notifications');

      if (storedFirstName) setFirstName(storedFirstName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedLastName) setLastName(storedLastName);
      if (storedImage) setProfileImage(storedImage);
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  // Handle profile image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Validate and Save Profile Data
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('emailAddress', email);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('profileImage', profileImage || '');
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      
      Alert.alert('Success', 'Profile updated successfully!', 
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('main'),
          }
        ]
      );
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  // Logout and Clear AsyncStorage
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('welcome'); 
  };

  // Render user initials if no image is set
  const renderInitials = () => {
    return firstName ? firstName[0].toUpperCase() : 'U';
  };

  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.appbar}>
        <Image source={require('../assets/Images/Logo.png')} style={styles.logo} resizeMode="contain"/>
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.header}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsPlaceholder}>
              <Text style={styles.initialsText}>{renderInitials()}</Text>
            </View>
          )}
          <Pressable style={styles.changeButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Change</Text>
          </Pressable>
        </View>

        {/* Input Fields */}
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name"/>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name"/>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email"/>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone Number" keyboardType="phone-pad"/>

        {/* Email Notifications */}
        <Text style={styles.header}>Email Notifications</Text>
        {Object.keys(notifications).map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <Checkbox.Android 
              status={notifications[key] ? 'checked' : 'unchecked'} 
              onPress={() => setNotifications({ ...notifications, [key]: !notifications[key] })} 
            />
            <Text>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
          </View>
        ))}

        {/* Buttons */}
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>

        <View style={styles.buttonRow}>
          <Pressable style={styles.discardButton}>
            <Text style={styles.buttonText}>Discard Changes</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appbar: { backgroundColor: '#FFFFFF', justifyContent: 'center' },
  logo: { width: 200, height: 50 },
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  header: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  input: { backgroundColor: 'white', borderRadius: 8, padding: 10, marginVertical: 5, borderWidth: 1 },
  profileImageContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  initialsPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  initialsText: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
  changeButton: { marginLeft: 10, backgroundColor: '#495E57', padding: 5, borderRadius: 5 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  logoutButton: { backgroundColor: '#FFCC00', padding: 10, borderRadius: 5, marginVertical: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  discardButton: { backgroundColor: '#495E57', padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: '#495E57', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
});
