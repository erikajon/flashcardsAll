import React from 'react';
import {StyleSheet, Animated} from 'react-native';

interface Props {
  widthPercentage: number;
}

export const ProgressBar = ({widthPercentage}: Props) => {
  const growAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(growAnim, {
      toValue: widthPercentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: growAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#636BF6',
    height: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
