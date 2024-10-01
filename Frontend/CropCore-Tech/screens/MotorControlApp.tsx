import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MotorData {
  status: boolean;
  upTime: number;
  powerUsed: number;
  totalRunTime: number;
  waterUsed: number;
  motorPower: number;
  waterFlow: number;
}

const API_BASE_URL = "http://192.168.0.102:8000/motor/esp32";

const COLORS = {
  primary: '#1E88E5',
  secondary: '#3949AB',
  accent: '#00ACC1',
  background: {
    start: '#1A237E',
    end: '#121212',
  },
  card: {
    start: '#1E88E5',
    end: '#0D47A1',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0BEC5',
  },
};

const MotorControlApp: React.FC = () => {
  const [motorData, setMotorData] = useState<MotorData>({
    status: false,
    upTime: 20,
    powerUsed: 100,
    totalRunTime: 100,
    waterUsed: 1000,
    motorPower: 50,
    waterFlow: 5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (motorData.status) {
        setMotorData((prevData) => ({
          ...prevData,
          upTime: prevData.upTime + 2,
          powerUsed: prevData.powerUsed + 0.5,
          totalRunTime: prevData.totalRunTime + 1 / 60,
          waterUsed: prevData.waterUsed + prevData.waterFlow,
        }));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [motorData.status, motorData.waterFlow]);

  const toggleMotor = async () => {
    const newStatus = !motorData.status;
    setMotorData((prevData) => ({ ...prevData, status: newStatus }));

    try {
      const response = await axios.post(`${API_BASE_URL}/motor/`, {
        command: newStatus ? 'ON' : 'OFF',
      });
      Alert.alert('Success', response.data.status);
    } catch (error) {
      console.error('Error controlling motor:', error);
      Alert.alert('Error', 'Failed to control motor');
    }
  };

  const updateMotorPower = async (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      setMotorData((prevData) => ({ ...prevData, motorPower: numericValue }));
      try {
        await axios.post(`${API_BASE_URL}/motor/power/`, { motorPower: numericValue });
      } catch (error) {
        console.error('Error updating motor power:', error);
        Alert.alert('Error', 'Failed to update motor power');
      }
    } else {
      setMotorData((prevData) => ({ ...prevData, motorPower: 0 }));
    }
  };

  const updateWaterFlow = async (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
      setMotorData((prevData) => ({ ...prevData, waterFlow: numericValue }));
      try {
        await axios.post(`${API_BASE_URL}/motor/waterflow/`, { waterFlow: numericValue });
      } catch (error) {
        console.error('Error updating water flow:', error);
        Alert.alert('Error', 'Failed to update water flow');
      }
    } else {
      setMotorData((prevData) => ({ ...prevData, waterFlow: 0.0 }));
    }
  };

  const DataDisplay = ({ label, value, unit, iconName }: { label: string; value: number; unit: string; iconName: string }) => (
    <View style={styles.dataRow}>
      <View style={styles.dataLabelContainer}>
        <Icon name={iconName} size={24} color={COLORS.accent} style={styles.dataIcon} />
        <Text style={styles.dataLabel}>{label}:</Text>
      </View>
      <Text style={styles.dataValue}>
        {value.toFixed(2)} {unit}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.background.start, COLORS.background.end]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={[COLORS.card.start, COLORS.card.end]} style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Motor Control</Text>
              <Icon name="engine" size={30} color={COLORS.accent} />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Motor Status:</Text>
              <Switch
                value={motorData.status}
                onValueChange={toggleMotor}
                trackColor={{ false: COLORS.text.secondary, true: COLORS.accent }}
                thumbColor={motorData.status ? COLORS.primary : COLORS.text.primary}
              />
            </View>
            <Text style={[styles.statusText, { color: motorData.status ? COLORS.accent : COLORS.text.secondary }]}>
              {motorData.status ? 'ON' : 'OFF'}
            </Text>
          </LinearGradient>

          <LinearGradient colors={[COLORS.card.start, COLORS.card.end]} style={styles.card}>
            <Text style={styles.subtitle}>Motor Information</Text>
            <DataDisplay label="Up Time" value={motorData.upTime} unit="mins" iconName="clock-outline" />
            <DataDisplay label="Power Used" value={motorData.powerUsed} unit="kWh" iconName="flash" />
            <DataDisplay label="Total Run Time" value={motorData.totalRunTime} unit="h" iconName="timer-sand" />
            <DataDisplay label="Total Water Used" value={motorData.waterUsed} unit="L" iconName="water" />
          </LinearGradient>

          <LinearGradient colors={[COLORS.card.start, COLORS.card.end]} style={styles.card}>
            <Text style={styles.subtitle}>Controls</Text>
            <Text style={styles.sliderLabel}>Motor Power: {motorData.motorPower.toFixed(0)}%</Text>
            <TextInput
              style={styles.textInput}
              value={motorData.motorPower !== undefined ? motorData.motorPower.toFixed(0) : '0'}
              onChangeText={(value) => updateMotorPower(value)}
              keyboardType="numeric"
            />
            <Text style={styles.sliderLabel}>Water Flow: {motorData.waterFlow.toFixed(2)} L/s</Text>
            <TextInput
              style={styles.textInput}
              value={(motorData.waterFlow !== undefined ? motorData.waterFlow.toFixed(1) : '0.0')}
              onChangeText={(value) => updateWaterFlow(value)}
              keyboardType="numeric"
            />
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: 15,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.text.primary,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 10,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  dataIcon: {
    width: 24,
  },
  sliderLabel: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: COLORS.accent,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: COLORS.text.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default MotorControlApp;