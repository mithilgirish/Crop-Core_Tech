import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

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
  neonGreen: '#39FF14',
};

const ChatbotApp = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [userText, setUserText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "AIzaSyB7B-Ftgk7lSzDXUzZq4Jhj77VBiFbdlIg";

  useEffect(() => {
    // Add the welcome message when the component mounts
    const welcomeMessage: Message = {
      id: 'welcome',
      text: "Hello, your Farming Assistant here!\nWhat can I help you with?",
      sender: 'bot',
    };
    setMessages([welcomeMessage]);
  }, []);

  const getChatResponse = async () => {
    if (userText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setUserText('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userText,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.candidates[0].content.parts[0].text;

      responseText = responseText.replace(/\*+/g, '');

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <LinearGradient
      colors={item.sender === 'user' ? [COLORS.card.start, COLORS.card.end] : [COLORS.secondary, COLORS.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}
    >
      <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.botMessageText]}>
        {item.text}
      </Text>
    </LinearGradient>
  );

  return (
    <LinearGradient
      colors={[COLORS.background.start, COLORS.background.end]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.neonGreen} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Farming Assistant</Text>
          </View>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messageList}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              value={userText}
              onChangeText={setUserText}
              placeholder="Type your question here..."
              style={styles.input}
              placeholderTextColor={COLORS.text.secondary}
            />
            <TouchableOpacity
              style={[styles.sendButton, isLoading && styles.disabledButton]}
              onPress={getChatResponse}
              disabled={isLoading}
            >
              <Ionicons name="send" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>
          {isLoading && (
            <ActivityIndicator size="large" color={COLORS.neonGreen} style={styles.loadingIndicator} />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  messageList: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 12,
    marginVertical: 6,
    maxWidth: '80%',
    elevation: 3,
    shadowColor: COLORS.neonGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: COLORS.text.primary,
  },
  botMessageText: {
    color: COLORS.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  input: {
    flex: 1,
    height: 44,
    marginRight: 12,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: COLORS.background.end,
    color: COLORS.text.primary,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ChatbotApp;