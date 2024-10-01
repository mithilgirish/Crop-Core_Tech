import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const COLORS = {
  primary: '#1E88E5',
  secondary: '#3949AB',
  accent: '#4CAF50',
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
  graph: {
    background: '#000000',
    line: '#39FF14',  // Neon green
  },
};

interface MarketItem {
  id: string;
  name: string;
  wholesalePrice: number;
  retailPriceMin: number;
  retailPriceMax: number;
  units: string;
  icon: string;
  trend: number;
  data: number[];
}

const marketItems: MarketItem[] = [
  {
    id: '1',
    name: 'Onion Big',
    wholesalePrice: 45,
    retailPriceMin: 52,
    retailPriceMax: 57,
    units: '1kg',
    icon: 'food-apple',
    trend: 1.2,
    data: [40, 42, 43, 45, 44, 45],
  },
  {
    id: '2',
    name: 'Tomato',
    wholesalePrice: 30,
    retailPriceMin: 35,
    retailPriceMax: 40,
    units: '1kg',
    icon: 'food-apple-outline',
    trend: -0.8,
    data: [32, 31, 30, 29, 30, 30],
  },
  {
    id: '3',
    name: 'Potato',
    wholesalePrice: 20,
    retailPriceMin: 25,
    retailPriceMax: 28,
    units: '1kg',
    icon: 'grain',
    trend: 0.5,
    data: [18, 19, 20, 21, 20, 20],
  },
  {
    id: '4',
    name: 'Carrot',
    wholesalePrice: 25,
    retailPriceMin: 30,
    retailPriceMax: 35,
    units: '1kg',
    icon: 'carrot',
    trend: 0.3,
    data: [24, 25, 26, 25, 25, 25],
  },
  {
    id: '5',
    name: 'Cucumber',
    wholesalePrice: 15,
    retailPriceMin: 18,
    retailPriceMax: 22,
    units: '1kg',
    icon: 'food',
    trend: -0.2,
    data: [16, 15, 15, 14, 15, 15],
  },
];

const MarketTrendAnalysis: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(marketItems[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderTrendIcon = (trend: number) => {
    if (trend > 0) return 'trending-up';
    if (trend < 0) return 'trending-down';
    return 'trending-neutral';
  };

  const renderMarketTrendCard = ({ item }: { item: MarketItem }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)}>
      <LinearGradient
        colors={[COLORS.card.start, COLORS.card.end]}
        style={styles.trendCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.trendCardHeader}>
          <MaterialCommunityIcons name={item.icon as any} size={24} color={COLORS.accent} />
          <Text style={styles.trendCardTitle}>{item.name}</Text>
        </View>
        <View style={styles.trendInfo}>
          <MaterialCommunityIcons 
            name={renderTrendIcon(item.trend)} 
            size={24} 
            color={item.trend >= 0 ? COLORS.accent : '#F44336'} 
          />
          <Text style={[styles.trendText, { color: item.trend >= 0 ? COLORS.accent : '#F44336' }]}>
            {Math.abs(item.trend).toFixed(2)}%
          </Text>
        </View>
        <LineChart
          data={{
            labels: [],
            datasets: [{ data: item.data }],
          }}
          width={120}
          height={60}
          chartConfig={{
            backgroundColor: COLORS.graph.background,
            backgroundGradientFrom: COLORS.graph.background,
            backgroundGradientTo: COLORS.graph.background,
            color: (opacity = 1) => COLORS.graph.line,
            strokeWidth: 2,
          }}
          bezier
          style={styles.miniChart}
          withDots={false}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[COLORS.background.start, COLORS.background.end]}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Market Trend Analysis</Text>
          
          <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <View style={styles.dropdown}>
              <MaterialCommunityIcons name={selectedItem.icon as any} size={24} color={COLORS.accent} />
              <Text style={styles.dropdownText}>{selectedItem.name}</Text>
              <MaterialCommunityIcons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color={COLORS.accent} />
            </View>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {marketItems.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedItem(item);
                    setIsDropdownOpen(false);
                  }}
                >
                  <MaterialCommunityIcons name={item.icon as any} size={24} color={COLORS.accent} />
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.itemName}>{selectedItem.name}</Text>
            <Text style={styles.price}>₹ {selectedItem.wholesalePrice}/{selectedItem.units}</Text>
            <Text style={styles.priceLabel}>Wholesale Price</Text>
            <Text style={styles.updateInfo}>Last Updated: Today</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.infoCard, styles.halfWidth]}>
              <MaterialCommunityIcons name="truck-delivery" size={24} color={COLORS.accent} />
              <Text style={styles.infoLabel}>Wholesale</Text>
              <Text style={styles.infoValue}>₹ {selectedItem.wholesalePrice}</Text>
            </View>
            <View style={[styles.infoCard, styles.halfWidth]}>
              <MaterialCommunityIcons name="store" size={24} color={COLORS.accent} />
              <Text style={styles.infoLabel}>Retail</Text>
              <Text style={styles.infoValue}>₹ {selectedItem.retailPriceMin} - {selectedItem.retailPriceMax}</Text>
            </View>
          </View>

          <View style={[styles.infoCard, styles.fullWidth]}>
            <MaterialCommunityIcons name="scale-balance" size={24} color={COLORS.accent} />
            <Text style={styles.infoLabel}>Units</Text>
            <Text style={styles.infoValue}>{selectedItem.units}</Text>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Price Trend (Wholesale vs Retail)</Text>
            <LineChart
              data={{
                labels: ['Wholesale', 'Retail'],
                datasets: [{
                  data: [selectedItem.wholesalePrice, (selectedItem.retailPriceMin + selectedItem.retailPriceMax) / 2]
                }]
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              chartConfig={{
                backgroundColor: COLORS.graph.background,
                backgroundGradientFrom: COLORS.graph.background,
                backgroundGradientTo: COLORS.graph.background,
                color: (opacity = 1) => COLORS.graph.line,
                labelColor: (opacity = 1) => COLORS.text.primary,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS.graph.line
                },
                strokeWidth: 2,
              }}
              bezier
              style={styles.chart}
            />
          </View>

          <Text style={styles.sectionTitle}>Other Market Trends</Text>
          <FlatList
            data={marketItems}
            renderItem={renderMarketTrendCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.trendList}
          />

          <View style={styles.spacer} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background.start,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card.start,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  dropdownText: {
    color: COLORS.text.primary,
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  dropdownList: {
    backgroundColor: COLORS.card.start,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card.end,
  },
  dropdownItemText: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  card: {
    backgroundColor: COLORS.card.start,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginVertical: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  updateInfo: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: COLORS.card.start,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    width: '100%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 5,
  },
  chartCard: {
    backgroundColor: COLORS.card.start,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  trendList: {
    marginBottom: 20,
  },
  trendCard: {
    width: 160,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  trendCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginLeft: 10,
  },
  trendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  miniChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  spacer: {
    height: 100,
  },
});

export default MarketTrendAnalysis;