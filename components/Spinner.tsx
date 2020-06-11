import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';

export const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#636BF6" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 100,
  },
});
