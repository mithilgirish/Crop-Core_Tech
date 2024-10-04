import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Linking, SafeAreaView, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // Full width cards with padding
const CARD_HEIGHT = 100; // Height of each card
const CARD_MARGIN = 20; // Margin between cards

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

type IconType = 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome5';

interface CardType {
  iconType: IconType;
  iconName: string;
  name: string;
  url: string;
}

const CustomIcon: React.FC<{ type: IconType; name: string; size: number; color: string }> = ({ type, name, size, color }) => {
  switch (type) {
    case 'Ionicons':
      return <Ionicons name={name as any} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    default:
      return null;
  }
};

const FarmingAIScreen: React.FC = () => {
  const cards: CardType[] = [
    { iconType: 'FontAwesome5', iconName: 'leaf', name: 'Plant Suggestion', url: 'http://172.16.45.100:8081' },
    { iconType: 'FontAwesome5', iconName: 'chart-line', name: 'Crop Yield', url: 'http://172.16.45.100:8082' },
    { iconType: 'FontAwesome5', iconName: 'disease', name: 'Disease Prediction', url: 'http://172.16.45.100:8083' },
    { iconType: 'FontAwesome5', iconName: 'flask', name: 'Fertilizer Suggestion', url: 'http://172.16.45.100:8084' },
    { iconType: 'MaterialCommunityIcons', iconName: 'flower', name: 'Weed Detection', url: 'http://172.16.45.100:8085' },
    { iconType: 'FontAwesome5', iconName: 'vial', name: 'Soil Fertility', url: 'http://172.16.45.100:8086' },
  ];

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderCard = (card: CardType, index: number) => (
    <TouchableOpacity key={index} style={styles.cardContainer} onPress={() => handlePress(card.url)}>
      <LinearGradient
        colors={[COLORS.card.start, COLORS.card.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <CustomIcon type={card.iconType} name={card.iconName} size={32} color={COLORS.text.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardText}>{card.name}</Text>
            <Text style={styles.cardSubText}>Tap to open</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[COLORS.background.start, COLORS.background.end]}
        style={styles.container}
      >
        <Text style={styles.header}>Smart Farming Assistant</Text>
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardsWrapper}>
            {cards.map((card, index) => renderCard(card, index))}
          </View>
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  cardsWrapper: {
    alignItems: 'center',
    padding: 10,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginBottom: CARD_MARGIN,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardText: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubText: {
    color: COLORS.text.secondary,
    fontSize: 14,
    marginTop: 5,
  },
  bottomSpacing: {
    height: CARD_HEIGHT, // Add extra space at the bottom equal to one card's height
  },
});

export default FarmingAIScreen;