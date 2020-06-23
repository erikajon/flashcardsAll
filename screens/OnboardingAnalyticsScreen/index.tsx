import React, { useCallback } from 'react';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {mainRoot} from '../../index';
import {Button} from '../../components/Button';
import{HAS_ACCEPTED_ANALYTICS} from '../../constants';

const illustration = require('../../assets/images/analytics.png');

export const OnboardingAnalyticsScreen = () => {
  const acceptAndgoToMainRoot = useCallback(async () => {
    try {
      await AsyncStorage.setItem(HAS_ACCEPTED_ANALYTICS, 'true');
    } catch (err) {
      console.log('err', err);
    }
    Navigation.setRoot(mainRoot);
  }, []);
  const denyAndgoToMainRoot = useCallback(async () => {
    try {
      await AsyncStorage.setItem(HAS_ACCEPTED_ANALYTICS, 'false');
    } catch (err) {
      console.log('err', err);
    }
    Navigation.setRoot(mainRoot);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={illustration} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Are you happy for us to collect analytics?</Text>
        <Text style={styles.subtitle}>It helps us make the app better for you and other users. You can always update your preference in Settings. For our Privacy Policy, please visit udeavour.com/privacy</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.ctaMainContainer}>
          <Button type="brand" label="Count me in" onClick={acceptAndgoToMainRoot} width={Dimensions.get('window').width * 0.8} />
        </View>
        
        <Button type="default" label="Maybe next time" onClick={acceptAndgoToMainRoot} width={Dimensions.get('window').width * 0.8} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.4,
    marginTop: 25,
    marginBottom: 25,
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 24,
    color: '#353636',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#909296',
    marginBottom: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 25,
  },
  ctaMainContainer: {
    marginBottom: 10,
  },
})
