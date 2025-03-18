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
    const [menu, setMenu] = useState([])

    useEffect(() => {
        loadProfileImage()
        fetchMenu()
    }, [])

    const loadProfileImage = async () => {

        try {
            storedProfile = await AsyncStorage.getItem('profileImage')
            setProfileImage(storedProfile)
        } catch (error) {
            console.log('Error loading profile image:', error)
        }
    }

    const fetchMenu = async () => {
        const baseImageUrl = 'https://github.com/mtdrfsh/little-lemon/tree/master/assets/Images/'
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        const responseJson = await response.json()
        const updatedMenu = responseJson.menu.map(item => ({
            ...item,
            image: baseImageUrl + item.image + '?raw=true'
        }))
        setMenu(updatedMenu)
        console.log(updatedMenu[4])
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
                    onPress={fetchMenu}
                    >
                        <Text style = {styles.buttonText}>{key}</Text>
                    </Button>
                ))}
                </View>
                
            </View>

            {/* Menu items */}
            
                <FlatList
                data = {menu}
                keyExtractor = {(item,index) => index.toString()}
                renderItem = {({item}) => (
                    <View style = {styles.card}>
                        <View style = {styles.infoCard}>
                        <Text style = {styles.nameStyle}>{item.name}</Text>
                        <Text style = {styles.descriptionStyle}>{item.description}</Text>
                        <Text style = {styles.priceStyle}>${item.price}</Text>
                        </View>
                        <Image 
                        style = {styles.cardImg}
                        source = {item.image}
                        />
                    </View>
                )}
                >
                    
                </FlatList>
    
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
    button: { backgroundColor: '#black', padding: 4, borderRadius: 20, margin: 10 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
    buttonText: { fontSize: 12 , color: '#495E57', textAlign: 'center' },

    // Menu items
    card: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center' },
    infoCard: { flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 10, borderRadius: 10, maxWidth: 190, },
    nameStyle: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    descriptionStyle: { fontSize: 14, fontWeight: 'regular', color: 'black' },
    priceStyle: { fontSize: 15, fontWeight: 'bold', color: 'black' },
    cardImg: { width: 120, height: 120, borderRadius: 10 },
  });
  