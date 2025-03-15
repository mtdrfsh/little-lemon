import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Categories = ['Starter', 'Mains', 'Desserts', 'Drinks']

export default function Main(){
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        loadProfileImage()
    }, [])

    const loadProfileImage = async () => {

        try {
            storedProfile = await AsyncStorage.getItem('profileImage')
            setProfileImage(storedProfile)
        } catch (error) {
            console.log('Error loading profile image:', error)
        }
    }

    return (
        <SafeAreaProvider>
            {/* Appbar */}
            <Appbar.Header style={styles.appbar}>
                <Image source = {require('../assets/Images/Logo.png')} style={styles.logo} resizeMode="contain"/>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>

                        <View style={styles.profileImageContainer}>
                    
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <View style={styles.initialsPlaceholder}>
                                <Text style={styles.initialsText}>{'U'}</Text>
                                </View>
                            )}
                    </View>
                </TouchableOpacity>
                
            </Appbar.Header>

            {/* Hero Section */}
            <View style = {styles.heroContainer}>
                <Text style = {styles.heroHeader}>Little Lemon</Text>
                <Text style = {styles.heroSubHeader}>Chicago</Text>
                <View style = {styles.heroRow}>
                    <Text style = {styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    <Image source = {require('../assets/Images/Hero image.png')} style = {styles.heroImg}></Image>
                </View>
                {/* SearchBar */}
                <TextInput style = {styles.input}></TextInput>
            </View>

            {/* Menu Breakdown */}
            <View>
                <Text style = {styles.title}>ORDER FOR DELIVERY!</Text>
                {/* Categories */}
                {/* ////////////HERE//////////// */}
                <View style = {styles.heroRow}>
                    {Object.values(Categories).map((key) => (
                    <Button key = {key} style = {styles.button}
                    onPress={null}
                    >
                        <Text style = {styles.buttonText}>{key}</Text>
                    </Button>
                ))}
                </View>
                
            </View>

            {/* Menu items */}
            <View>

            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    // AppBar
    appbar: { backgroundColor: '#FFFFFF', justifyContent: 'space-between' },
    logo: { width: 200, height: 50 },
    profileImageContainer: { flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'},
    profileImage: { width: 50, height: 50, borderRadius: 40 },
    initialsPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
    initialsText: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
    // Hero Section
    heroContainer: { padding: 20, backgroundColor: '#495E57' },
    heroHeader: { fontSize: 40, fontWeight: 'bold', color: '#F4CE14' },
    heroSubHeader: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#FFFFFF' },
    heroRow: {flexDirection: 'row', justifyContent: 'space-between', gap: 4},
    heroText: { fontSize: 14, marginVertical: 1, color: '#FFFFFF', flexWrap: 'wrap', maxWidth: 180, },
    heroImg: { width: 180, height: 180, borderRadius: 10 },
    input: { backgroundColor: 'white', borderRadius: 8, padding: 10, marginVertical: 10, borderWidth: 1 },

    // Menu Breakdown
    title: { fontSize: 20, fontWeight: 'bold' , color: 'black', padding: 10 },
    button: { backgroundColor: '##EDEFEE', padding: 4, borderRadius: 20, margin: 10 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
    buttonText: { color: '#495E57', textAlign: 'center' },
  });
  