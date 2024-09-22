import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { 
  Ionicons, 
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data
const posts = [
  { id: '1', author: 'John Doe', content: 'Just harvested my corn field!', likes: 15, comments: 3 },
  { id: '2', author: 'Jane Smith', content: 'Any tips for dealing with pests in organic farming?', likes: 8, comments: 12 },
  // Add more mock posts here
];

const events = [
  { id: '1', title: 'Annual Farmer\'s Market', date: '2024-10-15', location: 'Central Square' },
  { id: '2', title: 'Sustainable Farming Workshop', date: '2024-11-02', location: 'Community Center' },
  // Add more mock events here
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

const EventCard = ({ item }: { item: typeof events[0] }) => (
  <LinearGradient
    colors={['#4CAF50', '#45a049']}
    style={styles.eventCard}
  >
    <Text style={styles.eventTitle}>{item.title}</Text>
    <Text style={styles.eventDate}>{item.date}</Text>
    <Text style={styles.eventLocation}>{item.location}</Text>
  </LinearGradient>
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

const EventsScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={events}
      renderItem={({ item }) => <EventCard item={item} />}
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

// Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Events') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="FarmerConnect" 
          component={TabNavigator} 
          options={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Roboto_700Bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    fontFamily: 'Roboto_700Bold',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Roboto_400Regular',
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
    fontFamily: 'Roboto_400Regular',
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
    fontFamily: 'Roboto_700Bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 3,
    fontFamily: 'Roboto_400Regular',
  },
  eventLocation: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Roboto_400Regular',
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
    fontFamily: 'Roboto_700Bold',
  },
  profileBio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Roboto_400Regular',
  },
});

export default App;