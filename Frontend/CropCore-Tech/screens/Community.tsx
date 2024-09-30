import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { 
  Ionicons 
} from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data
const posts = [
  { id: '1', author: 'John Doe', content: 'Just harvested my corn field!', likes: 15, comments: 3 },
  { id: '2', author: 'Jane Smith', content: 'Any tips for dealing with pests in organic farming?', likes: 8, comments: 12 },
];

const events = [
  { id: '1', title: 'Annual Farmer\'s Market', date: '2024-10-15', location: 'Central Square' },
  { id: '2', title: 'Sustainable Farming Workshop', date: '2024-11-02', location: 'Community Center' },
];

// Components
const PostCard = ({ item }: { item: typeof posts[0] }) => (
  <View style={styles.postCard}>
    <Text style={styles.postAuthor}>{item.author}</Text>
    <Text style={styles.postContent}>{item.content}</Text>
    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="heart-outline" size={24} color="#4CAF50" />
        <Text style={styles.actionText}>{item.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#4CAF50" />
        <Text style={styles.actionText}>{item.comments}</Text>
      </TouchableOpacity>
    </View>
  </View>
);


// Screens
const HomeScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard item={item} />}
      keyExtractor={item => item.id}
    />
  </View>
);


const ProfileScreen = () => (
  <View style={styles.container}>
    <Image
      source={{ uri: 'https://via.placeholder.com/150' }}
      style={styles.profileImage}
    />
    <Text style={styles.profileName}>Farmer Brown</Text>
    <Text style={styles.profileBio}>Organic farmer for 20 years. Love sharing knowledge and experiences!</Text>
  </View>
);

// Create navigators
const Stack = createStackNavigator();


const Community = () => {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="FarmerConnect"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#4CAF50',
  },
  eventCard: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Community; 
