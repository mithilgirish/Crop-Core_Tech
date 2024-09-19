import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView,
  Platform,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const DiseaseDetectionApp: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [galleryPermission, setGalleryPermission] = useState<boolean | null>(null);

  const requestPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraStatus.status === 'granted');

    if (Platform.OS !== 'web') {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === 'granted');
    }
  };

  const takePhoto = async () => {
    if (cameraPermission !== true) {
      Alert.alert('Permission required', 'Camera permission is required to take a photo.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    if (galleryPermission !== true) {
      Alert.alert('Permission required', 'Gallery permission is required to select a photo.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = () => {
    // This is where you would typically send the image to a backend for analysis
    Alert.alert('Analysis', 'Image analysis would be performed here.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Disease Detection App</Text>
      
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={analyzeImage}>
            <Text style={styles.buttonText}>Analyze Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {!image && (
        <TouchableOpacity 
          style={styles.getStartedButton} 
          onPress={() => {
            requestPermissions();
            takePhoto();
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}

      <View style={styles.galleryContainer}>
        <Text style={styles.galleryText}>Or choose from gallery:</Text>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  galleryContainer: {
    alignItems: 'center',
  },
  galleryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  galleryButton: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 5,
  },
});

export default DiseaseDetectionApp;