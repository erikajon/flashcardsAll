import {Navigation} from 'react-native-navigation';

import SplashScreen from 'react-native-splash-screen';

import {ModulesScreen} from './screens/ModulesScreen';
import {ProgressScreen} from './screens/ProgressScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {FlashcardsScreen} from './screens/FlashcardsScreen';
import {FlashcardFilterScreen} from './screens/FlashcardFilterScreen';
import {FilterButton as FlashcardFilterButton} from './screens/FlashcardsScreen/FilterButton';

import {seedRealmDB} from './storage/realm/seed';

const bottomTabs = {
  id: 'BOTTOM_TABS_LAYOUT',
  children: [
    {
      stack: {
        id: 'PROGRESS_TAB',
        children: [
          {
            component: {
              id: 'PROGRESS_SCREEN',
              name: 'ProgressScreen',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('./assets/images/progress.png'),
            selectedIconColor: '#636BF6',
            selectedTextColor: '#636BF6',
          },
        },
      },
    },
    {
      stack: {
        id: 'MODULES_TAB',
        children: [
          {
            component: {
              id: 'FLASHCARDS_SCREEN',
              name: 'FlashcardsScreen',
            },
          },
          {
            component: {
              id: 'MODULES_SCREEN',
              name: 'ModulesScreen',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('./assets/images/revise.png'),
            selectedIconColor: '#636BF6',
            selectedTextColor: '#636BF6',
          },
        },
      },
    },
    {
      stack: {
        id: 'SETTINGS_TAB',
        children: [
          {
            component: {
              id: 'SETTINGS_SCREEN',
              name: 'SettingsScreen',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('./assets/images/settings.png'),
            selectedIconColor: '#636BF6',
            selectedTextColor: '#636BF6',
          },
        },
      },
    },
  ],
};

Navigation.registerComponent(
  'FlashcardFilterButton',
  () => FlashcardFilterButton,
);

Navigation.registerComponent('ModulesScreen', () => ModulesScreen);
Navigation.registerComponent('ProgressScreen', () => ProgressScreen);
Navigation.registerComponent('SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('FlashcardsScreen', () => FlashcardsScreen);
Navigation.registerComponent(
  'FlashcardFilterScreen',
  () => FlashcardFilterScreen,
);

Navigation.events().registerAppLaunchedListener(async () => {
  await seedRealmDB();
  SplashScreen.hide();
  Navigation.setRoot({
    root: {
      bottomTabs,
    },
  });
});
