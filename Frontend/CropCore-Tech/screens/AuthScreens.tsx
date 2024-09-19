// screens/AuthScreens.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Styles {
  container: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  outlineButton: ViewStyle;
  outlineButtonText: TextStyle;
  smallText: TextStyle;
  linkText: TextStyle;
  input: ViewStyle;
  forgotPassword: TextStyle;
  googleButton: ViewStyle;
  googleIcon: ImageStyle;
  googleButtonText: TextStyle;
}

export const StartScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
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

export const LoginScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
    <Text style={styles.title}>CROP-CORE</Text>
    <Text style={styles.subtitle}>TECH</Text>
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <Text style={styles.forgotPassword}>Forgot Password?</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    {/* Add Google Sign-In button here */}
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.smallText}>
        New Around Here? <Text style={styles.linkText}>SignUp</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

export const SignUpScreen: React.FC<{ navigation: NavigationProp }> = ({ navigation }) => (
  <View style={styles.container}>
    <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
    <Text style={styles.title}>CROP-CORE</Text>
    <Text style={styles.subtitle}>TECH</Text>
    <TextInput style={styles.input} placeholder="Name" />
    <TextInput style={styles.input} placeholder="Email" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry />
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    {/* Add Google Sign-In button here */}
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.smallText}>
        Already have an account? <Text style={styles.linkText}>Login</Text>
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create<Styles>({
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