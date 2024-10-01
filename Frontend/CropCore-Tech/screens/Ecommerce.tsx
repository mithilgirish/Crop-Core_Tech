import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Types
type Product = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
};

type Category = {
  id: string;
  name: string;
};

// Constants
const COLORS = {
  primary: '#1E88E5',
  secondary: '#3949AB',
  accent: '#00ACC1',
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
};

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'seeds', name: 'Seeds' },
  { id: 'supplies', name: 'Supplies' },
];

// Generate 50 static products
const PRODUCTS: Product[] = Array.from({ length: 50 }, (_, index) => ({
  id: `product-${index + 1}`,
  name: `Product ${index + 1}`,
  price: `$${(Math.random() * 20 + 1).toFixed(2)}`,
  imageUrl: '/api/placeholder/100/100',
  category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].id,
}));

// Components
const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.logo}>AgriMarket</Text>
    <View style={styles.iconContainer}>
      <TouchableOpacity>
        <Text style={styles.icon}>❤️</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.icon}>🛒</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CategoryFilter: React.FC<{
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, selectedCategory, onSelectCategory }) => (
  <View style={styles.categoryContainer}>
    {categories.map((category) => (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryButton,
          selectedCategory === category.id && styles.selectedCategoryButton,
        ]}
        onPress={() => onSelectCategory(category.id)}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === category.id && styles.selectedCategoryButtonText,
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <View style={styles.productCard}>
    <LinearGradient
      colors={[COLORS.card.start, COLORS.card.end]}
      style={styles.cardGradient}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </LinearGradient>
  </View>
);

const AgricultureEcommerceScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.background.start, COLORS.background.end]}
        style={styles.container}
      >
        <Header />
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
    marginLeft: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.accent,
  },
  categoryButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedCategoryButtonText: {
    color: COLORS.text.primary,
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
});

export default AgricultureEcommerceScreen;