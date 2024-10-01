
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
  Modal,
  ScrollView,
  Dimensions,
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

const PRODUCTS: Product[] = [
  // Vegetables
  { id: 'product-1', name: 'Carrot', price: '₹75', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fresh_orange_carrots.jpg', category: 'vegetables' },
  { id: 'product-2', name: 'Broccoli', price: '₹120', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Broccoli_bunches.jpg', category: 'vegetables' },
  { id: 'product-3', name: 'Tomato', price: '₹60', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Tomato.jpg', category: 'vegetables' },
  { id: 'product-4', name: 'Spinach', price: '₹40', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Collard-Greens-Bundle.jpg', category: 'vegetables' },
  { id: 'product-5', name: 'Bell Pepper', price: '₹80', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Bell_Pepper.jpg', category: 'vegetables' },

  // Fruits
  { id: 'product-6', name: 'Apple', price: '₹100', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Honeycrisp.jpg', category: 'fruits' },
  { id: 'product-7', name: 'Banana', price: '₹50', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cavendish_banana_from_Maracaibo.jpg', category: 'fruits' },
  { id: 'product-8', name: 'Orange', price: '₹80', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Nagpur_orange_article.JPG', category: 'fruits' },
  { id: 'product-9', name: 'Strawberry', price: '₹200', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg', category: 'fruits' },
  { id: 'product-10', name: 'Blueberry', price: '₹250', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg', category: 'fruits' },

  // Seeds
{ id: 'product-11', name: 'Sunflower Seeds', price: '₹150', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Sunflower_seeds.JPG', category: 'seeds' },
  { id: 'product-12', name: 'Pumpkin Seeds', price: '₹180', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Pumpkin_Seeds_%28matured%29.jpg', category: 'seeds' },
  { id: 'product-13', name: 'Chia Seeds', price: '₹220', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Seed_of_chia_%28Salvia_hispanica%29Salvia_hispanica_group.jpg', category: 'seeds' },
  { id: 'product-14', name: 'Flax Seeds', price: '₹200', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Brown_Flax_Seeds.jpg', category: 'seeds' },
  { id: 'product-15', name: 'Sesame Seeds', price: '₹130', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Sesame-Seeds.jpg', category: 'seeds' },

  // Supplies
  { id: 'product-16', name: 'Garden Gloves', price: '₹350', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Trockenhandschuh.jpg', category: 'supplies' },
  { id: 'product-17', name: 'Watering Can', price: '₹450', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Green_watering_can.jpg', category: 'supplies' },
  { id: 'product-18', name: 'Pruning Shears', price: '₹400', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Secateur_ouvert.jpg/800px-Secateur_ouvert.jpg', category: 'supplies' },
  { id: 'product-19', name: 'Plant Food', price: '₹250', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Les_Plantes_Cultivades._Cereals._Imatge_119.jpg', category: 'supplies' },
  { id: 'product-20', name: 'Garden Trowel', price: '₹300', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Dreieckskelle.JPG', category: 'supplies' },
]; 

// Components
const Header: React.FC<{ onCartPress: () => void }> = ({ onCartPress }) => (
  <View style={styles.header}>
    <Text style={styles.logo}>AgriMarket</Text>
    <View style={styles.iconContainer}>
      <TouchableOpacity>
        <Text style={styles.icon}>❤️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCartPress}>
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
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
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
  </ScrollView>
);

const ProductCard: React.FC<{ product: Product; onPress: () => void }> = ({ product, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.productCard}>
    <LinearGradient
      colors={[COLORS.card.start, COLORS.card.end]}
      style={styles.cardGradient}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const ProductModal: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!product}
      onRequestClose={onClose}
    >
<View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={[COLORS.background.start, COLORS.background.end]}
            style={styles.modalGradient}
          >
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <Text style={styles.productCard}>Category: {product.category}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const CartModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const cartItems = PRODUCTS.slice(0, 5); // Simulating 5 items in cart

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={[COLORS.background.start, COLORS.background.end]}
            style={styles.modalGradient}
          >
            <Text style={styles.modalTitle}>Your Cart</Text>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.imageUrl }} style={styles.cartItemImage} />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>{item.price}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const AgricultureEcommerceScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
<Header onCartPress={() => setCartVisible(true)} />
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => setSelectedProduct(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
        <CartModal visible={cartVisible} onClose={() => setCartVisible(false)} />
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
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
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.accent,
  },
categoryButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartItemImage: {
      width: 50,
      height: 50,
      borderRadius: 4,
      marginRight: 12,
  },
  cartItemInfo: {
      flex: 1,
  },
  cartItemName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text.primary,
  },
  cartItemPrice: {
      fontSize: 14,
      color: COLORS.text.secondary,
  },
  closeButton: {
      backgroundColor: COLORS.accent,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
  },
  closeButtonText: {
      color: COLORS.text.primary,
      fontWeight: 'bold',
  },
});

export default AgricultureEcommerceScreen;