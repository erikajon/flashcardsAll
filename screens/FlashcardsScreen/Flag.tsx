import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {FlashcardModel} from 'storage/realm/models/flashcardModel';
import {View} from 'react-native';

interface FlagProps {
  fill: string;
}

const CORRECT_ANSWER_COLOUR = '#46D9C8';
const INCORRECT_ANSWER_COLOUR = '#EF2E88';

export const Flag = (props: FlagProps) => (
  <Svg width="31" height="43" viewBox="0 0 31 43" fill="none">
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0H31V43C31 43 23.8462 32.25 15.5 32.25C7.15385 32.25 0 43 0 43V0Z"
      fill={props.fill}
    />
  </Svg>
);

interface CardFlagProps {
  answerType: FlashcardModel['answerType'];
}

export const CardFlag = ({answerType}: CardFlagProps) => {
  switch (answerType) {
    case 'correct':
      return <Flag fill={CORRECT_ANSWER_COLOUR} />;
    case 'incorrect':
      return <Flag fill={INCORRECT_ANSWER_COLOUR} />;
    default:
      return <View />;
  }
};
