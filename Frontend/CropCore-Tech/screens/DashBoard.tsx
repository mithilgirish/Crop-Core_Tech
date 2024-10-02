import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Linking, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'; // Import axios
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

const openNewsLink = (link: string) => {
  const fullLink = link.startsWith('http') ? link : `https://www.livemint.com${link}`;
  Linking.openURL(fullLink).catch(err => console.error("Failed to open URL:", err));
};

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Feather.glyphMap;
}

interface NewsItem {
  headline: string;
  link: string;
  "time to read": string;
  date: string;
  img: string;
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
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  useEffect(() => {
    // Fetch news data from the API
    axios.get('http://172.16.45.10:8000/api/News/')
      .then(response => {
        setNewsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }, []);

  const toggleMenu = (): void => {
    setMenuVisible(prev => !prev);
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

      <Menubar visible={menuVisible} toggleMenu={toggleMenu} />

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
          {newsData.length > 0 ? (
            newsData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.newsItem} onPress={() => openNewsLink(item.link)}>
                <Image source={{ uri: item.img }} style={styles.newsImage} />
                <View>
                  <Text style={styles.newsTitle}>{item.headline}</Text>
                  <Text style={styles.newsContent}>
                    {item["time to read"]} • {item.date}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noNewsText}>No news available at the moment.</Text>
          )}
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
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  scrollingMetricsContainer: {
    marginVertical: 20,
  },
  scrollingMetricItem: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
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
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  newsContainer: {
    marginTop: 20,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newsIcon: {
    marginRight: 5,
  },
  newsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.menu.itemBorder,
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  newsContent: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  noNewsText: {
    textAlign: 'center',
    color: COLORS.text.secondary,
    marginTop: 10,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 15,
    marginBottom: 70,
  },
  scrollingMetricsList: {
    paddingVertical: 10,
  },
});

export default Dashboard;

