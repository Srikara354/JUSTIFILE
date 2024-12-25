import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import Voice from 'react-native-voice';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => setText(event.value[0]);
    Voice.onSpeechError = (error) => console.error('Speech Error:', error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for speech recognition.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    const hasPermission = await requestAudioPermission();
    if (hasPermission) {
      try {
        await Voice.start('en-US');
      } catch (error) {
        console.error('Error starting voice recognition:', error);
      }
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech to Text</Text>
      <Text style={styles.text}>{text || 'Say something...'}</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={isListening ? stopListening : startListening}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ea',
  },
});

export default SpeechToText;
