import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const StartScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
    <Text style={styles.title}>CROP-CORE</Text>
    <Text style={styles.subtitle}>TECH</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.outlineButtonText}>Login</Text>
    </TouchableOpacity>
    <Text style={styles.smallText}>
      New Around Here? <Text style={styles.linkText} onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
    </Text>
  </View>
);

const LoginScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
    <Text style={styles.title}>CROP-CORE</Text>
    <Text style={styles.subtitle}>TECH</Text>
    <Text style={styles.heading}>Sign in</Text>
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <Text style={styles.forgotPassword}>Forgot Password?</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <Text style={styles.smallText}>Continue with</Text>
    <TouchableOpacity style={styles.googleButton}>
      <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.smallText}>
        New Around Here? <Text style={styles.linkText}>SignUp</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

const SignUpScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
    <Text style={styles.title}>CROP-CORE</Text>
    <Text style={styles.subtitle}>TECH</Text>
    <Text style={styles.heading}>Sign up</Text>
    <TextInput style={styles.input} placeholder="Name" />
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    <Text style={styles.smallText}>Continue with</Text>
    <TouchableOpacity style={styles.googleButton}>
      <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.smallText}>
        Already have an account? <Text style={styles.linkText}>Login</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

const Stack = createStackNavigator<RootStackParamList>();

const getStarted: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#e6fff9' }
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00a86b',
  },
  subtitle: {
    fontSize: 18,
    color: '#00a86b',
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00a86b',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00a86b',
  },
  outlineButtonText: {
    color: '#00a86b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
    marginTop: 10,
  },
  linkText: {
    color: '#00a86b',
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    color: '#00a86b',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default getStarted;