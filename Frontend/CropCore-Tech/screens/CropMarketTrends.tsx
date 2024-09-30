import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { ThemeProvider, Card, Text, Icon } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

interface CropData {
  cropName: string;
  units: string;
  wholesalePrice: string;
  retailPrice: string;
}

const CropMarketTrends: React.FC = () => {
  const [crops, setCrops] = useState<CropData[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.get('http://192.168.0.102:8000/api/market-prices/');
        const data = response.data.map((item: { [x: string]: any }) => ({
          cropName: item["CROP NAME"].trim(),
          units: item.UNITS,
          wholesalePrice: item["WHOLESALE PRICE"].replace('₹', '').trim(),
          retailPrice: item["RETAIL PRICE"].replace('₹', '').trim()
        }));
        setCrops(data);
        if (data.length > 0) {
          setSelectedCrop(data[0].cropName); // Set default selected crop
        }
      } catch (error) {
        console.error('Error fetching crop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCropData();
  }, []);

 

  const renderInfoCard = (title: string, value: string, iconName: string) => (
    <View style={styles.infoCard}>
      <Icon name={iconName} type="material-community" color="#00cd7c" size={24} />
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const renderChart = () => {
    const selectedCropData = crops.find(crop => crop.cropName === selectedCrop);
    return (
      <Card containerStyle={styles.chartCard}>
        <Card.Title>Price Trend (Wholesale vs Retail)</Card.Title>
        <LineChart
          data={{
            labels: ["Wholesale", "Retail"],
            datasets: [{ 
              data: [
                parseFloat(selectedCropData?.wholesalePrice || "0"),
                parseFloat(selectedCropData?.retailPrice || "0"),
              ]
            }]
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
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00cd7c" />
      </View>
    );
  }

  const selectedCropData = crops.find(crop => crop.cropName === selectedCrop);

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Market Trend Analysis</Text>

        <Card containerStyle={styles.pickerCard}>
          <Picker
            selectedValue={selectedCrop}
            onValueChange={(itemValue) => setSelectedCrop(itemValue)}
            style={styles.picker}
          >
            {crops.map((crop, index) => (
              <Picker.Item key={`${crop.cropName}-${index}`} label={crop.cropName} value={crop.cropName} />
            ))}
          </Picker>
        </Card>

        {selectedCropData && (
          <Card containerStyle={styles.mainInfoCard}>
            <Text style={styles.cropName}>{selectedCropData.cropName}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹ {selectedCropData.wholesalePrice}/{selectedCropData.units}</Text>
            </View>
            <Text style={styles.location}>Wholesale Price</Text>
            <Text style={styles.date}>Last Updated: Today</Text>
          </Card>
        )}

        <View style={styles.infoCardContainer}>
          {renderInfoCard('Wholesale', `₹ ${selectedCropData?.wholesalePrice || "N/A"}`, 'truck-delivery')}
          {renderInfoCard('Retail', `₹ ${selectedCropData?.retailPrice || "N/A"}`, 'store')}
          {renderInfoCard('Units', selectedCropData?.units || "N/A", 'weight')}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CropMarketTrends;
