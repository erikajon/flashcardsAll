import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {FlashcardModel} from '../../storage/realm/models/flashcardModel';
import {flashcardActions} from '../../storage/realm';
import {Navigation} from 'react-native-navigation';
import {
  CORRECT_FILTER_NAME,
  INCORRECT_FILTER_NAME,
  UNANSWERED_FILTER_NAME,
} from '../../constants';
import {Spinner} from '../../components/Spinner';
import { Flashcard } from './Flashcard';

import cardImages from '../../assets/images/cards';

const filterIcon = require('../../assets/images/filter.png');

const CARD_HEIGHT = Dimensions.get('window').height * 0.8;

interface Props {
  moduleId: number;
}

interface State {
  flashcards?: Realm.Results<FlashcardModel>;
}

export class FlashcardsScreen extends React.Component<Props, State> {
  flashcards?: Realm.Results<FlashcardModel>;

  static get options() {
    return {
      topBar: {
        backButton: {
          color: '#636BF6',
          title: 'Modules',
          showTitle: true,
        },
        rightButtons: [
          {
            id: 'FlashcardFilterButton',
            icon: filterIcon,
          },
        ],
      },
    };
  }

  constructor(props: Props) {
    super(props);

    if (this.props.moduleId) {
      this.flashcards = flashcardActions.getAllByModuleId(this.props.moduleId);
    }

    this.state = {};

    // this will add Navigation class methods to this class
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.filterFlashcardsList();
  }

  filterFlashcardsList = () => {
    AsyncStorage.multiGet(
      [CORRECT_FILTER_NAME, INCORRECT_FILTER_NAME, UNANSWERED_FILTER_NAME],
      (err, stores) => {
        // @TODO :: implement proper error handling
        if (!err && stores) {
          let filterString = '';
          stores
            .filter((e) => e[1] !== 'false')
            .forEach(([filterName], index, array) => {
              switch (filterName) {
                case CORRECT_FILTER_NAME:
                  filterString += 'answerType = "correct"';
                  break;
                case INCORRECT_FILTER_NAME:
                  filterString += 'answerType = "incorrect"';
                  break;
                default:
                  filterString += 'answerType = "none"';
              }

              if (index !== array.length - 1) {
                filterString += ' OR ';
              }
            });

          // without this setTimeout,
          // react native won't update this state
          setTimeout(() => null, 0);

          if (this.flashcards) {
            this.setState({
              flashcards:
                filterString === '' ? this.flashcards : this.flashcards.filtered(filterString),
            });
          }
        }
      },
    );
  };

  navigationButtonPressed({buttonId}: {[key: string]: string}) {
    if (buttonId === 'FlashcardFilterButton') {
      this.showFilterModal();
    }
  }

  showFilterModal() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'FlashcardFilterScreen',
              passProps: {
                updateFlashcardsList: this.filterFlashcardsList,
              },
            },
          },
        ],
      },
    });
  }

  listKeyExtractor = (item: FlashcardModel) => String(item.id);

  renderListItem = ({item, index}: { item: FlashcardModel, index: number }) => {
    const questionImage =
      // @ts-ignore
      item.questionImage && cardImages[item.questionImage];
    // @ts-ignore
    const answerImage = item.answerImage && cardImages[item.answerImage];
    return (
      <Flashcard
        item={item}
        total={this.state.flashcards?.length ?? 0}
        position={index + 1}
        questionImage={questionImage}
        answerImage={answerImage}
      />
    )
  }

  renderListHeader = () => {
    return (
      <Text style={styles.swipeTheCardLabel}>
        Tap the card to see the correct answer
      </Text>
    );
  }

  render() {
    const numberOfFlashcards = this.state.flashcards
      ? this.state.flashcards.length
      : 0;
    return (
      <React.Fragment>
        <SafeAreaView style={styles.container}>
          {!this.state.flashcards ? (
            <Spinner />
          ) : (
            <>
              <FlatList
                data={this.state.flashcards}
                extraData={{ total: this.state.flashcards?.length ?? 0 }}
                renderItem={this.renderListItem}
                keyExtractor={this.listKeyExtractor}
                overScrollMode="never"
                decelerationRate="fast"
                snapToOffsets={[...Array(numberOfFlashcards)].map(
                  (x, i) => i * CARD_HEIGHT,
                )}
                ListHeaderComponent={this.renderListHeader}
              />
            </>
          )}
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  swipeTheCardLabel: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#B0B3B8',
  },
});
