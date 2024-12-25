import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const CaseToSection = () => {
  const [Description, setDescription] = useState('');
  const [BNS_Section, setSection] = useState('');

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://192.168.29.175:5000/predict', { Description });
      setSection(response.data.BNS_Section);
    } catch (error) {
      console.error('Error:', error);
      setSection('Error fetching section. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Case to Section Mapper</Title>
            <Paragraph style={styles.subtitle}>
              Enter the description of the case below, and we will predict the most relevant legal section for it.
            </Paragraph>
          </Card.Content>
        </Card>

        <TextInput
          style={styles.input}
          placeholder="Enter Case Description"
          placeholderTextColor="#9e9e9e"
          multiline
          numberOfLines={4}
          value={Description}
          onChangeText={setDescription}
        />

        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handlePredict}
        >
          Predict Section
        </Button>

        {BNS_Section !== '' && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>Predicted BNS Section</Title>
              <Paragraph style={styles.resultText}>{BNS_Section}</Paragraph>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#6200ea',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CaseToSection;
