import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';  // Import LinearGradient from expo-linear-gradient
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const FarmingAIScreen = () => {
  const [cropName, setCropName] = useState('');
  const [landArea, setLandArea] = useState('');
  const [previousYield, setPreviousYield] = useState('');

  const handleAddPlant = () => {
    console.log('Adding plant:', { cropName, landArea, previousYield });
  };

  return (
    <View style={styles.BG}> 
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Crop Care</Text>
        
        <View style={styles.buttonContainer}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}  // Gradient colors
                start={{ x: 0, y: 0 }}           // Gradient start point
                end={{ x: 1, y: 1 }}             // Gradient end point
                style={styles.aiButton}          // Apply gradient to button style
              >
                <MaterialCommunityIcons name="seed" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Plant Suggestion</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}  // Gradient colors
                start={{ x: 0, y: 0 }}           // Gradient start point
                end={{ x: 1, y: 1 }}             // Gradient end point
                style={styles.aiButton}          // Apply gradient to button style
              >
                <FontAwesome6 name="money-bill-trend-up" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Crop yield</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>

        <View style={styles.buttonContainer}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiButton}
              >
                <FontAwesome6 name="disease" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Disease prediction</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiButton}
              >
                <FontAwesome6 name="wheat-awn" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Essential conditions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>

        <View style={styles.buttonContainer}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiButton}
              >
                <MaterialCommunityIcons name="seed-off" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Weed detection</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity>
              <LinearGradient
                colors={['#00cd7c', '#00a745']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiButton}
              >
                <MaterialCommunityIcons name="fruit-grapes" size={26} color="#FFFFFF" />
                <Text style={styles.aiButtonText}>Fruit ripeness</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: 40,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  blurContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '48%',
  },
  aiButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,  // To match the BlurView's rounded corners
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 7,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00cd7c',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  BG: {
    flex: 2,
    backgroundColor: '#F5F5F5',
  }
});

export default FarmingAIScreen;
