import React, { useCallback } from 'react';
import { Navigation } from 'react-native-navigation';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {mainRoot} from '../../index';
import {Button} from '../../components/Button';

const onboardingIllustration = require('../../assets/images/onboarding.png');

export const WelcomeScreen = (props) => {
  console.log('props', props);
  const goToMainRoot = useCallback(() => {
    Navigation.push(props.componentId, {
      component: {
        name: 'OnboardingAnalyticsScreen',
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={onboardingIllustration} resizeMode="center" />
      <Text style={styles.title}>AQA GCSE Chemistry</Text>
      <Text style={styles.subtitle}>by UDEAVOUR</Text>
      <View style={styles.buttonContainer}>
        <Button type="brand" label="Let's get started" onClick={goToMainRoot} width={Dimensions.get('window').width * 0.8} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    color: '#353636',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    color: '#666C73',
    marginBottom: 25,
  },
  buttonContainer: {
    marginBottom: 25,
  },
})
