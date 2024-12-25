// ReadNews.tsx

import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type RouteParams = {
  news: {
    urlToImage: string;
    source: { name: string };
    title: string;
    description: string;
  };
};

function ReadNews() {
  const route = useRoute();
  const { news } = route.params as RouteParams;

  useEffect(() => {
    console.log(news);
  }, [news]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: news.urlToImage }} style={styles.image} />
      <Text style={styles.source}>{news.source.name}</Text>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.description}>{news.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  source: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default ReadNews;
