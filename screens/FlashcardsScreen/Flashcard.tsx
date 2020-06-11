import React from 'react';
import {Dimensions, StyleSheet, View, ImageSourcePropType} from 'react-native';
import CardFlip from 'react-native-card-flip';

import {
  FlashcardModel,
  FlashcardAnswerType,
} from '../../storage/realm/models/flashcardModel';
import {CardBack} from './CardBack';
import {CardFront} from './CardFront';
import {Navigation} from 'react-native-navigation';
import {flashcardActions} from '../../storage/realm';

interface Props {
  item: FlashcardModel;
  questionImage?: ImageSourcePropType;
  answerImage?: ImageSourcePropType;
  position: number;
  total: number;
}

interface State {
  answerType: FlashcardAnswerType;
}

export class Flashcard extends React.Component<Props, State> {
  card: CardFlip | null | undefined;

  constructor(props: Props) {
    super(props);

    // initial asnwerType will come from the DB
    // the state will take over management of answerType after
    this.state = {
      answerType: props.item.answerType,
    };
  }

  showFilterModal() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'FlashcardFilterScreen',
            },
          },
        ],
      },
    });
  }

  updateCardAnswerStatus = async (
    cardId: number,
    answerType: FlashcardAnswerType,
  ) => {
    this.setState({answerType});
    await flashcardActions.updateFlashcard({id: cardId, answerType});
  };

  render() {
    return (
      <View style={styles.container}>
        <CardFlip
          style={styles.cardContainer}
          ref={(card) => (this.card = card)}>
          <CardFront
            card={this.props.item}
            position={this.props.position}
            total={this.props.total}
            flip={() => this.card?.flip()}
            questionImage={this.props.questionImage}
            answerType={this.state.answerType}
          />
          <CardBack
            card={this.props.item}
            position={this.props.position}
            total={this.props.total}
            updateCardAnswerStatus={this.updateCardAnswerStatus}
            flip={() => this.card?.flip()}
            answerImage={this.props.answerImage}
            answerType={this.state.answerType}
          />
        </CardFlip>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
