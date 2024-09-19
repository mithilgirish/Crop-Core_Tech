import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, ViewStyle, TextStyle, TouchableOpacity, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  'Get Started': undefined;
  Dashboard: undefined;
  'Farming AI': undefined;
  'Motor Control': undefined;
  'Disease Detection': undefined;
  'Crop Market Trends': undefined;
  Chatbot: undefined;
};

type Navigation = NavigationProp<RootStackParamList>;

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon }) => (
  <View style={styles.card}>
    <Feather name={icon as any} size={24} color="#FFF" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>
      {value}<Text style={styles.cardUnit}>{unit}</Text>
    </Text>
  </View>
);

const Dashboard: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Farm Dashboard</Text>

        <View style={styles.primaryMetrics}>
          <MetricCard title="Temperature" value={25} unit="°C" icon="sun" />
          <MetricCard title="Precipitation" value={35} unit="mm" icon="cloud-rain" />
          <MetricCard title="Humidity" value={60} unit="%" icon="droplet" />
          <MetricCard title="Soil Moisture" value={40} unit="%" icon="filter" />
        </View>

        <Text style={styles.sectionHeader}>Soil Composition</Text>
        <View style={styles.secondaryMetrics}>
          <MetricCard title="Nitrogen" value={200} unit="ppm" icon="triangle" />
          <MetricCard title="Phosphorus" value={150} unit="ppm" icon="circle" />
          <MetricCard title="Potassium" value={180} unit="ppm" icon="square" />
          <MetricCard title="pH Level" value={6.5} unit="" icon="activity" />
        </View>

        <View style={styles.additionalFeatures}>
          <TouchableOpacity style={styles.featureButton}>
            <View style={styles.container}>
              <Feather name="file-text" size={24} color="#FFF" />
              <Text style={styles.featureText}>News</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Chatbot')}>
            <View style={styles.container}>
              <Feather name="message-square" size={24} color="#FFF" />
              <Text style={styles.featureText}>Chatbot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

interface Styles {
  [x: string]: StyleProp<ViewStyle>;
  container: ViewStyle;
  scrollContent: ViewStyle;
  header: TextStyle;
  sectionHeader: TextStyle;
  primaryMetrics: ViewStyle;
  secondaryMetrics: ViewStyle;
  card: ViewStyle;
  cardIcon: TextStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  cardUnit: TextStyle;
  additionalFeatures: ViewStyle;
  featureButton: ViewStyle;
  featureText: TextStyle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
  },
  primaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  secondaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: (width - 50) / 2,
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardUnit: {
    fontSize: 14,
    color: '#FFF',
  },
  additionalFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  featureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 2,
  },
  featureText: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 16,
  },
});

export default Dashboard;
