import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2; // 2 cards per row with some padding

const COLORS = {
  background: '#1A237E',
  card1: ['#1E88E5', '#3949AB'],
  card2: ['#1E88E5', '#3949AB'],
  card3: ['#1E88E5', '#3949AB'],
  card4: ['#1E88E5', '#3949AB'],
  card5: ['#1E88E5', '#3949AB'],
  card6: ['#1E88E5', '#3949AB'],
  text: '#FFFFFF',
};

type IconComponentType = typeof MaterialCommunityIcons | typeof FontAwesome6;

interface CardType {
  icon: string;
  name: string;
  IconComponent: IconComponentType;
  colors: string[];
}

const FarmingAIScreen: React.FC = () => {
  const cards: CardType[] = [
    { icon: 'seed', name: 'Plant Suggestion', IconComponent: MaterialCommunityIcons, colors: COLORS.card1 },
    { icon: 'money-bill-trend-up', name: 'Crop Yield', IconComponent: FontAwesome6, colors: COLORS.card2 },
    { icon: 'disease', name: 'Disease Prediction', IconComponent: FontAwesome6, colors: COLORS.card3 },
    { icon: 'seedling', name: 'Essential Conditions', IconComponent: FontAwesome6, colors: COLORS.card4 },
    { icon: 'spray-can', name: 'Weed Detection', IconComponent: FontAwesome6, colors: COLORS.card5 },
    { icon: 'flask', name: 'Soil Fertility', IconComponent: FontAwesome6, colors: COLORS.card6 },
  ];

  const renderCard = (card: CardType, index: number) => (
    <TouchableOpacity key={index} style={styles.cardContainer}>
      <LinearGradient
        colors={card.colors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <card.IconComponent name={card.icon} size={40} color={COLORS.text} style={styles.cardIcon} />
        <Text style={styles.cardText}>{card.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crop Care 🌾</Text>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardsWrapper}>
          {cards.map((card, index) => renderCard(card, index))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
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
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FarmingAIScreen;