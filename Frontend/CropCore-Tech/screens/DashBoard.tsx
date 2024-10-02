import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Modal, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Map from './Map';
import Menubar from './Menubar';

const { width } = Dimensions.get('window');

// Updated color palette
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
  menu: {
    background: '#121212',
    itemBorder: '#1F1F1F',
    header: {
      start: '#3949AB',
      end: '#1A237E',
    },
  },
};

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Feather.glyphMap;
}

type DashboardScreenNavigationProp = NavigationProp<ParamListBase>;

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon }) => (
  <LinearGradient colors={[COLORS.card.start, COLORS.card.end]} style={styles.metricCard}>
    <Feather name={icon} size={24} color={COLORS.text.primary} />
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>
      {value}
      <Text style={styles.metricUnit}>{unit}</Text>
    </Text>
  </LinearGradient>
);

const Dashboard: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const toggleMenu = (): void => {
    setMenuVisible((prev) => !prev);
  };

  const toggleChatbot = (): void => {
    navigation.navigate('Chatbot');
  };

  const scrollingMetrics: (MetricCardProps & { id: string })[] = [
    { id: '1', title: "Nitrogen", value: 180, unit: "ppm", icon: "droplet" },
    { id: '2', title: "Phosphorus", value: 150, unit: "ppm", icon: "droplet" },
    { id: '3', title: "Potassium", value: 180, unit: "ppm", icon: "droplet" },
    { id: '4', title: "pH", value: 6.5, unit: "", icon: "activity" },
    { id: '5', title: "Soil Moisture", value: 40, unit: "%", icon: "droplet" },
  ];

  const renderScrollingMetric = ({ item }: { item: MetricCardProps & { id: string } }) => (
    <LinearGradient colors={[COLORS.card.start, COLORS.card.end]} style={styles.scrollingMetricItem}>
      <Feather name={item.icon} size={24} color={COLORS.text.primary} />
      <Text style={styles.scrollingMetricTitle}>{item.title}</Text>
      <Text style={styles.scrollingMetricValue}>
        {item.value}
        <Text style={styles.scrollingMetricUnit}>{item.unit}</Text>
      </Text>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={[COLORS.background.start, COLORS.background.end]} style={styles.backgroundGradient}>
      {!menuVisible && (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
            <Feather name="menu" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farm Dashboard 🏡</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community')} style={styles.iconButton}>
            <Feather name="users" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      )}
      
      <Menubar
        visible={menuVisible}
        toggleMenu={toggleMenu}
      />

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.greeting}>Hello Billy,</Text>
        <View style={styles.metricsContainer}>
          <MetricCard title="Temperature" value={25} unit="°C" icon="thermometer" />
          <MetricCard title="Humidity" value={60} unit="%" icon="droplet" />
          <MetricCard title="Light" value={800} unit="lux" icon="sun" />
        </View>
        <View style={styles.scrollingMetricsContainer}>
          <FlatList
            data={scrollingMetrics}
            renderItem={renderScrollingMetric}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollingMetricsList}
          />
        </View>

        <Map />

        <View style={styles.newsContainer}>
          <View style={styles.newsHeader}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color={COLORS.text.primary} style={styles.newsIcon} />
            <Text style={styles.newsHeaderText}>Agriculture News</Text>
          </View>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.newsItem}>
              <MaterialCommunityIcons name="leaf" size={20} color={COLORS.accent} style={styles.newsItemIcon} />
              <View>
                <Text style={styles.newsTitle}>News {item}</Text>
                <Text style={styles.newsContent}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.chatbotButton} onPress={toggleChatbot}>
        <Feather name="message-circle" size={30} color={COLORS.text.primary} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  iconButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginVertical: 15,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTitle: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginVertical: 5,
  },
  metricValue: {
    fontSize: 24,
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  metricUnit: {
    fontSize: 14,
  },
  scrollingMetricsContainer: {
    marginTop: 20,
  },
  scrollingMetricsList: {
    paddingVertical: 10,
  },
  scrollingMetricItem: {
    width: width * 0.35,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  scrollingMetricTitle: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginVertical: 5,
  },
  scrollingMetricValue: {
    fontSize: 24,
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  scrollingMetricUnit: {
    fontSize: 14,
  },
  newsContainer: {
    marginTop: 20,
    marginBottom: 350,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newsIcon: {
    marginRight: 10,
  },
  newsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.menu.background,
    borderRadius: 10,
  },
  newsItemIcon: {
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 16,
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  newsContent: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    marginBottom:90,
  },
});

export default Dashboard;