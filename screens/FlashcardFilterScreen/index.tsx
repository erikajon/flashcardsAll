import React, {PureComponent} from 'react';
import {Navigation} from 'react-native-navigation';
import {View, Text, Switch, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CORRECT_FILTER_NAME,
  INCORRECT_FILTER_NAME,
  UNANSWERED_FILTER_NAME,
} from '../../constants';
import { trackEvent, CARDS_FILTERED_SET } from '../../analytics';

interface Props {
  componentId: string;
  updateFlashcardsList: () => void;
}

interface State {
  isCorrectSelected: boolean;
  isIncorrectSelected: boolean;
  isUnansweredSelected: boolean;
}

export class FlashcardFilterScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.state = {
      isCorrectSelected: false,
      isIncorrectSelected: false,
      isUnansweredSelected: false,
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(
      [CORRECT_FILTER_NAME, INCORRECT_FILTER_NAME, UNANSWERED_FILTER_NAME],
      (err, stores) => {
        // @TODO :: implement proper error handling
        console.log('err', err);
        if (!err && stores) {
          this.setState({
            ...stores.reduce((acc, cur) => {
              return {...acc, [cur[0]]: cur[1] !== 'false'};
            }, {}),
          });
        }
      },
    );
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Filter',
        },
        rightButtons: [
          {
            id: 'DoneBtn',
            text: 'Done',
            color: '#636BF6',
          },
        ],
      },
    };
  }

  navigationButtonPressed({buttonId}: {[key: string]: string}) {
    if (buttonId === 'DoneBtn') {
      // @TODO :: set values for filtering
      this.props.updateFlashcardsList();
      Navigation.dismissModal(this.props.componentId);
    }
  }

  toggleCorrectFilter = async (value: boolean) => {
    trackEvent(CARDS_FILTERED_SET, { filterName: CORRECT_FILTER_NAME, isEnabled: value.toString() });
    await AsyncStorage.setItem(CORRECT_FILTER_NAME, value.toString());
    this.setState({isCorrectSelected: value});
  };

  toggleIncorrectFilter = async (value: boolean) => {
    trackEvent(CARDS_FILTERED_SET, { filterName: INCORRECT_FILTER_NAME, isEnabled: value.toString() });
    await AsyncStorage.setItem(INCORRECT_FILTER_NAME, value.toString());
    this.setState({isIncorrectSelected: value});
  };

  toggleUnansweredFilter = async (value: boolean) => {
    trackEvent(CARDS_FILTERED_SET, { filterName: UNANSWERED_FILTER_NAME, isEnabled: value.toString() });
    await AsyncStorage.setItem(UNANSWERED_FILTER_NAME, value.toString());
    this.setState({isUnansweredSelected: value});
  };

  render() {
    const {
      isCorrectSelected,
      isIncorrectSelected,
      isUnansweredSelected,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.optionList}>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Correctly answered</Text>
            <Switch
              trackColor={{false: '#9DA2A9', true: '#636BF6'}}
              thumbColor={isCorrectSelected ? '#D0D2F5' : '#f4f3f4'}
              ios_backgroundColor="#4C515C"
              onValueChange={this.toggleCorrectFilter}
              value={isCorrectSelected}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Incorrectly answered</Text>
            <Switch
              trackColor={{false: '#9DA2A9', true: '#636BF6'}}
              thumbColor={isIncorrectSelected ? '#D0D2F5' : '#f4f3f4'}
              ios_backgroundColor="#4C515C"
              onValueChange={this.toggleIncorrectFilter}
              value={isIncorrectSelected}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Unanswered</Text>
            <Switch
              trackColor={{false: '#9DA2A9', true: '#636BF6'}}
              thumbColor={isUnansweredSelected ? '#D0D2F5' : '#f4f3f4'}
              ios_backgroundColor="#4C515C"
              onValueChange={this.toggleUnansweredFilter}
              value={isUnansweredSelected}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FAFF',
  },
  optionList: {
    paddingTop: 35,
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
});
