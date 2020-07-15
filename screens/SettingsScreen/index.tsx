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
  Switch,
} from 'react-native';
import uuid from 'react-native-unique-id';
import Mixpanel from 'react-native-mixpanel';
import AsyncStorage from '@react-native-community/async-storage';

import {moduleActions} from '../../storage/realm';
import {flashcardActions} from '../../storage/realm';
import { trackEvent, PROGRESS_RESET } from '../../analytics';
import { HAS_OPTED_IN_FOR_ANALYTICS } from '../../constants';


interface Props {}
interface State {
  mixpanelId?: string;
  hasOptedIn: boolean;
}

export class SettingsScreen extends React.Component<Props, State> {
  static options: { bottomTab: { text: string; }; topBar: { visible: boolean; }; };
  constructor(props: Props) {
    super(props);

    this.state = {
      mixpanelId: undefined,
      hasOptedIn: false,
    }
  }

  async componentDidMount() {
    try {
      const mixpanelId = await uuid();
      const hasOptedIn = await AsyncStorage.getItem(HAS_OPTED_IN_FOR_ANALYTICS);
      this.setState({ mixpanelId, hasOptedIn: hasOptedIn === 'true' });
    } catch (err) {
      console.log(err);
    } 
  }

  toggleAnalyticsPermission = async (value: boolean) => {
    try {
      if (value === true) {
        Mixpanel.optInTracking();
        Mixpanel.identify(this.state.mixpanelId ?? '');
      } else {
        Mixpanel.optOutTracking();
      }
      await AsyncStorage.setItem(HAS_OPTED_IN_FOR_ANALYTICS, value.toString());
      this.setState({hasOptedIn: value});
    } catch (err) {
      console.log(err);
    }
  }

  render() {
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
            <Text style={styles.sectionHeader}>TERMS</Text>
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
  
            <Text style={styles.sectionHeader}>ANALYTICS</Text>
            <View style={styles.option}>
              <Text style={styles.optionLabel}>Allow analytics</Text>
              <Switch
                trackColor={{false: '#9DA2A9', true: '#636BF6'}}
                thumbColor={this.state.hasOptedIn ? '#D0D2F5' : '#f4f3f4'}
                ios_backgroundColor="#4C515C"
                onValueChange={this.toggleAnalyticsPermission}
                value={this.state.hasOptedIn}
              />
            </View>
            <View style={styles.analyticsID}>
              <Text style={styles.analyticsIDLabel}>ID: {this.state.mixpanelId ?? 'unknown'}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

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
  sectionHeader: {
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
  option: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFFFFF',
    borderColor: '#D4D4D4',
    borderWidth: 0.5,
  },
  optionLabel: {
    fontSize: 15,
    color: '#4C515C',
  },
  analyticsID: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  analyticsIDLabel: {
    fontSize: 15,
    color: '#4C515C',
  },
});
