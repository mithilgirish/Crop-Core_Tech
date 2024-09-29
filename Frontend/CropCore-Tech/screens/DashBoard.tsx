import React, { useState } from 'react';
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
  Community: undefined;
  Profile: undefined;
  'About Us': undefined;
  'Contact Us': undefined;
  'Select Language': undefined;
  'Share App': undefined;
  'Talk to Expert': undefined;
  'Terms of Use': undefined;
};

type Navigation = NavigationProp<RootStackParamList>;

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
}

interface MenuItem {
  icon: string;
  title: string;
  screen: keyof RootStackParamList;
}

const menuItems: MenuItem[] = [
  { icon: 'user', title: 'My Profile', screen: 'Profile' },
  { icon: 'share-2', title: 'Share the App', screen: 'Share App' },
  { icon: 'headphones', title: 'Talk to Expert', screen: 'Talk to Expert' },
  { icon: 'globe', title: 'Select Language', screen: 'Select Language' },
  { icon: 'file-text', title: 'Terms of Use', screen: 'Terms of Use' },
];

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon }) => (
  <LinearGradient
    colors={['#00cd7c', '#00a745']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
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
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    setMenuVisible(false);
  };

  const MenuBar: React.FC = () => (
    <View style={styles.menuContainer}>
      <ScrollView>
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Feather name="x" size={24} color="#14251e" />
          </TouchableOpacity>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Feather name="user" size={24} color="#14251e" />
            </View>
            <Text style={styles.username}>Venkatakrishnan</Text>
          </View>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleNavigation(item.screen)}
          >
            <Feather name={item.icon as any} size={20} color="#14251e" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
          <Feather name="menu" size={24} color="#14251e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farm Dashboard</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Community')}>
          <Feather name="globe" size={24} color="#14251e" />
        </TouchableOpacity>
      </View>
      {menuVisible && <MenuBar />}
      <ScrollView contentContainerStyle={styles.scrollContent}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14251e',
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#F5F5F5',
    zIndex: 1000,
    elevation: 5,
  },
  menuHeader: {
    backgroundColor: '#00cd7c',
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#14251e',
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
    marginTop: 20,
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
});

export default Dashboard;