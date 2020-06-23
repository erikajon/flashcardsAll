import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

import { ModulesScreen } from './screens/ModulesScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { FlashcardsScreen } from './screens/FlashcardsScreen';
import { FlashcardFilterScreen } from './screens/FlashcardFilterScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { OnboardingAnalyticsScreen } from './screens/OnboardingAnalyticsScreen';
import { FilterButton as FlashcardFilterButton } from './screens/FlashcardsScreen/FilterButton';

import { seedRealmDB } from './storage/realm/seed';

import { HAS_USER_ONBOARDED } from './constants';

export const mainRoot = {
  root: {
    bottomTabs: {
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
    },
  },
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
Navigation.registerComponent(
  'WelcomeScreen',
  () => WelcomeScreen,
);
Navigation.registerComponent(
  'OnboardingAnalyticsScreen',
  () => OnboardingAnalyticsScreen,
);

const onboardingRoot = {
  root: {
    stack: {
      id: "ONBOARDING_STACK",
      children: [
        {
          component: {
            id: "ONBOARDING_ANALYTICS_SCREEN",
            name: 'OnboardingAnalyticsScreen',
          },
        },
        {
          component: {
            id: "WELCOME_SCREEN",
            name: 'WelcomeScreen',
          },
        },
      ],
      options: {
        topBar: {visible: false},
      },
    },
  },
};

Navigation.events().registerAppLaunchedListener(async () => {
  await seedRealmDB();
  SplashScreen.hide();

  const hasUserOnboarded = await AsyncStorage.getItem(HAS_USER_ONBOARDED);

  if (hasUserOnboarded === 'true') {
    Navigation.setRoot(mainRoot);
  } else {
    Navigation.setRoot(onboardingRoot);
  }
});
