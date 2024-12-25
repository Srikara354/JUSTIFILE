// NewsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, Text, ActivityIndicator, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/HomeNav';

// Define your navigation type
type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const NewsScreen = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NewsScreenNavigationProp>();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=law+india&apiKey=47151991aa5a477a95373fd5b81a12bb');
        const result = await response.json();
        setNewsList(result.articles);
      } catch (error) {
        setError('Error fetching news');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderItem = ({ item }: { item: { urlToImage: string, title: string, url: string } }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ReadNews', { news: item })} // Correctly pass the news object
      style={{ width: Dimensions.get('screen').width * 0.9 }}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={styles.image}
      />
      <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newsList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginRight: 1,
    borderRadius: 10,
  },
  image: {
    marginTop:20,
    height: 150,
    width: 330,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
});

export default NewsScreen;
