import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  text?: string;
}

export const TextWithSubOrSuperscript = ({text}: Props) => {
  if (!text) {
    return <Text> </Text>;
  }

  // This method won't scale if we need to support other entities
  // if do need to do this, we'll need to rewrite this, so that
  // the string is reduced over and each chunk is checked against every single entity
  // find \u2099 and make it superscript
  const parsedText = text.split('\u2099');
  return (
    <View style={styles.container}>
      {parsedText.map((chunk, index) => {
        if (
          chunk !== '' &&
          (parsedText[index + 1] === '' || !parsedText[index + 1])
        ) {
          return (
            <Text key={chunk + index} style={styles.normal}>
              {chunk}
            </Text>
          );
        } else if (chunk !== '' && parsedText[index + 1] !== '') {
          return (
            <View key={chunk + index} style={styles.container}>
              <Text style={styles.normal}>{chunk}</Text>
              <Text style={styles.subscript}>n</Text>
            </View>
          );
        }
        return (
          <Text key={chunk + index} style={styles.subscript}>
            n
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  normal: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  subscript: {
    fontSize: 11,
    lineHeight: 35,
    textAlign: 'center',
  },
});
