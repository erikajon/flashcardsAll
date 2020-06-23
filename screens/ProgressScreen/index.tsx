import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import uuid from 'react-native-unique-id';
import Mixpanel from 'react-native-mixpanel';

import {ProgressCircle} from '../../components/ProgressCircle';
import {flashcardActions} from '../../storage/realm';
import {FlashcardModel} from 'storage/realm/models/flashcardModel';

interface Props {}

interface State {
  answered: number;
  correct: number;
  incorrect: number;
}

export class ProgressScreen extends React.Component<Props, State> {
  all: Realm.Results<FlashcardModel>;

  static options = {
    bottomTab: {
      text: 'Progress',
    },
    topBar: {visible: false},
  };

  constructor(props: Props) {
    super(props);

    this.all = flashcardActions.getAll();

    this.state = {
      answered: 0,
      correct: 0,
      incorrect: 0,
    };

    this.all.addListener(() => {
      this.updateProgress();
    });
  }

  async componentDidMount() {
    // this is assuming that this is always the root page for main navigation
    try {
      const mixpanelId = await uuid();
      Mixpanel.identify(mixpanelId);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.all.removeAllListeners();
  }

  updateProgress = () => {
    const allCount = this.all.length;
    const answeredCount = this.all.filter((e) => e.answerType !== 'none')
      .length;
    const correctCount = this.all.filter((e) => e.answerType === 'correct')
      .length;
    const incorrectCount = this.all.filter((e) => e.answerType === 'incorrect')
      .length;

    // without this serTimeout,
    // react native won't update this state
    setTimeout(() => null, 0);

    const answered = Math.round((answeredCount * 100) / allCount);
    const correct = Math.round((correctCount * 100) / allCount);
    const incorrect = Math.round((incorrectCount * 100) / allCount);

    // only update the state, if required
    if (
      answered !== this.state.answered ||
      correct !== this.state.correct ||
      incorrect !== this.state.incorrect
    ) {
      this.setState({
        answered,
        correct,
        incorrect,
      });
    }
  };

  render() {
    const answeredWidth = (Dimensions.get('screen').width / 100) * 70;
    const answeredHeigth = (Dimensions.get('screen').height / 100) * 35;
    const answeredSize =
      answeredWidth > answeredHeigth ? answeredHeigth : answeredHeigth;
    const answeredTypeWidth = (Dimensions.get('screen').width / 100) * 40;
    const answeredTypeHeigth = (Dimensions.get('screen').height / 100) * 20;
    const answeredTypeSize =
      answeredTypeWidth > answeredTypeHeigth
        ? answeredTypeHeigth
        : answeredTypeHeigth;
    return (
      <View style={styles.background}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text style={styles.title}>GCSE Chemistry</Text>
          <View style={styles.progressContainer}>
            <View>
              <ProgressCircle
                size={answeredSize}
                width={24}
                tintColor="#FCD878"
                label="answered"
                percentage={this.state.answered}
                type="big"
              />
            </View>
            <View style={styles.bottomProgress}>
              <View style={styles.leftProgressCircle}>
                <ProgressCircle
                  size={answeredTypeSize}
                  width={12}
                  tintColor="#24CAB8"
                  label="correct"
                  percentage={this.state.correct}
                  type="small"
                />
              </View>
              <View style={styles.rightProgressCircle}>
                <ProgressCircle
                  size={answeredTypeSize}
                  width={12}
                  tintColor="#EF2E88"
                  label="incorrect"
                  percentage={this.state.incorrect}
                  type="small"
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F6FAFF',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 36,
    color: '#666C73',
    marginTop: 80,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftProgressCircle: {
    marginLeft: (Dimensions.get('screen').width / 100) * 5,
    marginRight: (Dimensions.get('screen').width / 100) * 5,
  },
  rightProgressCircle: {
    marginLeft: (Dimensions.get('screen').width / 100) * 5,
    marginRight: (Dimensions.get('screen').width / 100) * 5,
  },
  bottomProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
