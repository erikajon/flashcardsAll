import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type ButtonType = 'success' | 'danger';

interface Props {
  onClick: () => void;
  type: ButtonType;
  label: string;
}

const SUCCESS_COLOUR = '#46D9C8';
const DANGER_COLOUR = '#EF2E88';

const getButtonStyle = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'danger':
      return {...styles.container, ...styles.danger};
    default:
      return {...styles.container, ...styles.success};
  }
};

export const Button = (props: Props) => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={getButtonStyle(props.type)}>
      <Text style={styles.label}>{props.label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 20,
    paddingBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  success: {
    backgroundColor: SUCCESS_COLOUR,
  },
  danger: {
    backgroundColor: DANGER_COLOUR,
  },
  label: {
    color: '#FFFFFF',
  },
});
