import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import SpeechToText from './components/SpeechToText';
import CaseToSection from './components/CaseToSection';
import News from './components/News';
import Chatbot from './components/Chatbot';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Welcome to JustiFile</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Case Mapper')}
      >
        Case to Section Mapper
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Speech to Text')}
      >
        Speech to Text
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Legal News')}
      >
        Legal News
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('ChatBot')}
      >
        ChatBot
      </Button>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('PDF Viewer')}
      >
        Open PDF
      </Button>

    </View>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#6200ea' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Case Mapper" component={CaseToSection} />
          <Stack.Screen name="Speech to Text" component={SpeechToText} />
          <Stack.Screen name="Legal News" component={News} />
          <Stack.Screen name="ChatBot" component={Chatbot} />
         
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#6200ea',
  },
});

export default App;
