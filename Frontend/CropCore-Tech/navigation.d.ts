import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  'Get Started': undefined; // or any params if needed
  Dashboard: undefined; // or any params if needed
  'Farming AI': undefined;
  'Motor Control': undefined;
  'Disease Detection': undefined;
  'Crop Market Trends': undefined;
  Chatbot: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
