import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface Props {
  size: number;
  width: number;
  tintColor: string;
  label: string;
  percentage: number;
  type: 'big' | 'small';
}

export const ProgressCircle = (props: Props) => (
  <AnimatedCircularProgress
    prefill={0}
    duration={1500}
    rotation={0}
    size={props.size}
    width={props.width}
    fill={props.percentage}
    lineCap="round"
    tintColor={props.tintColor}
    backgroundColor="#C4C4C4"
    backgroundWidth={2}>
    {() => (
      <View>
        <Text
          style={
            props.type === 'big'
              ? styles.percentageAnsweredBig
              : styles.percentageAnsweredSmall
          }>
          {props.percentage}%
        </Text>
        <Text
          style={
            props.type === 'big'
              ? styles.answeredTextBig
              : styles.answeredTextSmall
          }>
          {props.label}
        </Text>
      </View>
    )}
  </AnimatedCircularProgress>
);

const styles = StyleSheet.create({
  middleProgressCircle: {
    alignItems: 'center',
    marginTop: 20,
  },
  percentageAnsweredBig: {
    fontSize: 56,
    color: '#666C73',
    textAlign: 'center',
  },
  answeredTextBig: {
    fontSize: 18,
    color: '#666C73',
    textAlign: 'center',
  },
  percentageAnsweredSmall: {
    fontSize: 24,
    color: '#666C73',
    textAlign: 'center',
  },
  answeredTextSmall: {
    fontSize: 12,
    color: '#666C73',
    textAlign: 'center',
  },
});
