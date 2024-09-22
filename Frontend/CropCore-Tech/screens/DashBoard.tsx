import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, ViewStyle, TextStyle, TouchableOpacity, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
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
  <LinearGradient
    colors={['#00cd7c', '#00a745']} // Gradient colors
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card} // Apply gradient to the card
  >
    <Feather name={icon as any} size={24} color="#FFF" style={styles.cardIcon} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>
      {value}
      <Text style={styles.cardUnit}>{unit}</Text>
    </Text>
  </LinearGradient>
);

const Dashboard: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.BG}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Farm Dashboard</Text>
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* Handle globe button press here */}}>
            <Feather name="globe" size={24} color="#14251e" />
          </TouchableOpacity>
        </View>
        <View style={styles.primaryMetrics}>
          <MetricCard title="Temperature" value={25} unit="°C" icon="sun" />
          <MetricCard title="Precipitation" value={35} unit="mm" icon="cloud-rain" />
          <MetricCard title="Humidity" value={60} unit="%" icon="droplet" />
          <MetricCard title="Soil Moisture" value={40} unit="%" icon="filter" />
          <MetricCard title="Nitrogen" value={200} unit="ppm" icon="triangle" />
          <MetricCard title="Phosphorus" value={150} unit="ppm" icon="circle" />
          <MetricCard title="Potassium" value={180} unit="ppm" icon="square" />
          <MetricCard title="pH Level" value={6.5} unit="" icon="activity" />
        </View>

        <View style={styles.additionalFeatures}>
          <TouchableOpacity style={styles.featureButton}>
            <LinearGradient
              colors={['#00cd7c', '#00a745']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureButton}
            >
              <View style={styles.iconTextContainer}>
                <Feather name="file-text" size={24} color="#FFF" style={styles.ButtonIcon} />
                <Text style={styles.featureText}>News</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate('Chatbot')}>
            <LinearGradient
              colors={['#00cd7c', '#00a745']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureButton}
            >
              <View style={styles.iconTextContainer}>
                <Feather name="message-square" size={24} color="#FFF" style={styles.ButtonIcon} />
                <Text style={styles.featureText}>Chatbot</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

interface Styles {
  [x: string]: StyleProp<ViewStyle>;
  container: ViewStyle;
  scrollContent: ViewStyle;
  header: TextStyle;
  sectionHeader: TextStyle;
  primaryMetrics: ViewStyle;
  card: ViewStyle;
  cardIcon: TextStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  cardUnit: TextStyle;
  additionalFeatures: ViewStyle;
  featureButton: ViewStyle;
  featureText: TextStyle;
  iconTextContainer: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  scrollContent: {
    marginTop: 15,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14251e',
    marginBottom: 10,
  },
  primaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
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
    marginTop: 0,
  },
  featureButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - 60) / 2,
  },
  iconTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ButtonIcon: {
    marginBottom: 5,
  },
  featureText: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconButton: {
    padding: 5,
  },
  BG: {
    flex: 2,
    backgroundColor: '#F5F5F5',
  },
});

export default Dashboard;
