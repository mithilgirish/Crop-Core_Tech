import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image, Linking, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

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
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);
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

  const handleProfile = () => {
    setProfileModalVisible(true);
  };

  const handleTalkToExperts = () => {
    Linking.openURL('tel:+919940332309');
  };

  const handleSelectLanguage = () => {
    // Existing functionality
  };

  const handleTermsOfUse = () => {
    setTermsModalVisible(true);
  };

  const handlePremium = () => {
    setPremiumModalVisible(true);
  };

  const handleAboutUs = () => {
    setAboutUsModalVisible(true);
  };

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

      {menuVisible && (
        <View style={styles.menuContainer}>
          <LinearGradient colors={[COLORS.menu.header.start, COLORS.menu.header.end]} style={styles.userInfo}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Billy_Butcher.jpg' }} style={styles.userAvatar} />
            <Text style={styles.Billy}> Billy butcher</Text>
            <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
              <Feather name="x" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </LinearGradient>
          <MenuItem title="Profile" icon="user" onPress={handleProfile} />
          <MenuItem title="Talk to Experts" icon="headphones" onPress={handleTalkToExperts} />
          <MenuItem title="Select Language" icon="globe" onPress={handleSelectLanguage} />
          <MenuItem title="Terms of Use" icon="file-text" onPress={handleTermsOfUse} />
          <MenuItem title="Premium" icon="star" onPress={handlePremium} />
          <MenuItem title="About Us" icon="info" onPress={handleAboutUs} />
        </View>
      )}

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.greeting}>Hello Billy,</Text>
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

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>User Profile</Text>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Billy_Butcher.jpg' }} style={styles.modalAvatar} />
            <Text style={styles.modalText}>Name: Billy Butcher</Text>
            <Text style={styles.modalText}>Email: billy@gmail.com</Text>
            <Text style={styles.modalText}>Farm Size: 50 acres</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setProfileModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Terms of Use Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={[COLORS.background.start, COLORS.background.end]} style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Terms of Use</Text>
              <MaterialCommunityIcons name="file-document-outline" size={50} color={COLORS.accent} style={styles.modalIcon} />
              <Text style={styles.modalText}>
                By accessing CropCore-Tech mobile application (henceforth 'the Application' or 'App' or 'CropCore-Tech' interchangeably), which is owned, operated and managed by Team Cache Me (hereinafter referred to as "The Company", "we" or "us"), it is understood that you have read, understood and agree to be bound by the terms of the following user agreement and disclaimers.
              </Text>
              <Text style={styles.modalSubtitle}>Acceptance of Terms of Use</Text>
              <Text style={styles.modalText}>
                If you do not agree to these terms, please do not install this Mobile Application. Please note that we may change the Terms of Use from time to time. Please review these terms periodically and if you do not agree to any changes made in the terms of use, please stop using the Application immediately.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setTermsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* Premium Features Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={premiumModalVisible}
        onRequestClose={() => setPremiumModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={[COLORS.background.start, COLORS.background.end]} style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Premium Features</Text>
              <MaterialCommunityIcons name="star-circle" size={50} color={COLORS.accent} style={styles.modalIcon} />
              <Text style={styles.modalSubtitle}>Unlock advanced agricultural insights:</Text>
              <View style={styles.premiumFeature}>
                <MaterialCommunityIcons name="molecule" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Detailed NPK analysis with historical trends</Text>
              </View>
              <View style={styles.premiumFeature}>
                <MaterialCommunityIcons name="ph" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Real-time pH monitoring with alerts</Text>
              </View>
              <View style={styles.premiumFeature}>
                <MaterialCommunityIcons name="water-percent" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Precise soil moisture tracking and irrigation recommendations</Text>
              </View>
              <View style={styles.premiumFeature}>
                <MaterialCommunityIcons name="weather-cloudy" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Advanced weather forecasts tailored for agriculture</Text>
              </View>
              <View style={styles.premiumFeature}>
                <MaterialCommunityIcons name="chart-line" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Yield prediction and optimization suggestions</Text>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => setPremiumModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* About Us Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutUsModalVisible}
        onRequestClose={() => setAboutUsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={[COLORS.background.start, COLORS.background.end]} style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>About CropCore-Tech</Text>
              <MaterialCommunityIcons name="sprout" size={50} color={COLORS.accent} style={styles.modalIcon} />
              <Text style={styles.modalText}>
                CropCore-Tech is a cutting-edge mobile application designed to empower farmers with real-time agricultural insights and data-driven decision-making tools. Our mission is to revolutionize farming practices by leveraging technology to increase crop yields, optimize resource usage, and promote sustainable agriculture.
              </Text>
              <Text style={styles.modalSubtitle}>Our Vision</Text>
              <Text style={styles.modalText}>
                To create a world where every farmer has access to advanced agricultural technology, enabling them to produce more with less, while preserving our planet's resources for future generations.
              </Text>
              <Text style={styles.modalSubtitle}>Key Features</Text>
              <View style={styles.aboutUsFeature}>
                <MaterialCommunityIcons name="chart-bar" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Real-time crop monitoring and analytics</Text>
              </View>
              <View style={styles.aboutUsFeature}>
                <MaterialCommunityIcons name="robot" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• AI-powered recommendations for optimal farm management</Text>
              </View>
              <View style={styles.aboutUsFeature}>
                <MaterialCommunityIcons name="earth" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Integration with satellite imagery and weather data</Text>
              </View>
              <View style={styles.aboutUsFeature}>
                <MaterialCommunityIcons name="account-group" size={24} color={COLORS.accent} />
                <Text style={styles.modalText}>• Community features for knowledge sharing among farmers</Text>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => setAboutUsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
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
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 26,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 30,
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 10,
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 10,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  modalButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  aboutUsFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  Billy:{
    fontSize: 18,
    color: 'white',
    marginBottom: 2,
    lineHeight: 24,
    marginRight:100,
  }
});

export default Dashboard;