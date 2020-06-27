import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import {
  FlashcardModel,
  FlashcardAnswerType,
} from '../../storage/realm/models/flashcardModel';
import {CardFlag} from './Flag';
import {Button} from '../../components/Button';
import {TextWithSubOrSuperscript} from './TextWithSubOrSuperscript';
import { trackEvent, Q_ANSWERED_CORRECTLY, Q_ANSWERED_INCORRECTLY } from '../../analytics';
import { moduleActions } from '../../storage/realm';

interface Props {
  card: FlashcardModel;
  position: number;
  total: number;
  flip: () => void;
  answerImage?: ImageSourcePropType;
  answerType: FlashcardAnswerType;
  updateCardAnswerStatus: (
    cardId: number,
    answerType: FlashcardAnswerType,
  ) => void;
}

export const CardBack = ({
  card,
  flip,
  total,
  position,
  answerImage,
  answerType,
  updateCardAnswerStatus,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.card}
      onPress={() => flip()}>
      <View style={styles.flag}>
        <CardFlag answerType={answerType} />
        <Text style={styles.labelCardNumber}>
          {position}/{total}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <TextWithSubOrSuperscript text={card.answer} />
        </View>
        {answerImage ? (
          <Image
            resizeMode="contain"
            style={styles.tinyLogo}
            source={answerImage}
          />
        ) : (
          <View />
        )}
      </View>
      <View>
        <Text style={styles.label2}>Did you get it right?</Text>
        <View style={styles.buttonsView}>
          <Button
            type="danger"
            onClick={async () => {
              updateCardAnswerStatus(card.id, 'incorrect');
              trackEvent(Q_ANSWERED_INCORRECTLY, { cardId: card.id, module: card.moduleId });
              await moduleActions.updateLastRevisedDate(card.moduleId);
            }}
            label="Incorrect"
          />
          <Button
            type="success"
            onClick={async () => {
              trackEvent(Q_ANSWERED_CORRECTLY, { cardId: card.id, module: card.moduleId });
              updateCardAnswerStatus(card.id, 'correct');
              await moduleActions.updateLastRevisedDate(card.moduleId);
            }}
            label="Correct"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
  },
  card: {
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.75,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCardNumber: {
    paddingLeft: Dimensions.get('window').width * 0.5,
    paddingTop: Dimensions.get('window').height * 0.02,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'System',
    color: '#C4C4C4',
    backgroundColor: 'transparent',
  },
  cardText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#474747',
  },
  tinyLogo: {
    width: Dimensions.get('window').width * 0.8,
    height: (Dimensions.get('window').height * 0.8) / 2 - 40,
    marginBottom: 20,
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label2: {
    marginTop: 10,
    color: '#9DA2A9',
    fontSize: 12,
    height: 20,
    textAlign: 'center',
  },
  flag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
