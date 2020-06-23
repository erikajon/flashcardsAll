import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

type ButtonType = 'success' | 'danger' | 'brand' | 'default';

interface Props {
  onClick: () => void;
  type: ButtonType;
  label: string;
  width?: number;
}

const SUCCESS_COLOUR = '#46D9C8';
const DANGER_COLOUR = '#EF2E88';
const BRAND_COLOUR = '#636BF6';

const getButtonStyle = (buttonType: ButtonType, width?: number) => {
  let style;
  switch (buttonType) {
    case 'brand':
      style = {...styles.container, ...styles.brand};
      break;
    case 'danger':
      style = {...styles.container, ...styles.danger};
      break;
    case 'success':
      style = {...styles.container, ...styles.success};
      break;
    default:
      style = {...styles.container, ...styles.default};
      break;
  }

  if (width) {
    style = {...style, width};
  }

  return style;
};

const getLabelStyle = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'brand':
    case 'danger':
    case 'success':
      return styles.labelLight;
    default:
      return styles.labelDark;
  }
}

export const Button = (props: Props) => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={getButtonStyle(props.type, props.width)}>
      <Text style={getLabelStyle(props.type)}>{props.label}</Text>
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
  brand: {
    backgroundColor: BRAND_COLOUR,
  },
  default: {
    borderColor: BRAND_COLOUR,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    color: BRAND_COLOUR,
  },
  labelLight: {
    color: '#FFFFFF',
  },
  labelDark: {
    color: BRAND_COLOUR,
  },
});
