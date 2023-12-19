import { Platform } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { Colors } from '@/constants/color';

export const stackNavigationOptions: StackNavigationOptions = {
  headerTintColor: Colors.primary,
  headerLeftLabelVisible: false,
  headerLeftContainerStyle: {
    paddingLeft: Platform.select({
      android: 0,
      ios: 12,
    }),
  },
  headerRightContainerStyle: {
    paddingRight: Platform.select({
      android: 0,
      ios: 12,
    }),
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.black,
  },
  headerStyle: {
    elevation: 0,
    shadowColor: 'transparent',
  },
  cardStyle: {
    backgroundColor: Colors.white,
  },
};
