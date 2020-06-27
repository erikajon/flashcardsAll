import React from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {moduleActions} from '../../storage/realm';
import {flashcardActions} from '../../storage/realm';
import { trackEvent, PROGRESS_RESET } from '../../analytics';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Reset progress',
                'Are you sure you want to reset all of the answered flashcards?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Reset',
                    onPress: () => {
                      trackEvent(PROGRESS_RESET);
                      moduleActions.resetProgress();
                      flashcardActions.resetProgress();
                    },
                  },
                ],
                {cancelable: true},
              );
            }}>
            <Text style={styles.settingsButton}>Reset your progress</Text>
          </TouchableOpacity>

          <Text style={styles.container} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('mailto:support@udeavour.com');
            }}>
            <Text style={styles.settingsButton}>Report an issue</Text>
          </TouchableOpacity>
          <Text style={styles.termsSection}>TERMS</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.udeavour.com/privacy');
            }}>
            <Text style={styles.policySection}>Privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.udeavour.com/terms');
            }}>
            <Text style={styles.policySection}>Terms and Conditions</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

SettingsScreen.options = {
  bottomTab: {
    text: 'Settings',
  },
  topBar: {visible: false},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FAFF',
    flex: 1,
  },
  title: {
    fontSize: 36,
    color: '#666C73',
    marginBottom: 10,
    marginTop: 75,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  settingsButton: {
    height: 50,
    fontSize: 15,
    paddingLeft: 15,
    backgroundColor: '#FFFFFF',
    color: '#636BF6',
    borderColor: '#D4D4D4',
    borderWidth: 0.5,
    paddingTop: 15,
  },
  termsSection: {
    height: 60,
    fontSize: 15,
    paddingLeft: 15,
    backgroundColor: '#F6FAFF',
    color: '#4C515C',
    paddingTop: 30,
  },
  policySection: {
    height: 50,
    fontSize: 15,
    paddingLeft: 15,
    backgroundColor: '#FFFFFF',
    color: '#4C515C',
    borderColor: '#D4D4D4',
    borderWidth: 0.5,
    paddingTop: 15,
  },
});
