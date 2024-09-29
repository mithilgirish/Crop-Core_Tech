import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const Banner = () => (
  <View style={styles.banner}>
    <Image source={{ uri: 'https://example.com/pear-image.jpg' }} style={styles.bannerImage} />
    <Text style={styles.bannerTitle}>Banner title</Text>
    <View style={styles.dots}>
      {[...Array(4)].map((_, i) => (
        <View key={i} style={[styles.dot, i === 0 && styles.activeDot]} />
      ))}
    </View>
  </View>
);

const CategoryItem = ({ title, imageUri }: { title: string; imageUri: string }) => (
  <View style={styles.categoryItem}>
    <Image source={{ uri: imageUri }} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{title}</Text>
  </View>
);

const ProductItem = ({ name, price, imageUri }: { name: string; price: string; imageUri: string }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: imageUri }} style={styles.productImage} />
    <Text style={styles.productBrand}>Brand</Text>
    <Text style={styles.productName}>{name}</Text>
    <Text style={styles.productPrice}>{price}</Text>
  </View>
);

const Ecomm = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="gray" />
          <Text style={styles.searchText}>Search</Text>
        </View>
        <Banner />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryItem title="Title" imageUri="https://example.com/pears.jpg" />
            <CategoryItem title="Title" imageUri="https://example.com/watermelon.jpg" />
            <CategoryItem title="Title" imageUri="https://example.com/vegetables.jpg" />
            <CategoryItem title="Title" imageUri="https://example.com/fruit.jpg" />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <View style={styles.productGrid}>
            <ProductItem name="Product name" price="Rs.1000" imageUri="https://example.com/radishes.jpg" />
            <ProductItem name="Product name" price="Rs.750" imageUri="https://example.com/mushrooms.jpg" />
            <ProductItem name="Product name" price="Rs.400" imageUri="https://example.com/carrots.jpg" />
          </View>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 10,
  },
  searchText: {
    marginLeft: 10,
    color: 'gray',
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  banner: {
    height: 200,
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryTitle: {
    marginTop: 5,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productBrand: {
    color: 'gray',
    fontSize: 12,
  },
  productName: {
    fontSize: 14,
  },
  productPrice: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default Ecomm;