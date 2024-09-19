import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

interface MotorData {
  status: boolean;
  upTime: number;
  powerUsed: number;
  totalRunTime: number;
  waterUsed: number;
  motorPower: number;
  waterFlow: number;
}

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
          upTime: prevData.upTime + 1,
          powerUsed: prevData.powerUsed + 0.5,
          totalRunTime: prevData.totalRunTime + 1 / 60,
          waterUsed: prevData.waterUsed + prevData.waterFlow,
        }));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [motorData.status, motorData.waterFlow]);

  const toggleMotor = () => {
    setMotorData((prevData) => ({ ...prevData, status: !prevData.status }));
  };

  const updateMotorPower = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      setMotorData((prevData) => ({ ...prevData, motorPower: numericValue }));
    }
  };

  const updateWaterFlow = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
      setMotorData((prevData) => ({ ...prevData, waterFlow: numericValue }));
    }
  };

  const DataDisplay = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}:</Text>
      <Text style={styles.dataValue}>
        {value.toFixed(2)} {unit}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Motor Control</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Motor Status:</Text>
            <Switch value={motorData.status} onValueChange={toggleMotor} />
          </View>
          <Text style={styles.statusText}>{motorData.status ? 'ON' : 'OFF'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Motor Information</Text>
          <DataDisplay label="Up Time" value={motorData.upTime} unit="mins" />
          <DataDisplay label="Power Used" value={motorData.powerUsed} unit="kWh" />
          <DataDisplay label="Total Run Time" value={motorData.totalRunTime} unit="h" />
          <DataDisplay label="Total Water Used" value={motorData.waterUsed} unit="L" />
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Controls</Text>
          <Text style={styles.sliderLabel}>Motor Power: {motorData.motorPower.toFixed(0)}%</Text>
          <TextInput
            style={styles.textInput}
            value={motorData.motorPower.toFixed(0).toString()}
            onChangeText={updateMotorPower}
            keyboardType="numeric"
          />
          <Text style={styles.sliderLabel}>Water Flow: {motorData.waterFlow.toFixed(1)} L/s</Text>
          <TextInput
            style={styles.textInput}
            value={motorData.waterFlow.toFixed(1).toString()}
            onChangeText={updateWaterFlow}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('Notifications enabled for motor alerts.')}
        >
          <Text style={styles.buttonText}>Enable Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dataLabel: {
    fontSize: 16,
    color: '#333',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MotorControlApp;
