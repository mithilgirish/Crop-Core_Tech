import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const COLORS = {
  text: {
    primary: '#FFFFFF',
  },
  map: {
    background: '#1E1E1E',
    road: '#454545',
    marker: '#FFFF99', // Yellow for nearby farmers
    roadText: '#FFFFFF',
  },
};

const nearbyFarmers = [
  { latitude: 12.850767, longitude: 80.160785, name: 'Farmer 1' }, // Farmer 1 further north
  { latitude: 12.830567, longitude: 80.140885, name: 'Farmer 2' }, // Farmer 2 further south
];

const Map: React.FC = () => {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.mapTitle}>Farm Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 12.840767,
          longitude: 80.153385,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={[
          {
            elementType: 'geometry',
            stylers: [
              {
                color: COLORS.map.background,
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#000000',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: COLORS.map.roadText,
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: COLORS.map.road,
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: COLORS.map.roadText,
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#2E2E2E',
              },
            ],
          },
        ]}
      >
        {/* Main farm marker in red */}
        <Marker
          coordinate={{ latitude: 12.840767, longitude: 80.153385 }}
          pinColor='red'
          title="Main Farm"
          description="Your farm location"
        />
        
        {/* Nearby farmers in yellow */}
        {nearbyFarmers.map((farmer, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: farmer.latitude, longitude: farmer.longitude }}
            pinColor={COLORS.map.marker} // Yellow marker for nearby farmers
            title={farmer.name}
            description="Nearby farmer"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
});

export default Map;
