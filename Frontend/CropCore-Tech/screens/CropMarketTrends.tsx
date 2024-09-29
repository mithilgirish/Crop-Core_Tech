import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ThemeProvider, Card, Text, Icon } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

type Crop = 'Onion Small' | 'Tomato Average' | 'Tomato Hybrid';

interface CropData {
  price: number;
  change: number;
  location: string;
  date: string;
  historicalPrices: number[];
}

const cropData: Record<Crop, CropData> = {
  'Onion Small': {
    price: 4200,
    change: -2.33,
    location: 'Koyambedu',
    date: '27 September',
    historicalPrices: [4300, 4250, 4280, 4220, 4200],
  },
  'Tomato Average': {
    price: 3900,
    change: -2.50,
    location: 'Koyambedu',
    date: '27 September',
    historicalPrices: [4000, 3950, 3920, 3930, 3900],
  },
  'Tomato Hybrid': {
    price: 3800,
    change: -7.32,
    location: 'Koyambedu',
    date: '27 September',
    historicalPrices: [4100, 4000, 3950, 3880, 3800],
  },
};

const CropMarketTrends: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop>('Onion Small');

  const renderInfoCard = (title: string, value: string | number, iconName: string) => (
    <View style={styles.infoCard}>
      <Icon name={iconName} type="material-community" color="#00cd7c" size={24} />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderChart = () => (
    <Card containerStyle={styles.chartCard}>
      <Card.Title>Price Trend (Last 5 Days)</Card.Title>
      <LineChart
        data={{
          labels: ["5d", "4d", "3d", "2d", "1d"],
          datasets: [{ data: cropData[selectedCrop].historicalPrices }]
        }}
        width={Dimensions.get("window").width - 60}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 205, 124, ${opacity})`,
          style: { borderRadius: 16 }
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </Card>
  );

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Market Trend Analysis</Text>

        <Card containerStyle={styles.pickerCard}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue) => setSelectedCrop(itemValue as Crop)}
            style={styles.picker}
          >
            {Object.keys(cropData).map((crop) => (
              <Picker.Item key={crop} label={crop} value={crop} />
            ))}
          </Picker>
        </Card>

        <Card containerStyle={styles.mainInfoCard}>
          <Text style={styles.cropName}>{selectedCrop}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹ {cropData[selectedCrop].price}/Q</Text>
            <Text style={[styles.change, { color: cropData[selectedCrop].change < 0 ? '#FF4136' : '#2ECC40' }]}>
              {cropData[selectedCrop].change}%
            </Text>
          </View>
          <Text style={styles.location}>{cropData[selectedCrop].location}</Text>
          <Text style={styles.date}>{cropData[selectedCrop].date}</Text>
        </Card>

        <View style={styles.infoCardContainer}>
          {renderInfoCard('Supply', '1200 tons', 'truck-delivery')}
          {renderInfoCard('Demand', '1000 tons', 'scale-balance')}
          {renderInfoCard('Forecast', '↗ Increasing', 'trending-up')}
          {renderInfoCard('Quality', 'Good', 'check-circle')}
        </View>

        {renderChart()}
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  pickerCard: {
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  picker: {
    height: 50,
    color: '#00cd7c',
  },
  mainInfoCard: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 7,
    elevation: 3,
    padding: 15,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00cd7c',
  },
  change: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 15,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    elevation: 3,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartCard: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
    elevation: 3,
    padding: 10,
  },
});

export default CropMarketTrends;