import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, Linking } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#1E88E5',
  menu: {
    background: '#121212',
    itemBorder: '#1F1F1F',
    header: {
      start: '#3949AB',
      end: '#1A237E',
    },
  },
  text: {
    primary: '#FFFFFF',
  },
  accent: '#FFD700', // Gold color for icons
  background: {
    start: '#121212',
    end: '#2C2C2C',
  },
};

interface MenubarProps {
  visible: boolean;
  toggleMenu: () => void;
}

const MenuItem: React.FC<{ title: string; icon: keyof typeof Feather.glyphMap; onPress: () => void }> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Feather name={icon} size={24} color={COLORS.text.primary} />
    <Text style={styles.menuItemText}>{title}</Text>
  </TouchableOpacity>
);

const Menubar: React.FC<MenubarProps> = ({ visible, toggleMenu }) => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const [aboutUsModalVisible, setAboutUsModalVisible] = useState(false);

  const handleProfile = () => {
    setProfileModalVisible(true);
  };

  const handleTalkToExperts = () => {
    const phoneNumber = '+919940332309'; // Replace with your constant phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSelectLanguage = () => {
    // Implement language selection functionality
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

  if (!visible) return null;

  return (
    <View style={styles.menuContainer}>
      <LinearGradient colors={[COLORS.menu.header.start, COLORS.menu.header.end]} style={styles.userInfo}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/b/b7/Billy_Butcher.jpg' }} style={styles.userAvatar} />
        <Text style={styles.userName}>Billy Butcher</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <Feather name="x" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </LinearGradient>
      <MenuItem title="Profile" icon="user" onPress={handleProfile} />
      <MenuItem title="Talk to Experts" icon="phone" onPress={handleTalkToExperts} />
      <MenuItem title="Select Language" icon="globe" onPress={handleSelectLanguage} />
      <MenuItem title="Terms of Use" icon="file-text" onPress={handleTermsOfUse} />
      <MenuItem title="Premium" icon="star" onPress={handlePremium} />
      <MenuItem title="About Us" icon="info" onPress={handleAboutUs} />

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
    </View>
  );
};

const styles = StyleSheet.create({
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
        borderRadius: 25,
        marginRight: 15,
      },
      userName: {
        fontSize: 18,
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
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: COLORS.menu.background,
        borderRadius: 10,
        padding: 20,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 15,
        textAlign: 'center',
      },
      modalSubtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginTop: 10,
        marginBottom: 5,
      },
      modalText: {
        fontSize: 16,
        color: COLORS.text.primary,
        marginBottom: 10,
      },
      modalButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
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
        marginBottom: 15,
      },
      modalIcon: {
        alignSelf: 'center',
        marginBottom: 15,
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
});

export default Menubar;