import Mixpanel from 'react-native-mixpanel';

export const setupMixpanel = () => {
  Mixpanel.sharedInstanceWithToken('ea78fd2a5ad3dfa4db547da9b29af0f0', false);
}

type AnalyticsEventType =
  | 'OPENED_MODULE'
  | 'Q_ANSWERED_CORRECTLY'
  | 'Q_ANSWERED_INCORRECTLY'
  | 'CARDS_FILTERED_SET'
  | 'PROGRESS_RESET'

export const OPENED_MODULE = 'OPENED_MODULE';
export const Q_ANSWERED_CORRECTLY = 'Q_ANSWERED_CORRECTLY';
export const Q_ANSWERED_INCORRECTLY = 'Q_ANSWERED_INCORRECTLY';
export const CARDS_FILTERED_SET = 'CARDS_FILTERED_SET';
export const PROGRESS_RESET = 'PROGRESS_RESET';

export const trackEvent = (eventName: AnalyticsEventType, properties?: any) => {
  if (properties && Object.keys(properties).length > 0) {
    console.log('eventName', eventName);
    console.log('properties', properties);
    Mixpanel.trackWithProperties(eventName, properties);
  } else {
    Mixpanel.track(eventName);
  }
} 