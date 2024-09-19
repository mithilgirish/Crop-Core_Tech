import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Text,
  Switch,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotSettings {
  darkMode: boolean;
  voiceInput: boolean;
  voiceOutput: boolean;
}

const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatbotSettings>({
    darkMode: false,
    voiceInput: false,
    voiceOutput: false,
  });
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'You said: "${inputText}". This is a simulated bot response.',
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleSetting = (setting: keyof ChatbotSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, [setting]: !prevSettings[setting] }));
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.botMessage,
      settings.darkMode && styles.darkModeMessage,
    ]}>
      <Text style={[styles.messageText, settings.darkMode && styles.darkModeText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, settings.darkMode && styles.darkModeContainer]}>
      <TouchableOpacity
        onPress={() => setIsSettingsVisible(true)}
        style={styles.settingsButton}
      >
        <Ionicons name="settings-outline" size={24} color={settings.darkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, settings.darkMode && styles.darkModeText]}
            placeholder="Type a message..."
            placeholderTextColor={settings.darkMode ? '#888' : '#999'}
            value={inputText}
            onChangeText={setInputText}
          />
          {settings.voiceInput && (
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.disabledButton]}
            onPress={handleSend}
            disabled={isLoading}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={isSettingsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, settings.darkMode && styles.darkModeContainer]}>
            <Text style={[styles.modalTitle, settings.darkMode && styles.darkModeText]}>Settings</Text>
            <View style={styles.settingItem}>
              <Text style={settings.darkMode && styles.darkModeText}>Dark Mode</Text>
              <Switch value={settings.darkMode} onValueChange={() => toggleSetting('darkMode')} />
            </View>
            <View style={styles.settingItem}>
              <Text style={settings.darkMode && styles.darkModeText}>Voice Input</Text>
              <Switch value={settings.voiceInput} onValueChange={() => toggleSetting('voiceInput')} />
            </View>
            <View style={styles.settingItem}>
              <Text style={settings.darkMode && styles.darkModeText}>Voice Output</Text>
              <Switch value={settings.voiceOutput} onValueChange={() => toggleSetting('voiceOutput')} />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  darkModeContainer: {
    backgroundColor: '#222',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  darkModeMessage: {
    backgroundColor: '#444',
  },
  messageText: {
    fontSize: 16,
  },
  darkModeText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderTopWidth: 1,
    paddingBottom: 100,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    backgroundColor: '#FF9500',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatbotApp;