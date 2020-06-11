import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ModuleModel} from 'storage/realm/models/moduleModel';
import {flashcardActions} from '../../storage/realm';
import {FlashcardModel} from '../../storage/realm/models/flashcardModel';
import {ProgressBar} from './ProgressBar';
const {Navigation} = require('react-native-navigation');

interface Props {
  examModule: ModuleModel;
}

interface State {
  totalCount: number;
  answeredCount: number;
  correctPercentage: number;
  answeredPercentage: number;
}

export class Module extends React.Component<Props, State> {
  flashcards: Realm.Results<FlashcardModel>;

  constructor(props: Props) {
    super(props);

    this.flashcards = flashcardActions.getAllByModuleId(props.examModule.id);

    this.state = {
      totalCount: 0,
      answeredCount: 0,
      correctPercentage: 0,
      answeredPercentage: 0,
    };

    this.flashcards.addListener(() => {
      this.updateProgress();
    });
  }

  componentWillUnmount() {
    this.flashcards.removeAllListeners();
  }

  updateProgress = () => {
    const totalCount = this.flashcards.length;
    const answeredCount = this.flashcards.filter((e) => e.answerType !== 'none')
      .length;
    const correctCount = this.flashcards.filter(
      (e) => e.answerType === 'correct',
    ).length;
    const correctPercentage = Math.round((correctCount * 100) / totalCount);
    const answeredPercentage = (answeredCount * 100) / totalCount;

    this.setState({
      totalCount,
      answeredCount,
      correctPercentage,
      answeredPercentage,
    });
  };

  render() {
    const {examModule} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          Navigation.push('MODULES_TAB', {
            component: {
              name: 'FlashcardsScreen',
              options: {
                bottomTabs: {
                  visible: false,
                },
              },
              passProps: {
                moduleId: examModule.id,
              },
            },
          })
        }>
        <View style={styles.module}>
          <View style={styles.progressContainer}>
            <ProgressBar widthPercentage={this.state.answeredPercentage} />
          </View>
          <Text style={styles.lastRevised}>Last revised 5 days ago</Text>
          <Text style={styles.moduleName}>{examModule.name}</Text>
          <View style={styles.stats}>
            <Text style={styles.answered}>
              {this.state.answeredCount} / {this.state.totalCount} answered
            </Text>
            <Text style={styles.correct}>
              {this.state.correctPercentage}% correct
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  module: {
    display: 'flex',
    position: 'relative',
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 5,
    paddingTop: 30,
    paddingBottom: 25,
    paddingRight: 30,
    paddingLeft: 20,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  lastRevised: {
    marginBottom: 10,
    fontSize: 12,
    color: '#9DA2A9',
  },
  moduleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C515C',
    marginBottom: 45,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
  },
  answered: {
    marginRight: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#FFF9E9',
    borderRadius: 15,
    overflow: 'hidden',
    fontSize: 10,
    fontWeight: '500',
  },
  correct: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#CFFFFA',
    borderRadius: 15,
    overflow: 'hidden',
    fontSize: 10,
    fontWeight: '500',
  },
});
