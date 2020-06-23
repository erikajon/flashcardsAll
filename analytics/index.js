import Mixpanel from 'react-native-mixpanel';

export const setupMixpanel = () => {
  Mixpanel.sharedInstanceWithToken('ea78fd2a5ad3dfa4db547da9b29af0f0', false);
}

// type AnalyticsEventType =
//   | 'OPENED_MODULE'

// export const trackEvent = (eventName: AnalyticsEventType, properties?: {}) => {
//   Mixpanel.track("Event name");
// } 