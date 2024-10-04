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
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Types
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

type Category = {
  id: string;
  name: string;
};

type CartItem = Product & {
  quantity: number;
};

// Constants
const COLORS = {
  primary: '#1fa6a4',
  secondary: '#27489c',
  accent: '#00ACC1',
  background: {
    start: 'black',
    end: '#a6701f',
  },
  card: {
    start: '#3c9e60',
    end: '#1d452c',
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
  { id: 'product-1', name: 'Carrot', price: 75, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fresh_orange_carrots.jpg', category: 'vegetables', description: 'Fresh, organic carrots' },
  { id: 'product-2', name: 'Broccoli', price: 120, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Broccoli_bunches.jpg', category: 'vegetables', description: 'Nutrient-rich broccoli' },
  { id: 'product-3', name: 'Carrot', price: 75, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fresh_orange_carrots.jpg', category: 'vegetables', description: 'Fresh, organic carrots' },
  // ... Add more products with the same structure
];

// Components
const Header: React.FC<{ cartItemCount: number; onCartPress: () => void }> = ({ cartItemCount, onCartPress }) => (
  <View style={styles.header}>
    <Text style={styles.logo}>Crop Core Market 🛍</Text>
    <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
      <Text style={styles.icon}>🛒</Text>
      {cartItemCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

const CategoryFilter: React.FC<{
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, selectedCategory, onSelectCategory }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={categories}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === item.id && styles.selectedCategoryButton,
        ]}
        onPress={() => onSelectCategory(item.id)}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategory === item.id && styles.selectedCategoryButtonText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.categoryContainer}
  />
);

const ProductCard: React.FC<{
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
  isInCart: boolean;
}> = ({ product, onPress, onAddToCart, isInCart }) => (
  <TouchableOpacity onPress={onPress} style={styles.productCard}>
    <LinearGradient
      colors={[COLORS.card.start, COLORS.card.end]}
      style={styles.cardGradient}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>₹{product.price}</Text>
      <TouchableOpacity
        style={[styles.addToCartButton, isInCart && styles.removeFromCartButton]}
        onPress={onAddToCart}
      >
        <Text style={styles.addToCartButtonText}>
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  </TouchableOpacity>
);

const ProductModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onAddToCart: () => void;
  isInCart: boolean;
}> = ({ product, onClose, onAddToCart, isInCart }) => {
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
            <Image source={{ uri: product.imageUrl }} style={styles.modalProductImage} />
            <Text style={styles.modalProductName}>{product.name}</Text>
            <Text style={styles.modalProductPrice}>₹{product.price}</Text>
            <Text style={styles.modalProductDescription}>{product.description}</Text>
            <TouchableOpacity
              style={[styles.modalAddToCartButton, isInCart && styles.modalRemoveFromCartButton]}
              onPress={onAddToCart}
            >
              <Text style={styles.addToCartButtonText}>
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const CartModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, change: number) => void;
  onRemoveFromCart: (productId: string) => void;
}> = ({ visible, onClose, cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
            {cartItems.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            ) : (
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image source={{ uri: item.imageUrl }} style={styles.cartItemImage} />
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => onUpdateQuantity(item.id, -1)}
                          style={styles.quantityButton}
                        >
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => onUpdateQuantity(item.id, 1)}
                          style={styles.quantityButton}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => onRemoveFromCart(item.id)}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
            {cartItems.length > 0 && (
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ₹{totalAmount}</Text>
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => {
                    Alert.alert('Order Placed', 'Thank you for your order!');
                    onClose();
                  }}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
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
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.filter((item) => item.id !== product.id);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const isInCart = (productId: string) => cart.some((item) => item.id === productId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[COLORS.background.start, COLORS.background.end]}
        style={styles.container}
      >
        <Header cartItemCount={cart.length} onCartPress={() => setCartVisible(true)} />
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
              onAddToCart={() => handleAddToCart(item)}
              isInCart={isInCart(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
        <CartModal
          visible={cartVisible}
          onClose={() => setCartVisible(false)}
          cartItems={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
        />
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
          isInCart={selectedProduct ? isInCart(selectedProduct.id) : false}
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
  cartButton: {
    position: 'relative',
  },
  icon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 4,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.accent,
  },
  categoryButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
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
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  removeFromCartButton: {
    backgroundColor: '#D32F2F',
  },
  addToCartButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
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
  modalProductImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  modalProductPrice: {
    fontSize: 18,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  modalProductDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  modalAddToCartButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalRemoveFromCartButton: {
    backgroundColor: '#D32F2F',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  cartItemImage: {
    width: 80,
    height: 80,
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
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 12,
  },
  removeButtonText: {
    color: COLORS.text.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyCartText: {
    color: COLORS.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: COLORS.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
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