import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Module} from './Module';

import {moduleActions} from '../../storage/realm';
import {ModuleModel} from 'storage/realm/models/moduleModel';

interface Props {}

interface State {
  modules: Realm.Results<ModuleModel>;
}

export class ModulesScreen extends React.Component<Props, State> {
  static options: {bottomTab: {text: string}; topBar: {visible: boolean}};

  constructor(props: Props) {
    super(props);
    const modules = moduleActions.getAllModulesByExamId('AQA');
    this.state = {
      modules,
    };
  }

  render() {
    return (
      <View style={styles.background}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Modules</Text>
            {this.state.modules.map((examModule) => (
              <Module key={examModule.id} examModule={examModule} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

ModulesScreen.options = {
  bottomTab: {
    text: 'Revise',
  },
  topBar: {visible: false},
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F6FAFF',
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 36,
    color: '#666C73',
    marginBottom: 50,
    marginTop: 75,
    fontWeight: 'bold',
  },
});
