import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Define a professional color palette
const COLORS = {
  primary: '#1E88E5',       // A professional blue
  secondary: '#3949AB',     // Slightly darker blue for depth
  accent: '#00ACC1',        // Teal accent
  background: {
    start: '#1A237E',       // Dark blue
    end: '#121212',         // Near black
  },
  card: {
    start: '#1E88E5',       // Primary blue
    end: '#0D47A1',         // Darker blue
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0BEC5',
  },
  menu: {
    background: '#121212',
    itemBorder: '#1F1F1F',
  },
};

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
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

const MenuItem: React.FC<{ title: string; icon: keyof typeof Feather.glyphMap; onPress: () => void }> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Feather name={icon} size={24} color={COLORS.text.primary} />
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

const Dashboard: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const toggleMenu = (): void => {
    setMenuVisible((prev) => !prev);
  };

  const toggleChatbot = (): void => {
    navigation.navigate('Chatbot');
  };

  const scrollingMetrics: (MetricCardProps & { id: string })[] = [
    { id: '1', title: "Nitrogen", value: 180, unit: "ppm", icon: "droplet", color: COLORS.card.start },
    { id: '2', title: "Phosphorus", value: 150, unit: "ppm", icon: "droplet", color: COLORS.card.start },
    { id: '3', title: "Potassium", value: 180, unit: "ppm", icon: "droplet", color: COLORS.card.start },
    { id: '4', title: "pH", value: 6.5, unit: "", icon: "activity", color: COLORS.card.start },
    { id: '5', title: "Soil Moisture", value: 40, unit: "%", icon: "droplet", color: COLORS.card.start },
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
          <Text style={styles.headerTitle}>Farm Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community' as never)} style={styles.iconButton}>
            <Feather name="users" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>
      )}

      {menuVisible && (
        <View style={styles.menuContainer}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={styles.userAvatar} />
            <Text style={styles.userName}>Venkatakrishnan</Text>
            <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
              <Feather name="x" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
          <MenuItem title="Profile" icon="user" onPress={() => navigation.navigate('Profile' as never)} />
          <MenuItem title="Share the App" icon="share-2" onPress={() => {}} />
          <MenuItem title="Talk to Experts" icon="headphones" onPress={() => {}} />
          <MenuItem title="Select Language" icon="globe" onPress={() => {}} />
          <MenuItem title="Terms of Use" icon="file-text" onPress={() => {}} />
          <MenuItem title="Premium" icon="star" onPress={() => {}} />
          <MenuItem title="About Us" icon="info" onPress={() => {}} />
        </View>
      )}

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.greeting}>Hello User,</Text>
        <View style={styles.metricsContainer}>
          <MetricCard title="Temperature" value={25} unit="°C" icon="thermometer" color={COLORS.card.start} />
          <MetricCard title="Humidity" value={60} unit="%" icon="droplet" color={COLORS.card.start} />
          <MetricCard title="Light" value={800} unit="lux" icon="sun" color={COLORS.card.start} />
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

        <View style={styles.newsContainer}>
          <View style={styles.newsHeader}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color={COLORS.text.primary} style={styles.newsIcon} />
            <Text style={styles.newsHeaderText}>Agriculture News</Text>
          </View>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
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
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: COLORS.menu.background,
    zIndex: 1000,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.menu.itemBorder,
    backgroundColor: COLORS.primary,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.menu.itemBorder,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 15,
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
    marginBottom: 300,
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
    marginBottom: 85,
  },
});

export default Dashboard;