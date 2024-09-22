import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
 import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

// Define the navigation type based on the param list
type RootStackParamList = {
    Dashboard: undefined;
    'Farming AI': undefined;
    'Motor Control': undefined;
    'Disease Detection': undefined;
    'Crop Market Trends': undefined;
    'Ecommerce': undefined;
    'Community': undefined;
};

type Navigation = NavigationProp<RootStackParamList>;

const Navbar = () => {
    const navigation = useNavigation<Navigation>();

    return (
        <View style={styles.container}>
            <View style={styles.pillContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Dashboard')}>
                    <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Farming AI')}>
                    <MaterialIcons name="yard" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Motor Control')}>
                    <MaterialCommunityIcons name="water-pump" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Ecommerce')}>
                    <MaterialCommunityIcons name="store" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Crop Market Trends')}>
                    <Octicons name="graph" size={24} color="black" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    pillContainer: {
        flexDirection: 'row',
        backgroundColor: '#E0FFFF',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: width * 0.9,
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
});

export default Navbar;
