import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemeProvider, Button, Card, Text, Icon } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

type Crop = 'Wheat' | 'Corn' | 'Soybeans' | 'Rice';

interface CropData {
  costOfProduction: number;
  marketPrice: number;
  averageYield: number;
}

const cropData: Record<Crop, CropData> = {
  Wheat: { costOfProduction: 200, marketPrice: 250, averageYield: 50 },
  Corn: { costOfProduction: 150, marketPrice: 180, averageYield: 180 },
  Soybeans: { costOfProduction: 300, marketPrice: 350, averageYield: 50 },
  Rice: { costOfProduction: 250, marketPrice: 300, averageYield: 85 },
};

const CropMarketTrends: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop>('Wheat');

  const suggestedPrice = useMemo(() => {
    const { costOfProduction, marketPrice } = cropData[selectedCrop];
    return parseFloat(((costOfProduction + marketPrice) / 2).toFixed(2));
  }, [selectedCrop]);

  const renderInfoCard = (title: string, value: string | number, iconName: string) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Icon name={iconName} type="material-community" size={30} color="#3D6DCC" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardValue}>{value}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
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

        {renderInfoCard('Cost of Production', `$${cropData[selectedCrop].costOfProduction}`, 'sprout')}
        {renderInfoCard('Market Price', `$${cropData[selectedCrop].marketPrice}`, 'chart-line')}
        {renderInfoCard('Average Yield', `${cropData[selectedCrop].averageYield} bu/acre`, 'sprout')}
        {renderInfoCard('Suggested Price', `$${suggestedPrice}`, 'tag-text-outline')}

        <Button
          title="Refresh Data"
          buttonStyle={styles.button}
          icon={<Icon name="refresh" type="material-community" size={20} color="white" />}
        />
      </ScrollView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  pickerCard: {
    margin: 15,
    borderRadius: 10,
    elevation: 3,
  },
  picker: {
    height: 50,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 7,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D6DCC',
  },
  button: {
    backgroundColor: '#3D6DCC',
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 20,
    paddingVertical: 12,
  },
});

export default CropMarketTrends;