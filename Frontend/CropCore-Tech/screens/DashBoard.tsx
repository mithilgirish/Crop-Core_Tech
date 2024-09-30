import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

type DashboardScreenNavigationProp = NavigationProp<ParamListBase>;

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, color }) => (
  <View style={[styles.metricCard, { backgroundColor: color }]}>
    <Feather name={icon} size={24} color="#333" />
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>
      {value}<Text style={styles.metricUnit}>{unit}</Text>
    </Text>
  </View>
);

const MenuItem: React.FC<{ title: string; icon: keyof typeof Feather.glyphMap; onPress: () => void }> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Feather name={icon} size={24} color="#333" />
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
    { id: '1', title: "Nitrogen", value: 180, unit: "ppm", icon: "droplet", color: '#FFDF00' },
    { id: '2', title: "Phosphorus", value: 150, unit: "ppm", icon: "droplet", color: '#FFDF00' },
    { id: '3', title: "Potassium", value: 180, unit: "ppm", icon: "droplet", color: '#FFDF00' },
    { id: '4', title: "pH", value: 6.5, unit: "", icon: "activity", color: '#FFDF00' },
    { id: '5', title: "Soil Moisture", value: 40, unit: "%", icon: "droplet", color: '#FFDF00' },
  ];

  const renderScrollingMetric = ({ item }: { item: MetricCardProps & { id: string } }) => (
    <View style={[styles.scrollingMetricItem, { backgroundColor: item.color }]}>
      <Feather name={item.icon} size={24} color="#333" />
      <Text style={styles.scrollingMetricTitle}>{item.title}</Text>
      <Text style={styles.scrollingMetricValue}>
        {item.value}<Text style={styles.scrollingMetricUnit}>{item.unit}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {!menuVisible && (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
            <Feather name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farm Dashboard</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community' as never)} style={styles.iconButton}>
            <Feather name="users" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <View style={styles.userInfo}>
            <Image source={{ uri: 'https://example.com/avatar.jpg' }} style={styles.userAvatar} />
            <Text style={styles.userName}>Venkatakrishnan</Text>
            <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
              <Feather name="x" size={24} color="#FFFFFF" />
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
          <MetricCard title="Temperature" value={25} unit="°C" icon="thermometer" color="#FFB74D" />
          <MetricCard title="Humidity" value={60} unit="%" icon="droplet" color="#4FC3F7" />
          <MetricCard title="Light" value={800} unit="lux" icon="sun" color="#FFF176" />
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
            <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color="#333" style={styles.newsIcon} />
            <Text>Agriculture News</Text>
          </View>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.newsItem}>
              <MaterialCommunityIcons name="leaf" size={20} color="#4CAF50" style={styles.newsItemIcon} />
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
        <Feather name="message-circle" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    marginTop:0,
    backgroundColor: '#E8F5E9',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#00A86B',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#00A86B',
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
    color: '#FFFFFF',
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
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricUnit: {
    fontSize: 12,
    color: '#666',
  },
  scrollingMetricsContainer: {
    marginBottom: 20,
  },
  scrollingMetricsList: {
    paddingHorizontal: 5,
  },
  scrollingMetricItem: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  scrollingMetricTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  scrollingMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollingMetricUnit: {
    fontSize: 12,
    color: '#666',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 1,
  },
  newsContainer: {
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  newsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsIcon: {
    marginRight: 5,
  },
  newsItem: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newsItemIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1E90FF',
  },
  newsContent: {
    fontSize: 14,
    color: '#666',
  },
});

export default Dashboard;