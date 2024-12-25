import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = () => {
  const source = { uri: '../assets/a2023-45.pdf' }; // Reference the PDF in assets

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        onError={(error) => {
          console.error('PDF load error:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
