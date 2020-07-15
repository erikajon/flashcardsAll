import React, { useCallback } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Mixpanel from 'react-native-mixpanel';
import uuid from 'react-native-unique-id';
import AsyncStorage from '@react-native-community/async-storage';

import {mainRoot} from '../../index';
import {Button} from '../../components/Button';
import { HAS_USER_ONBOARDED, HAS_OPTED_IN_FOR_ANALYTICS } from '../../constants';

const illustration = require('../../assets/images/analytics.png');

export const OnboardingAnalyticsScreen = () => {
  const acceptAndgoToMainRoot = useCallback(async () => {
    try {
      // this will ensure that returning
      // user does not see onboarding again
      await AsyncStorage.setItem(HAS_USER_ONBOARDED, 'true');

      const mixpanelId = await uuid();
      Mixpanel.optInTracking();
      Mixpanel.createAlias(mixpanelId);
      Mixpanel.registerSuperProperties({ app: 'GCSE Chemistry', examBoard: 'AQA' });
      await AsyncStorage.setItem(HAS_OPTED_IN_FOR_ANALYTICS, 'true');
      
      Navigation.setRoot(mainRoot);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const denyAndgoToMainRoot = useCallback(async () => {
    Mixpanel.optOutTracking();
    // this will ensure that returning
    // user does not see onboarding again
    try {
      await AsyncStorage.setItem(HAS_USER_ONBOARDED, 'true');
      await AsyncStorage.setItem(HAS_OPTED_IN_FOR_ANALYTICS, 'false');
    } catch (err) {
      console.log(err);
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
        <Button type="default" label="Maybe next time" onClick={denyAndgoToMainRoot} width={Dimensions.get('window').width * 0.8} />
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
