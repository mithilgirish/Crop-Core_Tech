import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

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
    line: '#39FF14', // Neon green
  },
};

interface MarketItem {
  id: string; // You may want to create a unique id for each item
  name: string;
  wholesalePrice: number;
  retailPriceMin: number;
  retailPriceMax: number;
  units: string;
  icon: string; // You need to set an appropriate icon or define a default
  trend: number; // You may want to calculate or set a default trend value
  data: number[]; // Assuming this is a placeholder for historical price data
}

const MarketTrendAnalysis: React.FC = () => {
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get('http://172.16.45.10:8000/api/market-prices/');

        // Map the API response to the MarketItem format
        const items: MarketItem[] = response.data.map((item: any, index: number) => ({
          id: `${index}`, // Generate a unique id
          name: item['CROP NAME'],
          wholesalePrice: parseFloat(item['WHOLESALE PRICE'].replace('₹', '').trim()), // Convert to number
          retailPriceMin: parseFloat(item['RETAIL PRICE'].split('-')[0].replace('₹', '').trim()), // Get min retail price
          retailPriceMax: parseFloat(item['RETAIL PRICE'].split('-')[1].replace('₹', '').trim()), // Get max retail price
          units: item['UNITS'],
          icon: 'food' as string, // Use a default icon or assign based on item
          trend: 0, // Default value, implement logic if needed
          data: [], // Placeholder for historical data
        }));

        setMarketItems(items);
        setSelectedItem(items[0]); // Set the first item as selected by default
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </SafeAreaView>
    );
  }

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
              <MaterialCommunityIcons name={selectedItem?.icon as any} size={24} color={COLORS.accent} />
              <Text style={styles.dropdownText}>{selectedItem?.name}</Text>
              <MaterialCommunityIcons name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={24} color={COLORS.accent} />
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

          {selectedItem && (
            <>
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
                      data: [selectedItem.wholesalePrice, (selectedItem.retailPriceMin + selectedItem.retailPriceMax) / 2],
                    }],
                  }}
                  width={Dimensions.get('window').width - 60}
                  height={220}
                  chartConfig={{
                    backgroundColor: COLORS.graph.background,
                    backgroundGradientFrom: COLORS.graph.background,
                    backgroundGradientTo: COLORS.graph.background,
                    color: (opacity = 1) => COLORS.graph.line,
                    strokeWidth: 2,
                  }}
                  bezier
                  style={styles.chart}
                />
              </View>
            </>
          )}
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
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
  },
  dropdownText: {
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  dropdownList: {
    marginBottom: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdownItemText: {
    color: COLORS.text.primary,
    marginLeft: 8,
  },
  trendCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  trendCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendCardTitle: {
    color: COLORS.text.primary,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  trendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  miniChart: {
    marginTop: 8,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  price: {
    fontSize: 18,
    color: COLORS.text.secondary,
  },
  priceLabel: {
    color: COLORS.text.secondary,
  },
  updateInfo: {
    color: COLORS.text.secondary,
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    width: '100%',
  },
  infoLabel: {
    color: COLORS.text.secondary,
  },
  infoValue: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  chartCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
  },
});

export default MarketTrendAnalysis;
