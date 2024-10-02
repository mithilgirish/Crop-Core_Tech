import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const COLORS = {
  text: {
    primary: '#FFFFFF',
  },
  map: {
    background: '#000000',
    marker: '#FFFF99',
  },
};

const Map: React.FC = () => {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.mapTitle}>Farm Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={[
          {
            elementType: "geometry",
            stylers: [
              {
                color: COLORS.map.background,
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: COLORS.map.background,
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: COLORS.map.marker,
              },
            ],
          },
        ]}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          pinColor={COLORS.map.marker}
        />
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