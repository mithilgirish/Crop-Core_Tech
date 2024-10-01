import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2; // 2 cards per row with some padding

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
};

type IconComponentType = typeof MaterialCommunityIcons | typeof FontAwesome6;

interface CardType {
  icon: string;
  name: string;
  IconComponent: IconComponentType;
}

const FarmingAIScreen: React.FC = () => {
  const cards: CardType[] = [
    { icon: 'seed', name: 'Plant Suggestion', IconComponent: MaterialCommunityIcons },
    { icon: 'money-bill-trend-up', name: 'Crop Yield', IconComponent: FontAwesome6 },
    { icon: 'disease', name: 'Disease Prediction', IconComponent: FontAwesome6 },
    { icon: 'seedling', name: 'Essential Conditions', IconComponent: FontAwesome6 },
    { icon: 'spray-can', name: 'Weed Detection', IconComponent: FontAwesome6 },
    { icon: 'flask', name: 'Soil Fertility', IconComponent: FontAwesome6 },
  ];

  const renderCard = (card: CardType, index: number) => (
    <TouchableOpacity key={index} style={styles.cardContainer}>
      <LinearGradient
        colors={[COLORS.card.start, COLORS.card.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <card.IconComponent name={card.icon} size={40} color={COLORS.text.primary} style={styles.cardIcon} />
        <Text style={styles.cardText}>{card.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.container}
    >
      <Text style={styles.header}>Crop Care 🌾</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardsWrapper}>
          {cards.map((card, index) => renderCard(card, index))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cardsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  cardContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FarmingAIScreen;