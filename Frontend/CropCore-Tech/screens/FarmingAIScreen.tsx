import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FarmingAIScreen = () => {
  const [cropName, setCropName] = useState('');
  const [landArea, setLandArea] = useState('');
  const [previousYield, setPreviousYield] = useState('');

  const handleAddPlant = () => {
    // Implement add plant logic here
    console.log('Adding plant:', { cropName, landArea, previousYield });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.aiButton}>
          <Feather name="eye" size={24} color="#FFFFFF" />
          <Text style={styles.aiButtonText}>AI Weed Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aiButton}>
          <Feather name="box" size={24} color="#FFFFFF" />
          <Text style={styles.aiButtonText}>AI Plant Suggestion</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add a Plant</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Crop Name"
          value={cropName}
          onChangeText={setCropName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Land Area"
          value={landArea}
          onChangeText={setLandArea}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Previous Yield"
          value={previousYield}
          onChangeText={setPreviousYield}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  aiButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '48%',
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
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
    backgroundColor: '#4CAF50',
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
});

export default FarmingAIScreen;