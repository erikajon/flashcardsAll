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
import {TextWithSubOrSuperscript} from './TextWithSubOrSuperscript';

interface Props {
  card: FlashcardModel;
  position: number;
  total: number;
  flip: () => void;
  questionImage?: ImageSourcePropType;
  answerType: FlashcardAnswerType;
}

export const CardFront = ({
  card,
  flip,
  total,
  position,
  questionImage,
  answerType,
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
      <View style={styles.cardText}>
        <TextWithSubOrSuperscript text={card.question} />
      </View>
      {questionImage ? (
        <Image
          resizeMode="contain"
          style={styles.tinyLogo}
          source={questionImage}
        />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    color: '#474747',
  },
  tinyLogo: {
    width: Dimensions.get('window').width * 0.8,
    height: (Dimensions.get('window').height * 0.8) / 2,
    marginBottom: 20,
  },
  flag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomView: {},
});
