import * as React from 'react';
import {Flashcard} from './Flashcard';
import {View} from 'react-native';
import {FlashcardModel} from '../../storage/realm/models/flashcardModel';

import cardImages from '../../assets/images/cards';

interface Props {
  cards: Realm.Results<FlashcardModel>;
}

export class FlashcardList extends React.Component<Props> {
  render() {
    return (
      <View>
        {this.props.cards.map((card, index) => {
          const questionImage =
            // @ts-ignore
            card.questionImage && cardImages[card.questionImage];
          // @ts-ignore
          const answerImage = card.answerImage && cardImages[card.answerImage];
          return (
            <Flashcard
              key={card.id}
              item={card}
              position={index + 1}
              total={this.props.cards.length}
              questionImage={questionImage}
              answerImage={answerImage}
            />
          );
        })}
      </View>
    );
  }
}
