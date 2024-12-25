import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyBvX78w_9QXleiS7GB5kdlE2VahjDIZUJQ";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Add the user's input to the conversation
    const newMessages = [
      ...messages,
      { role: 'user', parts: [input] },
    ];
    setMessages(newMessages);
  
    try {
      // Check if this is the first message; history cannot be empty
      const chatHistory = newMessages.length > 0
        ? newMessages.map(msg => ({
            role: msg.role,
            parts: msg.parts, // Ensure 'parts' exists
          }))
        : [{ role: 'user', parts: [input] }]; // Initialize history with the user's message
  
      // Start a new chat session with the updated history
      const chatSession = model.startChat({
        generationConfig,
        history: chatHistory,
      });
  
      // Send the user's message and get the bot's response
      const result = await chatSession.sendMessage(input);
      const botReply = result.response.parts.join(' '); // Combine parts into a single string
  
      // Add the bot's reply to the messages
      setMessages([
        ...newMessages,
        { role: 'bot', parts: [botReply] },
      ]);
      setInput('');
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={msg.role === 'user' ? styles.userMessage : styles.botMessage}
          >
            {msg.role === 'user' ? "You: " : "Bot: "}
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Chatbot;
