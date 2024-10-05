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
  primary: '#1E88E5',
  secondary: '#3949AB',
  accent: '#297d65',
  background: {
    start: 'black',
    end: '#dba614',
  },
  card: {
    start: '#dbc51a',
    end: '#2d5203',
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
  { id: 'veg-1', name: 'Tomato', price: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg', category: 'vegetables', description: 'Fresh, ripe tomatoes perfect for salads and cooking' },
  { id: 'veg-2', name: 'Potato', price: 30, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg', category: 'vegetables', description: 'Versatile potatoes ideal for various dishes' },
  { id: 'veg-3', name: 'Onion', price: 35, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Onion_on_White.JPG', category: 'vegetables', description: 'Essential cooking ingredient with strong flavor' },
  { id: 'veg-4', name: 'Cabbage', price: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Cabbage_and_cross_section_on_white.jpg', category: 'vegetables', description: 'Crisp, fresh cabbage for salads and cooking' },
  { id: 'veg-5', name: 'Cauliflower', price: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Chou-fleur_02.jpg', category: 'vegetables', description: 'White, tender cauliflower florets' },
  { id: 'veg-6', name: 'Brinjal', price: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Solanum_melongena_24_08_2012_%281%29.JPG', category: 'vegetables', description: 'Purple eggplants perfect for various cuisines' },
  { id: 'veg-7', name: 'Okra', price: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Hong_Kong_Okra_Aug_25_2012.JPG', category: 'vegetables', description: 'Fresh lady fingers for traditional recipes' },
  { id: 'veg-8', name: 'Carrot', price: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fresh_orange_carrots.jpg', category: 'vegetables', description: 'Sweet and crunchy orange carrots' },
  { id: 'veg-9', name: 'Spinach', price: 30, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Spinacia_oleracea_Spinazie_bloeiend.jpg', category: 'vegetables', description: 'Nutrient-rich green leafy vegetable' },
  { id: 'veg-10', name: 'Radish', price: 35, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/India_-_Koyambedu_Market_-_Radishes_01_%283986302317%29.jpg', category: 'vegetables', description: 'Crunchy white radishes' },
  { id: 'veg-11', name: 'Bitter Gourd', price: 55, imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d1/Bittergourd.jpg', category: 'vegetables', description: 'Unique bitter flavor, rich in nutrients' },
  { id: 'veg-12', name: 'Bottle Gourd', price: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Courge_encore_verte.jpg', category: 'vegetables', description: 'Versatile gourd for various dishes' },
  { id: 'veg-13', name: 'Cucumber', price: 30, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/ARS_cucumber.jpg', category: 'vegetables', description: 'Cool and refreshing cucumbers' },
  { id: 'veg-14', name: 'Pumpkin', price: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/FrenchMarketPumpkinsB.jpg', category: 'vegetables', description: 'Sweet pumpkin for soups and curries' },
  { id: 'veg-15', name: 'Peas', price: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Peas_in_pods_-_Studio.jpg', category: 'vegetables', description: 'Sweet green peas in pods' },

  // Fruits
  { id: 'fruit-1', name: 'Mango', price: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg', category: 'fruits', description: 'Sweet and juicy seasonal mangoes' },
  { id: 'fruit-2', name: 'Banana', price: 50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg', category: 'fruits', description: 'Energy-rich yellow bananas' },
  { id: 'fruit-3', name: 'Apple', price: 120, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg', category: 'fruits', description: 'Crisp and sweet red apples' },
  { id: 'fruit-4', name: 'Guava', price: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Guava_ID.jpg', category: 'fruits', description: 'Fresh guavas rich in vitamin C' },
  { id: 'fruit-5', name: 'Grapes', price: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Abhar-iran.JPG', category: 'fruits', description: 'Sweet seedless grapes' },
  { id: 'fruit-6', name: 'Papaya', price: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Papaya_cross_section_BNC.jpg', category: 'fruits', description: 'Ripe papayas rich in nutrients' },
  { id: 'fruit-7', name: 'Pomegranate', price: 130, imageUrl:'https://upload.wikimedia.org/wikipedia/commons/5/51/Pomegranate_%28opened%29.jpg', category: 'fruits', description: 'Ruby red pomegranate with juicy arils' },
  { id: 'fruit-8', name: 'Orange', price: 80, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Orange-Whole-%26-Split.jpg', category: 'fruits', description: 'Juicy citrus oranges' },
  { id: 'fruit-9', name: 'Lemon', price: 40, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Lemon.jpg', category: 'fruits', description: 'Tangy yellow lemons' },
  { id: 'fruit-10', name: 'Watermelon', price: 110, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg', category: 'fruits', description: 'Sweet and refreshing watermelon' },
  { id: 'fruit-11', name: 'Muskmelon', price: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Muskmelon.jpg', category: 'fruits', description: 'Fragrant and sweet muskmelon' },
  { id: 'fruit-12', name: 'Pineapple', price: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg', category: 'fruits', description: 'Tropical sweet pineapple' },
  { id: 'fruit-13', name: 'Lychee', price: 150, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Litchi_chinensis_fruits.JPG', category: 'fruits', description: 'Sweet and fragrant lychees' },
  { id: 'fruit-14', name: 'Coconut', price: 60, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Coconut_on_white_background.jpg', category: 'fruits', description: 'Fresh coconuts for water and meat' },
  { id: 'fruit-15', name: 'Sapota', price: 80, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Chikoo.JPG', category: 'fruits', description: 'Sweet chikoo with unique flavor' },

  // Seeds
  { id: 'seed-1', name: 'Mustard Seeds', price: 45, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Mustard.png', category: 'seeds', description: 'Essential spice for Indian cooking' },
  { id: 'seed-2', name: 'Sunflower Seeds', price: 120, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Whole_Sunflower_seed.jpg', category: 'seeds', description: 'Nutritious sunflower seeds for planting' },
  { id: 'seed-3', name: 'Sesame Seeds', price: 160, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Sesame_in_Hainan_-_05.JPG', category: 'seeds', description: 'Tiny seeds with rich nutty flavor' },
  { id: 'seed-4', name: 'Groundnut Seeds', price: 100, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Valencia_peanuts.jpg', category: 'seeds', description: 'Quality groundnut seeds for planting' },
  { id: 'seed-5', name: 'Cotton Seeds', price: 90, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Cotton.JPG', category: 'seeds', description: 'High-yield cotton seeds' },
  { id: 'seed-6', name: 'Maize Seeds', price: 80, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/GEM_corn.jpg', category: 'seeds', description: 'Premium corn seeds for planting' },
  { id: 'seed-7', name: 'Wheat Seeds', price: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Vehn%C3%A4pelto_6.jpg', category: 'seeds', description: 'Quality wheat seeds for sowing' },
  { id: 'seed-8', name: 'Rice Seeds', price: 85, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg', category: 'seeds', description: 'High-yielding rice seeds' },
  { id: 'seed-9', name: 'Soybean Seeds', price: 95, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Bhatmaas.jpg', category: 'seeds', description: 'Protein-rich soybean seeds' },
  { id: 'seed-10', name: 'Chilli Seeds', price: 110, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Bhoot_Jolokia_%28_Ghost_Chili_pepper_%29.jpg', category: 'seeds', description: 'Seeds for growing spicy chilies' },
  { id: 'seed-11', name: 'Coriander Seeds', price: 65, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Coriander_Seeds.jpg', category: 'seeds', description: 'Aromatic coriander seeds' },
  { id: 'seed-12', name: 'Fenugreek Seeds', price: 55, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/2017_0102_fenugreek_seeds.jpg', category: 'seeds', description: 'Flavorful fenugreek seeds' },
  { id: 'seed-13', name: 'Cumin Seeds', price: 130, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Black_Cumin.jpg', category: 'seeds', description: 'Essential spice for many cuisines' },
  { id: 'seed-14', name: 'Jowar Seeds', price: 75, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Sorghum_bicolor03.jpg', category: 'seeds', description: 'Drought-resistant sorghum seeds' },
  { id: 'seed-15', name: 'Bajra Seeds', price: 70, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Grain_millet%2C_early_grain_fill%2C_Tifton%2C_7-3-02.jpg', category: 'seeds', description: 'Nutritious pearl millet seeds' },

  // Supplies
  { id: 'supply-1', name: 'Urea Fertilizer', price: 300, imageUrl: 'https://sustainablemacleod.org.au/wp-content/uploads/2022/08/fertilisers-scaled.jpg', category: 'supplies', description: 'Essential nitrogen fertilizer' },
  { id: 'supply-2', name: 'Organic Pesticide', price: 250, imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/8/335947978/GR/KG/VR/183091867/organic-pesticides-1000x1000.jpg', category: 'supplies', description: 'Safe and effective pest control' },
  { id: 'supply-3', name: 'Drip Irrigation Kit', price: 1500, imageUrl: 'https://c7.alamy.com/comp/2G2JW3R/drip-irrigation-nozzle-in-the-ground-near-the-cucumber-seedling-organic-farming-2G2JW3R.jpg', category: 'supplies', description: 'Water-efficient irrigation system' },
  { id: 'supply-4', name: 'Seedling Trays', price: 120, imageUrl: 'https://m.media-amazon.com/images/I/71X9UMg6feL._SL1500_.jpg', category: 'supplies', description: 'Perfect for starting seeds' },
  { id: 'supply-5', name: 'Organic Compost', price: 200, imageUrl: 'https://www.thespruce.com/thmb/zA6ne4fkZnj2MHGt19fX1Ny3iVw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SPR-what-is-mushroom-compost-6665515-01_3413-97be9479b42142ba944b64e2c7d5d4d3.jpg', category:'supplies',description: 'Organic manure and compost for plants' },
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